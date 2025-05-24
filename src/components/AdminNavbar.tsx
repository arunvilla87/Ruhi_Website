import { Link, useNavigate } from 'react-router-dom';
import { LogOut, LayoutDashboard, Briefcase, Users } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function AdminNavbar() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0A1515] border-b border-[#008F85]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/admin/dashboard" className="flex items-center text-[#00E5D1] font-semibold">
              Admin Portal
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/admin/dashboard"
              className="flex items-center px-3 py-2 text-[#E5FFFC] hover:text-[#00E5D1] transition-colors"
            >
              <LayoutDashboard className="h-5 w-5 mr-1" />
              Dashboard
            </Link>
            
            <Link
              to="/admin/jobs"
              className="flex items-center px-3 py-2 text-[#E5FFFC] hover:text-[#00E5D1] transition-colors"
            >
              <Briefcase className="h-5 w-5 mr-1" />
              Jobs
            </Link>
            
            <Link
              to="/admin/applications"
              className="flex items-center px-3 py-2 text-[#E5FFFC] hover:text-[#00E5D1] transition-colors"
            >
              <Users className="h-5 w-5 mr-1" />
              Applications
            </Link>

            <button
              onClick={handleSignOut}
              className="flex items-center px-3 py-2 text-[#E5FFFC] hover:text-[#00E5D1] transition-colors"
            >
              <LogOut className="h-5 w-5 mr-1" />
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}