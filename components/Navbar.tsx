"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 top-4">
      <nav className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-black/20 backdrop-blur-sm'
      }`}>
        <div className="px-4 sm:px-6">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <Link href="/">
                <Logo isScrolled={isScrolled} />
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-8">
              <Link
                href="/"
                className={`font-medium uppercase tracking-wide transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`font-medium uppercase tracking-wide transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                About
              </Link>
              <Link
                href="/services"
                className={`font-medium uppercase tracking-wide transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                Services
              </Link>
              <Link
                href="/careers"
                className={`font-medium uppercase tracking-wide transition-colors ${
                  isScrolled ? 'text-gray-600 hover:text-gray-900' : 'text-white/90 hover:text-white'
                }`}
              >
                Careers
              </Link>
              <Link
                href="/contact"
                className={`px-6 py-2 rounded-full border-2 font-medium uppercase tracking-wide transition-colors ${
                  isScrolled
                    ? 'border-cyan-500 text-cyan-500 hover:bg-cyan-500 hover:text-white'
                    : 'border-white/80 text-white/90 hover:bg-white hover:text-gray-900 hover:border-white'
                }`}
              >
                Contact
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-colors ${
                  isScrolled ? 'text-gray-600' : 'text-white'
                }`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="px-4 pt-2 pb-3 space-y-1">
                <Link
                  href="/"
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium uppercase tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  Home
                </Link>
                <Link
                  href="/about"
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium uppercase tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  About
                </Link>
                <Link
                  href="/services"
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium uppercase tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  Services
                </Link>
                <Link
                  href="/careers"
                  className="block px-4 py-3 text-gray-600 hover:text-gray-900 hover:bg-gray-50 rounded-lg font-medium uppercase tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  Careers
                </Link>
                <Link
                  href="/contact"
                  className="block px-4 py-3 text-cyan-500 hover:text-cyan-600 hover:bg-cyan-50 rounded-lg font-medium uppercase tracking-wide"
                  onClick={() => setIsOpen(false)}
                >
                  Contact
                </Link>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;