import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Download, ArrowLeft, Edit } from 'lucide-react';
import type { ApplicationWithJob, ApplicationStatus } from '@/lib/types';

export default function AllApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    fetchApplications();
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

  const fetchApplications = async () => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .select(`
          *,
          jobs (*)
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

  const handleDownloadResume = async (application: ApplicationWithJob) => {
    if (!application.resume_url) {
      alert('No resume available for this application');
      return;
    }

    try {
      setDownloadingId(application.id);
      const response = await fetch(application.resume_url);
      if (!response.ok) throw new Error('Failed to download file');
      
      const blob = await response.blob();
      const fileExtension = application.resume_url.split('.').pop() || 'pdf';
      const fileName = `${application.full_name.replace(/\s+/g, '_')}_resume.${fileExtension}`;
      
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
    } finally {
      setDownloadingId(null);
    }
  };

  const updateApplicationStatus = async (applicationId: string, newStatus: ApplicationStatus) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update({ status: newStatus })
        .eq('id', applicationId);

      if (error) throw error;
      
      setApplications(prev => 
        prev.map(app => 
          app.id === applicationId ? { ...app, status: newStatus } : app
        )
      );
    } catch (error) {
      console.error('Error updating status:', error);
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
          <h1 className="text-3xl font-bold gradient-text">All Applications</h1>
        </div>

        <div className="bg-[#0A1515] rounded-lg border border-[#008F85]/20 overflow-hidden">
          {applications.map((application) => (
            <div key={application.id} className="p-4 border-b border-[#008F85]/20">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-[#E5FFFC] font-medium">{application.full_name}</h3>
                  <p className="text-[#E5FFFC]/70">{application.email}</p>
                </div>
                <div className="flex gap-2">
                  {application.resume_url && (
                    <button
                      onClick={() => handleDownloadResume(application)}
                      disabled={downloadingId === application.id}
                      className="text-[#00E5D1] hover:text-[#E5FFFC] transition-colors"
                    >
                      <Download className="h-5 w-5" />
                    </button>
                  )}
                  <button
                    onClick={() => updateApplicationStatus(application.id, 'reviewed')}
                    className="text-[#00E5D1] hover:text-[#E5FFFC] transition-colors"
                  >
                    <Edit className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}