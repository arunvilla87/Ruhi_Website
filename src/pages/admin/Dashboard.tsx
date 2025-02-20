import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Plus, LogOut, Users, AlertCircle, Inbox, Search, EyeOff, RefreshCw } from 'lucide-react';
import type { Job } from '@/lib/types';

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    location: '',
    status: 'all',
    title: '',
  });
  const [uniqueLocations, setUniqueLocations] = useState<string[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchJobs();
  }, []);

  useEffect(() => {
    // Extract unique locations from jobs
    const locations = [...new Set(jobs.map(job => job.location))];
    setUniqueLocations(locations);
  }, [jobs]);

  useEffect(() => {
    // Apply filters
    let result = [...jobs];

    if (filters.location) {
      result = result.filter(job => job.location === filters.location);
    }

    if (filters.status !== 'all') {
      result = result.filter(job => job.status === filters.status);
    }

    if (filters.title) {
      const searchTerm = filters.title.toLowerCase();
      result = result.filter(job => 
        job.title.toLowerCase().includes(searchTerm) ||
        job.department.toLowerCase().includes(searchTerm)
      );
    }

    setFilteredJobs(result);
  }, [filters, jobs]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*, applications(count)')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
      setFilteredJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/admin/login');
  };

  const handleStatusChange = async (jobId: string, newStatus: 'open' | 'closed') => {
    try {
      setDeleteLoading(jobId);

      const { error } = await supabase
        .from('jobs')
        .update({ status: newStatus })
        .eq('id', jobId);

      if (error) throw error;
      
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId ? { ...job, status: newStatus } : job
        )
      );
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error updating job status:', error);
      alert('Failed to update job status. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#050A0A] text-[#E5FFFC]">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#050A0A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold gradient-text">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/admin/applications')}
              className="inline-flex items-center px-4 py-2 border border-[#00E5D1] rounded-md shadow-sm text-sm font-medium text-[#00E5D1] bg-[#0A1515] hover:bg-[#00E5D1]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00E5D1] transition-colors"
            >
              <Inbox className="h-5 w-5 mr-2" />
              All Applicants
            </button>
            <button
              onClick={() => navigate('/admin/jobs/new')}
              className="inline-flex items-center px-4 py-2 border border-[#00E5D1] rounded-md shadow-sm text-sm font-medium text-[#00E5D1] bg-[#0A1515] hover:bg-[#00E5D1]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#00E5D1] transition-colors"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Job
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-[#008F85]/20 rounded-md shadow-sm text-sm font-medium text-[#E5FFFC] bg-[#0A1515] hover:bg-[#008F85]/10 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#008F85] transition-colors"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        {/* Filters */}
        <div className="mb-8 bg-[#0A1515] p-4 rounded-lg border border-[#008F85]/20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label htmlFor="location" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                Location
              </label>
              <select
                id="location"
                value={filters.location}
                onChange={(e) => setFilters(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
              >
                <option value="">All Locations</option>
                {uniqueLocations.map(location => (
                  <option key={location} value={location}>{location}</option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                Status
              </label>
              <select
                id="status"
                value={filters.status}
                onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value }))}
                className="w-full px-4 py-2 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
              >
                <option value="all">All Status</option>
                <option value="open">Open</option>
                <option value="closed">Closed</option>
              </select>
            </div>
            <div>
              <label htmlFor="search" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                Search Title/Department
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="search"
                  value={filters.title}
                  onChange={(e) => setFilters(prev => ({ ...prev, title: e.target.value }))}
                  placeholder="Search..."
                  className="w-full px-4 py-2 pl-10 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
                />
                <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#008F85]" />
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-[#E5FFFC] mb-4">Job Listings</h2>

        {loading ? (
          <div className="text-center py-12 text-[#E5FFFC]">Loading...</div>
        ) : filteredJobs.length === 0 ? (
          <div className="bg-[#0A1515] shadow rounded-lg p-6 text-center border border-[#008F85]/20">
            <p className="text-[#E5FFFC] opacity-70">No job listings found.</p>
          </div>
        ) : (
          <div className="bg-[#0A1515] shadow overflow-hidden sm:rounded-lg border border-[#008F85]/20">
            <ul className="divide-y divide-[#008F85]/20">
              {filteredJobs.map((job) => (
                <li key={job.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-[#008F85]/5">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-[#00E5D1] truncate">
                          {job.title}
                        </h3>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-[#E5FFFC] opacity-70">
                            <span className="truncate">{job.department}</span>
                            <span className="mx-2">·</span>
                            <span>{job.location}</span>
                            <span className="mx-2">·</span>
                            <span>{job.type}</span>
                            {job.status === 'closed' && (
                              <>
                                <span className="mx-2">·</span>
                                <span className="text-red-500 font-medium">Closed</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => navigate(`/admin/jobs/${job.id}/applications`)}
                          className="inline-flex items-center px-3 py-1 border border-[#008F85]/20 text-sm font-medium rounded-md text-[#E5FFFC] bg-[#0A1515] hover:bg-[#008F85]/10 transition-colors"
                        >
                          <Users className="h-4 w-4 mr-1" />
                          Applications ({(job as any).applications?.[0]?.count || 0})
                        </button>
                        <button
                          onClick={() => navigate(`/admin/jobs/${job.id}`)}
                          className="inline-flex items-center px-3 py-1 border border-[#00E5D1] text-sm font-medium rounded-md text-[#00E5D1] bg-[#0A1515] hover:bg-[#00E5D1]/10 transition-colors"
                        >
                          Edit Job
                        </button>
                        {job.status === 'open' ? (
                          showDeleteConfirm === job.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleStatusChange(job.id, 'closed')}
                                disabled={deleteLoading === job.id}
                                className="inline-flex items-center px-3 py-1 border border-red-500 text-sm font-medium rounded-md text-red-500 hover:bg-red-500/10 disabled:opacity-50 transition-colors"
                              >
                                {deleteLoading === job.id ? 'Closing...' : 'Confirm'}
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                disabled={deleteLoading === job.id}
                                className="inline-flex items-center px-3 py-1 border border-[#008F85]/20 text-sm font-medium rounded-md text-[#E5FFFC] bg-[#0A1515] hover:bg-[#008F85]/10 disabled:opacity-50 transition-colors"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowDeleteConfirm(job.id)}
                              className="inline-flex items-center px-3 py-1 border border-red-500 text-sm font-medium rounded-md text-red-500 hover:bg-red-500/10 transition-colors"
                            >
                              <EyeOff className="h-4 w-4" />
                            </button>
                          )
                        ) : (
                          <button
                            onClick={() => handleStatusChange(job.id, 'open')}
                            className="inline-flex items-center px-3 py-1 border border-green-500 text-sm font-medium rounded-md text-green-500 hover:bg-green-500/10 transition-colors"
                          >
                            <RefreshCw className="h-4 w-4 mr-1" />
                            Reopen
                          </button>
                        )}
                      </div>
                    </div>
                    {showDeleteConfirm === job.id && (
                      <div className="mt-2 flex items-center text-sm text-red-500">
                        <AlertCircle className="h-4 w-4 mr-1" />
                        This will close the job listing. Applications will be preserved but no new applications will be accepted.
                      </div>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}