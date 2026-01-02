'use client';

import Link from 'next/link';
import { FaFacebookF, FaLinkedinIn, FaInstagram, FaGithub, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-dark py-12 border-t border-white/10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mogul Design Agency</h3>
            <p className="text-gray-400">
              One-stop solution for businesses seeking to enhance their brand presence or their operational efficiency.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/services/design" className="hover:text-primary">Design</Link></li>
              <li><Link href="/services/automations" className="hover:text-primary">Automations</Link></li>
              <li><Link href="/services/web-design" className="hover:text-primary">Web Design</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Resources</h3>
            <ul className="space-y-2 text-gray-400">
              <li><Link href="/blog" className="hover:text-primary">Blog</Link></li>
              <li><Link href="/shop" className="hover:text-primary">Shop</Link></li>
              <li><Link href="/contact" className="hover:text-primary">Contact Us</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-white hover:text-primary transition-colors"><FaFacebookF size={20} /></a>
              <a href="#" className="text-white hover:text-primary transition-colors"><FaLinkedinIn size={20} /></a>
              <a href="#" className="text-white hover:text-primary transition-colors"><FaInstagram size={20} /></a>
              <a href="#" className="text-white hover:text-primary transition-colors"><FaGithub size={20} /></a>
              <a href="#" className="text-white hover:text-primary transition-colors"><FaYoutube size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-white/10 text-center text-gray-500">
          <p>© {new Date().getFullYear()} Mogul Design Agency LLC. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;