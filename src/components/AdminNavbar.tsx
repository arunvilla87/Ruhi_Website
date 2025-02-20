import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { LogOut, Users, Briefcase, LayoutDashboard, ClipboardList, Menu, X } from 'lucide-react';
import { Logo } from './Logo';

export default function AdminNavbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const isActive = (path: string) => {
    return location.pathname.startsWith(path);
  };

  const navItems = [
    {
      path: '/admin/dashboard',
      label: 'Dashboard',
      icon: LayoutDashboard
    },
    {
      path: '/admin/applications',
      label: 'All Applicants',
      icon: Users
    },
    {
      path: '/admin/jobs',
      label: 'Manage Jobs',
      icon: ClipboardList,
      excludePath: '/admin/jobs/new'
    }
  ];

  return (
    <div className="fixed w-full z-50 px-4 sm:px-6 lg:px-8 top-4">
      <nav className={`max-w-7xl mx-auto rounded-full transition-all duration-300 ${
        isScrolled ? 'bg-[#0A1515]/95 backdrop-blur-sm shadow-lg' : 'bg-[#0A1515]/80 backdrop-blur-sm'
      }`}>
        <div className="px-4 sm:px-6">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <Link to="/admin/dashboard">
                <Logo isScrolled={isScrolled} />
              </Link>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8 ml-16">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`relative font-medium uppercase tracking-wide transition-colors group ${
                    isActive(item.path) && (!item.excludePath || !isActive(item.excludePath))
                      ? 'text-[#00E5D1]' 
                      : 'text-[#E5FFFC]/90 hover:text-[#00E5D1]'
                  }`}
                >
                  <div className="flex items-center">
                    <item.icon className="h-4 w-4 mr-2" />
                    <span>{item.label}</span>
                  </div>
                  <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-[#00E5D1] transition-all duration-300 group-hover:w-full ${
                    isActive(item.path) && (!item.excludePath || !isActive(item.excludePath)) ? 'w-full' : ''
                  }`}></span>
                </Link>
              ))}

              <Link
                to="/admin/jobs/new"
                className={`inline-flex items-center px-6 py-2 border-2 border-[#00E5D1] text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300 ${
                  isActive('/admin/jobs/new') ? 'bg-[#00E5D1] text-[#050A0A]' : ''
                }`}
              >
                <Briefcase className="h-4 w-4 mr-2" />
                Post New Job
              </Link>

              <button
                onClick={handleLogout}
                className="inline-flex items-center px-4 py-2 border border-[#008F85]/20 rounded-md text-[#E5FFFC]/90 hover:text-[#00E5D1] hover:border-[#00E5D1] transition-colors"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </button>
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
          <div className="md:hidden absolute top-full left-0 right-0 mt-2 mx-4">
            <div className="bg-[#0A1515] rounded-2xl shadow-lg overflow-hidden border border-[#008F85]/20">
              <div className="px-4 pt-2 pb-3 space-y-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    className={`block px-4 py-3 rounded-lg font-medium uppercase tracking-wide transition-colors ${
                      isActive(item.path) && (!item.excludePath || !isActive(item.excludePath))
                        ? 'text-[#00E5D1] bg-[#00E5D1]/10' 
                        : 'text-[#E5FFFC]/90 hover:text-[#00E5D1] hover:bg-[#00E5D1]/10'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    <div className="flex items-center">
                      <item.icon className="h-4 w-4 mr-2" />
                      {item.label}
                    </div>
                  </Link>
                ))}

                <Link
                  to="/admin/jobs/new"
                  className={`block px-4 py-3 rounded-lg font-medium uppercase tracking-wide transition-colors ${
                    isActive('/admin/jobs/new')
                      ? 'text-[#00E5D1] bg-[#00E5D1]/10' 
                      : 'text-[#E5FFFC]/90 hover:text-[#00E5D1] hover:bg-[#00E5D1]/10'
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-center">
                    <Briefcase className="h-4 w-4 mr-2" />
                    Post New Job
                  </div>
                </Link>

                <button
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }}
                  className="w-full text-left px-4 py-3 rounded-lg font-medium uppercase tracking-wide text-red-500 hover:bg-red-500/10 transition-colors"
                >
                  <div className="flex items-center">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </div>
                </button>
              </div>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
}