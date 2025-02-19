import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { ArrowLeft, CheckCircle2, XCircle, Clock, ExternalLink, Plus, Download, Trash2, AlertCircle } from 'lucide-react';
import type { JobApplication, Job } from '@/lib/types';
import AddApplicantForm from './AddApplicantForm';

interface ApplicationWithJob extends JobApplication {
  jobs: Job;
}

export default function AllApplications() {
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [deleteLoading, setDeleteLoading] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (
            id,
            title,
            department,
            location,
            type,
            status
          )
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setApplications(data || []);
    } catch (error) {
      console.error('Error fetching applications:', error);
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
      
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId ? { ...app, status } : app
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
    }
  };

  const handleDeleteApplication = async (applicationId: string) => {
    try {
      setDeleteLoading(applicationId);
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', applicationId);

      if (error) throw error;
      
      setApplications(prev => prev.filter(app => app.id !== applicationId));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application. Please try again.');
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleApplicantAdded = () => {
    setShowAddForm(false);
    fetchApplications();
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'accepted':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'rejected':
        return <XCircle className="h-5 w-5 text-red-500" />;
      default:
        return <Clock className="h-5 w-5 text-yellow-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted':
        return 'bg-green-100 text-green-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-yellow-100 text-yellow-800';
    }
  };

  const handleDownloadResume = async (url: string, applicantName: string) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileExtension = url.split('.').pop();
      const fileName = `${applicantName.replace(/\s+/g, '_')}_resume.${fileExtension}`;
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = downloadUrl;
      link.download = fileName;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(downloadUrl);
    } catch (error) {
      console.error('Error downloading resume:', error);
      alert('Failed to download resume. Please try again.');
    }
  };

  if (loading) {
    return <div className="min-h-screen pt-20 flex items-center justify-center">Loading...</div>;
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
            <h1 className="text-3xl font-bold text-gray-900">Applicants</h1>
          </div>
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Applicant
          </button>
        </div>

        {showAddForm && (
          <div className="mb-8">
            <AddApplicantForm
              jobs={jobs}
              onCancel={() => setShowAddForm(false)}
              onSuccess={handleApplicantAdded}
            />
          </div>
        )}

        {applications.length === 0 ? (
          <div className="bg-white shadow rounded-lg p-6 text-center">
            <p className="text-gray-600">No applicants yet.</p>
          </div>
        ) : (
          <div className="bg-white shadow overflow-hidden sm:rounded-lg">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applicant
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Position
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Applied On
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((application) => (
                    <tr key={application.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {application.full_name}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.email}
                          </div>
                          {application.phone && (
                            <div className="text-sm text-gray-500">
                              {application.phone}
                            </div>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-col">
                          <div className="text-sm font-medium text-gray-900">
                            {application.jobs.title}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.jobs.department} · {application.jobs.location}
                          </div>
                          <div className="text-sm text-gray-500">
                            {application.jobs.type}
                            {application.jobs.status === 'closed' && (
                              <span className="ml-2 text-red-500">(Position Closed)</span>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(application.status)}`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(application.created_at).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <div className="flex items-center gap-4">
                          {application.resume_url && (
                            <div className="flex gap-2">
                              <a
                                href={application.resume_url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-cyan-600 hover:text-cyan-500"
                                title="View Resume"
                              >
                                <ExternalLink className="h-5 w-5" />
                              </a>
                              <button
                                onClick={() => handleDownloadResume(application.resume_url, application.full_name)}
                                className="text-cyan-600 hover:text-cyan-500"
                                title="Download Resume"
                              >
                                <Download className="h-5 w-5" />
                              </button>
                            </div>
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
                          {showDeleteConfirm === application.id ? (
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => handleDeleteApplication(application.id)}
                                disabled={deleteLoading === application.id}
                                className="inline-flex items-center px-3 py-1 border border-red-500 text-sm font-medium rounded-md text-white bg-red-500 hover:bg-red-600 disabled:opacity-50"
                              >
                                {deleteLoading === application.id ? 'Deleting...' : 'Confirm'}
                              </button>
                              <button
                                onClick={() => setShowDeleteConfirm(null)}
                                disabled={deleteLoading === application.id}
                                className="inline-flex items-center px-3 py-1 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50"
                              >
                                Cancel
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => setShowDeleteConfirm(application.id)}
                              className="text-red-500 hover:text-red-600"
                              title="Delete Application"
                            >
                              <Trash2 className="h-5 w-5" />
                            </button>
                          )}
                        </div>
                        {showDeleteConfirm === application.id && (
                          <div className="mt-2 flex items-center text-sm text-red-600">
                            <AlertCircle className="h-4 w-4 mr-1" />
                            This action cannot be undone. The application will be permanently deleted.
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}