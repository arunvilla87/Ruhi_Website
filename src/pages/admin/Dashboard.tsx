import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import Stats from './Stats';

export default function Dashboard() {
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#050A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
        </div>

        {/* Stats Section */}
        <Stats />
      </div>
    </div>
  );
}