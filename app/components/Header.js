'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiShoppingBag, FiArrowUpRight } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import { useShop } from '../../context/ShopContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useShop();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => setIsOpen(!isOpen);
  const cartCount = cart ? cart.length : 0;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Design', path: '/services/design' },
    { name: 'Automations', path: '/services/automations' },
    { name: 'Web Design', path: '/services/web-design' },
    { name: 'Blog', path: '/blog' },
    { name: 'Shop', path: '/shop' },
  ];

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-3' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        
        {/* Logo */}
        <Link href="/" className="flex items-center group">
          <img 
            src="/logo.png" 
            alt="Mogul Design Logo" 
            className="h-10 w-auto object-contain transition-transform duration-300 group-hover:scale-105" 
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-8">
          {navItems.map((item) => (
            <Link 
              key={item.path} 
              href={item.path} 
              className="relative text-white/80 hover:text-white font-medium transition-all duration-300 group"
            >
              {item.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
            </Link>
          ))}
        </nav>

        {/* Right Side Actions */}
        <div className="hidden lg:flex items-center space-x-4">
          {/* Cart */}
          <Link href="/cart" className="relative p-2 text-white/80 hover:text-primary transition-colors">
            <FiShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          {/* CTA Button */}
          <Link 
            href="/contact" 
            className="group flex items-center gap-2 bg-primary text-black font-bold font-heading px-6 py-2.5 rounded-full transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,162,0,0.4)] hover:-translate-y-0.5"
          >
            Contact Us
            <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center space-x-4">
          <Link href="/cart" className="relative p-2 text-white/80 hover:text-primary transition-colors">
            <FiShoppingBag size={22} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-primary text-black text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button 
            onClick={toggleMenu} 
            className="p-2 text-white hover:text-primary transition-colors"
          >
            {isOpen ? <FiX size={26} /> : <FiMenu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-white/10"
          >
            <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link
                    href={item.path}
                    className="block text-xl font-medium text-white/80 hover:text-primary transition-colors py-2"
                    onClick={toggleMenu}
                  >
                    {item.name}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navItems.length * 0.05 }}
                className="pt-4 border-t border-white/10"
              >
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 bg-primary text-black font-bold font-heading px-6 py-3 rounded-full"
                  onClick={toggleMenu}
                >
                  Contact Us
                  <FiArrowUpRight />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;