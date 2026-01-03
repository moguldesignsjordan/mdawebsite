'use client';

import React, { useState, useEffect } from 'react';
import { client } from '../../../lib/sanity';
import { useShop } from '../../../context/ShopContext';
import { FiChevronLeft, FiPlus, FiMinus } from 'react-icons/fi';
import Link from 'next/link';

export default function ProductPage({ params }) {
  const { id } = React.use(params);
  const [product, setProduct] = useState(null);
  const { addToCart } = useShop();

  // Selection States
  const [selectedQty, setSelectedQty] = useState(null);
  const [selectedFinish, setSelectedFinish] = useState(null);
  const [selectedTurnaround, setSelectedTurnaround] = useState(null);
  const [selectedDesign, setSelectedDesign] = useState(null);
  const [orderQty, setOrderQty] = useState(1);

  useEffect(() => {
    const query = `*[_type == "product" && slug.current == $id][0] {
      name, "image": image.asset->url, description, basePrice, type,
      variations {
        quantities[] { label, price },
        finishes[] { label, priceModifier },
        turnaround[] { label, priceModifier },
        designService[] { label, priceModifier }
      }
    }`;
    client.fetch(query, { id }).then((data) => {
      setProduct(data);
      if (data?.variations?.quantities) setSelectedQty(data.variations.quantities[0]);
      if (data?.variations?.finishes) setSelectedFinish(data.variations.finishes[0]);
      if (data?.variations?.turnaround) setSelectedTurnaround(data.variations.turnaround[0]);
      if (data?.variations?.designService) setSelectedDesign(data.variations.designService[0]);
    });
  }, [id]);

  if (!product) return <div className="pt-40 text-center text-light">Loading Product...</div>;

  const unitPrice = (selectedQty?.price || product.basePrice) + 
    (selectedFinish?.priceModifier || 0) + 
    (selectedDesign?.priceModifier || 0) + 
    (selectedTurnaround?.priceModifier || 0);

  const handleAddToCart = () => {
    const variantLabel = [
      selectedQty?.label ? `${selectedQty.label} Qty` : '',
      selectedFinish?.label,
      selectedTurnaround?.label,
      selectedDesign?.label
    ].filter(Boolean).join(' | ');

    addToCart({
      id: `${id}-${Date.now()}`,
      name: product.name,
      image: product.image,
      price: unitPrice,
      quantity: orderQty,
      variantLabel
    });
  };

  return (
    <div className="pt-24 lg:pt-32 pb-24 bg-dark min-h-screen text-light">
      <div className="container mx-auto px-4 max-w-6xl">
        <Link href="/shop" className="inline-flex items-center gap-2 text-light/50 hover:text-primary mb-8 font-bold text-sm uppercase tracking-widest transition-colors">
          <FiChevronLeft /> Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          
          {/* IMAGE - Floating design without borders */}
          <div className="relative lg:sticky lg:top-32 h-fit z-0">
            <img 
              src={product.image} 
              alt={product.name} 
              className="w-full h-auto object-contain mix-blend-multiply contrast-125" 
              style={{ filter: 'brightness(1.1) contrast(1.1)' }}
            />
          </div>

          <div className="space-y-8 lg:space-y-10">
            <header>
              <h1 className="text-4xl md:text-6xl font-bold font-heading mb-4 leading-tight">{product.name}</h1>
              <div className="text-3xl font-bold text-primary">
                ${(unitPrice * orderQty).toFixed(2)}
              </div>
              <p className="text-light/60 leading-relaxed text-lg mt-6 border-l-2 border-primary/30 pl-6 italic">
                {product.description}
              </p>
            </header>

            <div className="space-y-8 py-8 border-y border-light/10">
              
              {/* Dynamic Quantities */}
              {product.variations?.quantities && (
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-light/40 mb-4 block">Select Quantity</label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                    {product.variations.quantities.map(q => (
                      <button key={q.label} onClick={() => setSelectedQty(q)} 
                        className={`py-3 rounded-xl border transition-all font-bold text-sm ${selectedQty?.label === q.label ? 'border-primary bg-primary/10 text-primary' : 'border-light/10 text-light/50 hover:border-light/30'}`}>
                        {q.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Finishes */}
              {product.variations?.finishes && (
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-light/40 mb-4 block">Select Finish</label>
                  <div className="flex flex-wrap gap-2">
                    {product.variations.finishes.map(f => (
                      <button key={f.label} onClick={() => setSelectedFinish(f)} 
                        className={`px-6 py-3 rounded-xl border transition-all font-bold text-sm ${selectedFinish?.label === f.label ? 'border-primary bg-primary/10 text-primary' : 'border-light/10 text-light/50 hover:border-light/30'}`}>
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Turnaround */}
              {product.variations?.turnaround && (
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-light/40 mb-4 block">Turnaround Time</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.variations.turnaround.map(t => (
                      <button key={t.label} onClick={() => setSelectedTurnaround(t)} 
                        className={`py-3 px-4 rounded-xl border transition-all font-bold text-sm text-left ${selectedTurnaround?.label === t.label ? 'border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(255,162,0,0.1)]' : 'border-light/10 text-light/50 hover:border-light/30'}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Dynamic Design Service */}
              {product.variations?.designService && (
                <div>
                  <label className="text-[10px] uppercase font-bold tracking-[0.2em] text-light/40 mb-4 block">Design Service</label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {product.variations.designService.map(d => (
                      <button key={d.label} onClick={() => setSelectedDesign(d)} 
                        className={`py-3 px-4 rounded-xl border transition-all font-bold text-sm text-left ${selectedDesign?.label === d.label ? 'border-primary bg-primary/10 text-primary shadow-[0_0_20px_rgba(255,162,0,0.1)]' : 'border-light/10 text-light/50 hover:border-light/30'}`}>
                        {d.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* ACTION ROW */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <div className="flex items-center justify-between sm:justify-start gap-6 bg-light/5 border border-light/10 px-6 py-4 rounded-2xl w-full sm:w-auto">
                <button onClick={() => setOrderQty(Math.max(1, orderQty - 1))} className="p-2 hover:text-primary transition-colors"><FiMinus size={20} /></button>
                <span className="w-8 text-center font-bold text-xl">{orderQty}</span>
                <button onClick={() => setOrderQty(orderQty + 1)} className="p-2 hover:text-primary transition-colors"><FiPlus size={20} /></button>
              </div>
              <button onClick={handleAddToCart} className="flex-grow btn-primary py-4 text-xl w-full shadow-xl uppercase tracking-widest">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}