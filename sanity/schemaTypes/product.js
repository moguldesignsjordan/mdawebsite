// schemas/product.js
export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name', maxLength: 96 },
      validation: Rule => Rule.required()
    },
    {
      name: 'type',
      title: 'Product Type',
      type: 'string',
      options: {
        list: [
          { title: 'Print', value: 'print' },
          { title: 'Digital', value: 'digital' }
        ]
      }
    },
    {
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true }
    },
    {
      name: 'description',
      title: 'Description',
      type: 'text'
    },
    {
      name: 'basePrice',
      title: 'Base Price',
      type: 'number',
      description: 'Starting price shown in the shop gallery'
    },
    {
      name: 'variations',
      title: 'Product Variations',
      type: 'object',
      fields: [
        {
          name: 'quantities',
          title: 'Quantities',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', type: 'string', title: 'Quantity (e.g. 500)' },
              { name: 'price', type: 'number', title: 'Set Price for this Quantity' }
            ]
          }]
        },
        {
          name: 'finishes',
          title: 'Finishes',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', type: 'string' },
              { name: 'priceModifier', type: 'number', title: 'Extra Cost' }
            ]
          }]
        },
        {
          name: 'turnaround',
          title: 'Turnaround Options',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', type: 'string', title: 'e.g. Rush (Next Day)' },
              { name: 'priceModifier', type: 'number' }
            ]
          }]
        },
        {
          name: 'designService',
          title: 'Design Options',
          type: 'array',
          of: [{
            type: 'object',
            fields: [
              { name: 'label', type: 'string' },
              { name: 'priceModifier', type: 'number' }
            ]
          }]
        }
      ]
    }
  ]
}