import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Plus, LogOut, Users, Trash2, AlertCircle, Inbox } from 'lucide-react';
import type { Job } from '@/lib/types';

export default function Dashboard() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    checkAuth();
    fetchJobs();
  }, []);

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

  const handleDelete = async (jobId: string) => {
    try {
      setDeleteLoading(jobId);

      // Instead of deleting, update the job status to 'closed'
      const { error } = await supabase
        .from('jobs')
        .update({ status: 'closed' })
        .eq('id', jobId);

      if (error) throw error;
      
      // Update the job in the local state
      setJobs(prevJobs => 
        prevJobs.map(job => 
          job.id === jobId ? { ...job, status: 'closed' } : job
        )
      );
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error closing job:', error);
      alert('Failed to close job listing. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-4">
            <button
              onClick={() => navigate('/admin/applications')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <Inbox className="h-5 w-5 mr-2" />
              All Applicants
            </button>
            <button
              onClick={() => navigate('/admin/jobs/new')}
              className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <Plus className="h-5 w-5 mr-2" />
              New Job
            </button>
            <button
              onClick={handleLogout}
              className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              <LogOut className="h-5 w-5 mr-2" />
              Logout
            </button>
          </div>
        </div>

        <h2 className="text-xl font-semibold text-gray-900 mb-4">Job Listings</h2>

        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : jobs.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">No job listings yet. Click "New Job" to create one.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {jobs.map((job) => (
                <li key={job.id}>
                  <div className="px-4 py-4 sm:px-6 hover:bg-gray-50">
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-medium text-cyan-600 truncate">
                          {job.title}
                        </h3>
                        <div className="mt-2 flex">
                          <div className="flex items-center text-sm text-gray-500">
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
                          className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                        >
                          <Users className="h-4 w-4 mr-1" />
                          Applications ({(job as any).applications?.[0]?.count || 0})
                        </button>
                        <button
                          onClick={() => navigate(`/admin/jobs/${job.id}`)}
                          className="inline-flex items-center px-3 py-1 border border-cyan-500 text-sm font-medium rounded-md text-cyan-700 bg-cyan-100 hover:bg-cyan-200"
                        >
                          Edit Job
                        </button>
                        {job.status !== 'closed' && (
                          showDeleteConfirm === job.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDelete(job.id)}
                                disabled={deleteLoading === job.id}
                                className="inline-flex items-center px-3 py-1 border border-red-500 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 disabled:opacity-50"
                              >
                                {deleteLoading === job.id ? 'Closing...' : 'Confirm'}
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                disabled={deleteLoading === job.id}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowDeleteConfirm(job.id)}
                              className="inline-flex items-center px-3 py-1 border border-red-500 text-sm font-medium rounded-md text-red-500 hover:bg-red-50"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          )
                        )}
                      </div>
                    </div>
                    {showDeleteConfirm === job.id && (
                      <div className="mt-2 flex items-center text-sm text-red-600">
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