import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const isActivePath = (path: string) => {
    if (path === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(path);
  };

  return (
    <div className="fixed w-full z-50 top-0">
      <nav className={`w-full transition-all duration-300 ${
        isScrolled ? 'bg-[#0A1515]/95 backdrop-blur-sm shadow-lg' : 'bg-black/20 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-20">
            <div className="flex items-center">
              <Link to="/">
                <Logo isScrolled={isScrolled} />
              </Link>
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-12">
              <Link
                to="/"
                className={`relative font-medium uppercase tracking-wide transition-colors group ${
                  isActivePath('/') 
                    ? 'text-[#00E5D1]' 
                    : isScrolled 
                      ? 'text-[#E5FFFC]/90 hover:text-[#00E5D1]' 
                      : 'text-white/90 hover:text-[#00E5D1]'
                }`}
              >
                <span>HOME</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00E5D1] transition-all duration-300 group-hover:w-full ${
                  isActivePath('/') ? 'w-full' : ''
                }`}></span>
              </Link>
              <Link
                to="/about"
                className={`relative font-medium uppercase tracking-wide transition-colors group ${
                  isActivePath('/about') 
                    ? 'text-[#00E5D1]' 
                    : isScrolled 
                      ? 'text-[#E5FFFC]/90 hover:text-[#00E5D1]' 
                      : 'text-white/90 hover:text-[#00E5D1]'
                }`}
              >
                <span>ABOUT</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00E5D1] transition-all duration-300 group-hover:w-full ${
                  isActivePath('/about') ? 'w-full' : ''
                }`}></span>
              </Link>
              <Link
                to="/services"
                className={`relative font-medium uppercase tracking-wide transition-colors group ${
                  isActivePath('/services') 
                    ? 'text-[#00E5D1]' 
                    : isScrolled 
                      ? 'text-[#E5FFFC]/90 hover:text-[#00E5D1]' 
                      : 'text-white/90 hover:text-[#00E5D1]'
                }`}
              >
                <span>SERVICES</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00E5D1] transition-all duration-300 group-hover:w-full ${
                  isActivePath('/services') ? 'w-full' : ''
                }`}></span>
              </Link>
              <Link
                to="/careers"
                className={`relative font-medium uppercase tracking-wide transition-colors group ${
                  isActivePath('/careers') 
                    ? 'text-[#00E5D1]' 
                    : isScrolled 
                      ? 'text-[#E5FFFC]/90 hover:text-[#00E5D1]' 
                      : 'text-white/90 hover:text-[#00E5D1]'
                }`}
              >
                <span>CAREERS</span>
                <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00E5D1] transition-all duration-300 group-hover:w-full ${
                  isActivePath('/careers') ? 'w-full' : ''
                }`}></span>
              </Link>
              <Link
                to="/contact"
                className={`px-6 py-2 rounded-full border-2 font-medium uppercase tracking-wide transition-all duration-300 ${
                  isActivePath('/contact')
                    ? 'border-[#00E5D1] text-[#00E5D1] hover:bg-[#00E5D1] hover:text-[#0A1515]'
                    : isScrolled
                      ? 'border-[#E5FFFC]/80 text-[#E5FFFC]/90 hover:border-[#00E5D1] hover:text-[#00E5D1]'
                      : 'border-white/80 text-white/90 hover:border-[#00E5D1] hover:text-[#00E5D1]'
                }`}
              >
                CONTACT
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className={`transition-colors ${
                  isScrolled ? 'text-[#E5FFFC]' : 'text-white'
                }`}
              >
                {isOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0">
            <div className="bg-[#0A1515] shadow-lg border-t border-[#008F85]/20">
              <div className="px-4 pt-2 pb-3 space-y-1">
                <Link
                  to="/"
                  className={`block px-4 py-3 rounded-lg font-medium uppercase tracking-wide transition-colors ${
                    isActivePath('/') 
                      ? 'text-[#00E5D1] bg-[#00E5D1]/10' 
                      : 'text-[#E5FFFC]/90 hover:text-[#00E5D1] hover:bg-[#00E5D1]/10'
                  }`}
                >
                  HOME
                </Link>
                <Link
                  to="/about"
                  className={`block px-4 py-3 rounded-lg font-medium uppercase tracking-wide transition-colors ${
                    isActivePath('/about') 
                      ? 'text-[#00E5D1] bg-[#00E5D1]/10' 
                      : 'text-[#E5FFFC]/90 hover:text-[#00E5D1] hover:bg-[#00E5D1]/10'
                  }`}
                >
                  ABOUT
                </Link>
                <Link
                  to="/services"
                  className={`block px-4 py-3 rounded-lg font-medium uppercase tracking-wide transition-colors ${
                    isActivePath('/services') 
                      ? 'text-[#00E5D1] bg-[#00E5D1]/10' 
                      : 'text-[#E5FFFC]/90 hover:text-[#00E5D1] hover:bg-[#00E5D1]/10'
                  }`}
                >
                  SERVICES
                </Link>
                <Link
                  to="/careers"
                  className={`block px-4 py-3 rounded-lg font-medium uppercase tracking-wide transition-colors ${
                    isActivePath('/careers') 
                      ? 'text-[#00E5D1] bg-[#00E5D1]/10' 
                      : 'text-[#E5FFFC]/90 hover:text-[#00E5D1] hover:bg-[#00E5D1]/10'
                  }`}
                >
                  CAREERS
                </Link>
                <Link
                  to="/contact"
                  className={`block px-4 py-3 rounded-lg font-medium uppercase tracking-wide transition-colors ${
                    isActivePath('/contact') 
                      ? 'text-[#00E5D1] bg-[#00E5D1]/10' 
                      : 'text-[#E5FFFC]/90 hover:text-[#00E5D1] hover:bg-[#00E5D1]/10'
                  }`}
                >
                  CONTACT
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