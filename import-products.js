const path = require('path');
// Ensure this points to .env.local as you requested
require('dotenv').config({ path: path.resolve(__dirname, '.env.local') }); 

const fs = require('fs');
const csv = require('csv-parser');
const { createClient } = require('@sanity/client');
const axios = require('axios');

// Debugging check to ensure .env.local is loading
console.log('Targeting Project:', process.env.NEXT_PUBLIC_SANITY_PROJECT_ID);

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_WRITE_TOKEN, 
  useCdn: false,
});

const products = [];

async function uploadImage(url) {
  try {
    const response = await axios.get(url, { 
      responseType: 'arraybuffer',
      // Added User-Agent to prevent WordPress/Hostingersite blocks
      headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      }
    });
    const buffer = Buffer.from(response.data, 'binary');
    const asset = await client.assets.upload('image', buffer, {
      filename: url.split('/').pop()
    });
    return { _type: 'image', asset: { _type: 'reference', _ref: asset._id } };
  } catch (err) {
    console.error(`Skipping image upload for ${url}: ${err.message}`);
    // Returning null allows the product document to still be created without the image
    return null;
  }
}

async function runImport() {
  console.log('Starting import from CSV...');
  
  fs.createReadStream('wc-product-export-3-1-2026-1767465828151.csv')
    .pipe(csv())
    .on('data', (row) => {
      if (row.Type === 'variable') {
        products.push(row);
      }
    })
    .on('end', async () => {
      for (const row of products) {
        console.log(`-----------------------------------`);
        console.log(`Processing: ${row.Name}`);
        
        const imageAsset = row.Images ? await uploadImage(row.Images.split(',')[0]) : null;

        const variations = {
          quantities: [],
          finishes: [],
          turnaround: [],
          designService: []
        };

        // Logic to map WooCommerce attributes to your Sanity schema arrays
        for (let i = 1; i <= 6; i++) {
          const name = row[`Attribute ${i} name`]?.toLowerCase() || '';
          const vals = row[`Attribute ${i} value(s)`]?.split(',').map(v => v.trim()) || [];

          if (name.includes('quan')) {
            variations.quantities = vals.map(v => ({ label: v, price: 20 }));
          } else if (name.includes('finish')) {
            variations.finishes = vals.map(v => ({ label: v, priceModifier: 0 }));
          } else if (name.includes('turn')) {
            variations.turnaround = vals.map(v => ({ label: v, priceModifier: 0 }));
          } else if (name.includes('design')) {
            variations.designService = vals.map(v => ({ 
              label: v, 
              priceModifier: (v.toLowerCase().includes('yes') || v.toLowerCase().includes('need')) ? 75 : 0 
            }));
          }
        }

        const doc = {
          _type: 'product',
          name: row.Name,
          slug: { _type: 'slug', current: row.Name.toLowerCase().replace(/\s+/g, '-') },
          type: 'print',
          description: row.Description || row['Short description'] || 'High quality printed product.',
          image: imageAsset,
          basePrice: parseFloat(row['Regular price']) || 20,
          variations
        };

        try {
          await client.create(doc);
          console.log(`✅ Successfully created: ${row.Name}`);
        } catch (err) {
          console.error(`❌ Error creating ${row.Name}: ${err.message}`);
        }
      }
      console.log('-----------------------------------');
      console.log('Import Finished!');
    });
}

runImport();