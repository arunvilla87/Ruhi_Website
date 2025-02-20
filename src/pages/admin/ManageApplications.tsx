import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, Edit, EyeOff, RefreshCw } from 'lucide-react';
import type { Job } from '@/lib/types';

export default function ManageApplications() {
  const navigate = useNavigate();
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchJobs();
  }, []);

  const checkAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login');
        return;
      }

      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', session.user.id)
        .single();

      if (profile?.role !== 'admin') {
        navigate('/admin/login');
      }
    } catch (error) {
      console.error('Error checking auth:', error);
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
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
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
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="inline-flex items-center text-[#00E5D1] hover:text-[#E5FFFC] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Dashboard
          </button>
          <h1 className="text-3xl font-bold gradient-text">Manage Applications</h1>
        </div>

        <div className="bg-[#0A1515] shadow overflow-hidden sm:rounded-lg border border-[#008F85]/20">
          <ul className="divide-y divide-[#008F85]/20">
            {jobs.map((job) => (
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
                        View Applications ({(job as any).applications?.[0]?.count || 0})
                      </button>
                      <button
                        onClick={() => navigate(`/admin/jobs/${job.id}`)}
                        className="inline-flex items-center px-3 py-1 border border-[#00E5D1] text-sm font-medium rounded-md text-[#00E5D1] bg-[#0A1515] hover:bg-[#00E5D1]/10 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
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
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}