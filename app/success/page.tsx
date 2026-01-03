'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiCheckCircle, FiUploadCloud, FiArrowRight, FiLoader, FiInfo } from 'react-icons/fi';
import { useShop } from '../../context/ShopContext';
import { client } from '../../lib/sanity';

export default function SuccessPage() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const { clearCart } = useShop();
  
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [fileName, setFileName] = useState('');

  useEffect(() => {
    if (sessionId) {
      clearCart();
    }
  }, [sessionId, clearCart]);

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);
    setFileName(file.name);

    try {
      const asset = await client.assets.upload('file', file, {
        filename: file.name,
        contentType: file.type,
      });
      setUploadComplete(true);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Upload failed. Please try again or email your design.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="pt-32 pb-24 bg-dark min-h-screen text-light font-sans">
      <div className="container mx-auto px-4 max-w-2xl text-center">
        
        {/* Success Header */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }} 
          animate={{ opacity: 1, y: 0 }} 
          className="mb-16"
        >
          <div className="w-16 h-16 bg-white/[0.03] border border-white/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <FiCheckCircle className="text-primary text-2xl" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-heading mb-4 uppercase tracking-tighter">
            Order <span className="text-gradient-gold">Confirmed</span>
          </h1>
          <p className="text-light/40 text-base max-w-md mx-auto leading-relaxed">
            Your payment was successful. We’ve sent a confirmation receipt to your email.
          </p>
        </motion.div>

        {/* Minimalist Note Section */}
        <div className="mb-12 py-6 px-8 border-y border-white/5 text-center">
          <p className="text-[11px] text-light/30 uppercase tracking-[0.2em] leading-relaxed">
            <span className="text-light/60 font-bold mr-2">Note:</span> 
            If you selected <span className="text-light/60 italic">"Yes, I have a design"</span>, please use the uploader below. Otherwise, you may disregard this step.
          </p>
        </div>

        {/* Integrated Upload Section */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 0.2 }}
          className="mb-16 relative"
        >
          {!uploadComplete ? (
            <label className={`group block border border-white/5 rounded-3xl p-12 transition-all cursor-pointer bg-white/[0.01] hover:bg-white/[0.03] ${isUploading ? 'opacity-50 pointer-events-none' : ''}`}>
              <input 
                type="file" 
                className="hidden" 
                onChange={handleFileUpload} 
                disabled={isUploading}
              />
              
              {isUploading ? (
                <div className="flex flex-col items-center">
                  <FiLoader className="text-2xl mb-4 text-primary animate-spin" />
                  <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-primary">Uploading {fileName}...</span>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <FiUploadCloud className="text-3xl mb-4 text-light/10 group-hover:text-primary/50 transition-colors" />
                  <h3 className="text-sm font-bold uppercase tracking-widest text-light/60 mb-1">Upload Design</h3>
                  <p className="text-[10px] text-light/20 uppercase tracking-widest">PDF, AI, or High-Res PNG</p>
                </div>
              )}
            </label>
          ) : (
            <motion.div 
              initial={{ scale: 0.95 }} 
              animate={{ scale: 1 }}
              className="p-10 rounded-3xl border border-primary/20 bg-primary/[0.02]"
            >
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-primary mb-1">
                {fileName} Received
              </p>
              <p className="text-[10px] text-light/30 uppercase tracking-widest">Our team will verify your file shortly.</p>
            </motion.div>
          )}
        </motion.div>

        {/* Minimal Navigation */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link href="/shop" className="text-[10px] font-bold uppercase tracking-[0.3em] text-light/30 hover:text-primary transition-colors">
            Return to Shop
          </Link>
          <div className="hidden sm:block w-px h-4 bg-white/10" />
          <Link href="/" className="group flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.3em] text-light/60 hover:text-white transition-colors">
            Back to Home <FiArrowRight className="group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </div>
  );
}