import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Download, ArrowLeft, CheckCircle, XCircle, Clock } from 'lucide-react';
import type { JobApplication, Job } from '@/lib/types';

export default function ApplicationsList() {
  const { id } = useParams();
  const [applications, setApplications] = useState<JobApplication[]>([]);
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, [id]);

  const fetchData = async () => {
    try {
      // Fetch job details
      const { data: jobData, error: jobError } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (jobError) throw jobError;
      setJob(jobData);

      // Fetch applications
      const { data: applicationsData, error: applicationsError } = await supabase
        .from('applications')
        .select('*')
        .eq('job_id', id)
        .order('created_at', { ascending: false });

      if (applicationsError) throw applicationsError;
      setApplications(applicationsData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateApplicationStatus = async (applicationId: string, status: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status })
        .eq('id', applicationId);

      if (error) throw error;
      
      // Update local state
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
  }

  if (!job) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900">Job not found</h2>
            <Link
              to="/admin/dashboard"
              className="mt-6 inline-flex items-center text-cyan-600 hover:text-cyan-500"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <Link
              to="/admin/dashboard"
              className="inline-flex items-center text-cyan-600 hover:text-cyan-500 mb-4"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Dashboard
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">Applications for {job.title}</h1>
            <p className="text-gray-600">{job.department} · {job.location} · {job.type}</p>
          </div>
        </div>

        {applications.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">No applications received yet.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-md">
            <ul className="divide-y divide-gray-200">
              {applications.map((application) => (
                <li key={application.id}>
                  <div className="px-4 py-5 sm:px-6">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-medium text-gray-900">{application.full_name}</h3>
                        <div className="mt-1 text-sm text-gray-600">
                          <p>Email: {application.email}</p>
                          {application.phone && <p>Phone: {application.phone}</p>}
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        {application.resume_url && (
                          <a
                            href={application.resume_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                          >
                            <Download className="h-4 w-4 mr-1" />
                            Resume
                          </a>
                        )}
                        <select
                          value={application.status}
                          onChange={(e) => updateApplicationStatus(application.id, e.target.value)}
                          className="rounded-md border-gray-300 text-sm focus:ring-cyan-500 focus:border-cyan-500"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                        {getStatusIcon(application.status)}
                      </div>
                    </div>
                    {application.cover_letter && (
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-900">Cover Letter</h4>
                        <p className="mt-1 text-sm text-gray-600 whitespace-pre-line">
                          {application.cover_letter}
                        </p>
                      </div>
                    )}
                    <div className="mt-2 text-sm text-gray-500">
                      Applied on {new Date(application.created_at).toLocaleDateString()}
                    </div>
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