import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        // Check if user has admin role
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();

        if (profile?.role === 'admin') {
          navigate('/admin/dashboard');
        } else {
          // If not admin, sign out silently without trying to invalidate session
          await supabase.auth.signOut({ scope: 'local' });
          setError('Unauthorized. Admin access only.');
        }
      }
    } catch (error) {
      console.error('Auth check error:', error);
      // Handle error silently - user will need to log in
    }
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Sign in with email and password
      const { data, error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) throw signInError;

      // Check if user has admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError) throw profileError;

      if (profile?.role !== 'admin') {
        // If not admin, sign out silently
        await supabase.auth.signOut({ scope: 'local' });
        throw new Error('Unauthorized. Admin access only.');
      }

      navigate('/admin/dashboard');
    } catch (err: any) {
      setError(err.message);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A1515] flex">
      {/* Left Side - Logo and Brand */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#050A0A] items-center justify-center p-12">
        <div className="max-w-md">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-12 bg-gradient-to-br from-[#00E5D1] to-[#00A896] rounded-lg flex items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className="w-8 h-8 text-white"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                />
              </svg>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-[#E5FFFC]">RUHI ENTERPRISES</h1>
              <p className="text-sm tracking-widest text-[#00E5D1]">INC</p>
            </div>
          </div>
          <div className="space-y-4">
            <h2 className="text-3xl font-bold gradient-text">Admin Dashboard</h2>
            <p className="text-[#E5FFFC] opacity-70">
              Secure access to manage job listings, applications, and company resources.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold gradient-text">Welcome Back</h2>
            <p className="text-[#E5FFFC] opacity-70 mt-2">
              Please login to Admin Dashboard.
            </p>
          </div>

          <div className="card-glow bg-[#0A1515] p-8 rounded-xl border border-[#008F85]/20">
            <form onSubmit={handleLogin} className="space-y-6">
              {error && (
                <div className="bg-red-500/10 border border-red-500/20 text-red-500 px-4 py-3 rounded-lg text-sm">
                  {error}
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                  placeholder="Enter your password"
                  required
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#00E5D1] focus:ring-[#00E5D1] border-[#008F85]/20 rounded"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-[#E5FFFC]">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <a href="#" className="text-[#00E5D1] hover:text-[#00E5D1]/80">
                    Forgot password?
                  </a>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center px-8 py-4 border-2 border-[#00E5D1] text-lg font-medium rounded-lg text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Signing in...' : 'Sign in'}
              </button>
            </form>
          </div>

          <p className="mt-8 text-center text-sm text-[#E5FFFC] opacity-70">
            Protected by enterprise-grade security
          </p>
        </div>
      </div>
    </div>
  );
}