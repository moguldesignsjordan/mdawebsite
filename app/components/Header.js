'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiMenu, FiX, FiShoppingBag } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
// We use a relative path here to ensure it finds the context folder in the root
import { useShop } from '../../context/ShopContext';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  const { cart } = useShop();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Safely check if cart exists before getting length
  const cartCount = cart ? cart.length : 0;

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Design', path: '/services/design' },
    { name: 'Automations', path: '/services/automations' },
    { name: 'Web Design', path: '/services/web-design' },
    { name: 'Blog', path: '/blog' },
    { name: 'Shop', path: '/shop' },
    { name: 'Contact Us', path: '/contact' },
  ];

  return (
    <header className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-white/10 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        
        {/* LOGO SECTION */}
        <Link href="/" className="flex items-center">
           <img 
             src="/logo.png" 
             alt="Mogul Design Logo" 
             className="h-12 w-auto object-contain" // Adjusted height to 12 (3rem) for better visibility
           />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-8 items-center">
          {navItems.map((item) => (
            <Link key={item.path} href={item.path} className="hover:text-primary transition-colors font-medium">
              {item.name}
            </Link>
          ))}
          <Link href="/cart" className="relative hover:text-primary transition-colors">
            <FiShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <div className="md:hidden flex items-center space-x-4">
          <Link href="/cart" className="relative hover:text-primary transition-colors">
            <FiShoppingBag size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          <button onClick={toggleMenu} className="text-white focus:outline-none">
            {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
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
            className="md:hidden bg-[#111] border-t border-white/10"
          >
            <nav className="container mx-auto px-4 py-4 flex flex-col space-y-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  href={item.path}
                  className="hover:text-primary transition-colors font-medium text-lg"
                  onClick={toggleMenu}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;