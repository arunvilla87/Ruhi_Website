import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { Download, ArrowLeft, Edit, Trash2, Plus, Search, X, Filter } from 'lucide-react';
import type { ApplicationWithJob, ApplicationStatus, VisaStatus, EmploymentType } from '@/lib/types';
import AddApplicantForm from './AddApplicantForm';

export default function AllApplications() {
  const navigate = useNavigate();
  const [applications, setApplications] = useState<ApplicationWithJob[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    status: '' as ApplicationStatus
  });

  // Filters
  const [filters, setFilters] = useState({
    search: '',
    status: '' as ApplicationStatus | '',
    visa_status: '' as VisaStatus | '',
    employment_type: '' as EmploymentType | '',
    position: ''
  });
  const [showFilters, setShowFilters] = useState(false);
  const [positions, setPositions] = useState<Array<{ id: string; title: string }>>([]);

  useEffect(() => {
    checkAuth();
    fetchApplications();
    fetchPositions();
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

  const fetchPositions = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('id, title');

      if (error) throw error;
      setPositions(data || []);
    } catch (error) {
      console.error('Error fetching positions:', error);
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

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .delete()
        .eq('id', id);

      if (error) throw error;
      
      setApplications(prev => prev.filter(app => app.id !== id));
      setShowDeleteConfirm(null);
    } catch (error) {
      console.error('Error deleting application:', error);
      alert('Failed to delete application. Please try again.');
    }
  };

  const handleEdit = (application: ApplicationWithJob) => {
    setIsEditing(application.id);
    setEditForm({
      full_name: application.full_name,
      email: application.email,
      phone: application.phone || '',
      status: application.status as ApplicationStatus
    });
  };

  const handleUpdate = async (id: string) => {
    try {
      const { error } = await supabase
        .from('applications')
        .update(editForm)
        .eq('id', id);

      if (error) throw error;
      
      setApplications(prev => 
        prev.map(app => 
          app.id === id ? { ...app, ...editForm } : app
        )
      );
      setIsEditing(null);
    } catch (error) {
      console.error('Error updating application:', error);
      alert('Failed to update application. Please try again.');
    }
  };

  const handleAddApplicant = async (newApplicant: any) => {
    try {
      const { data, error } = await supabase
        .from('applications')
        .insert([newApplicant])
        .select(`
          *,
          jobs (*)
        `)
        .single();

      if (error) throw error;
      
      setApplications(prev => [data, ...prev]);
      setShowAddForm(false);
    } catch (error) {
      console.error('Error adding applicant:', error);
      alert('Failed to add applicant. Please try again.');
    }
  };

  const resetFilters = () => {
    setFilters({
      search: '',
      status: '',
      visa_status: '',
      employment_type: '',
      position: ''
    });
  };

  const filteredApplications = applications.filter(app => {
    const matchesSearch = 
      app.full_name.toLowerCase().includes(filters.search.toLowerCase()) ||
      app.email.toLowerCase().includes(filters.search.toLowerCase()) ||
      (app.phone && app.phone.includes(filters.search));

    const matchesStatus = !filters.status || app.status === filters.status;
    const matchesVisa = !filters.visa_status || app.visa_status === filters.visa_status;
    const matchesEmployment = !filters.employment_type || app.employment_type === filters.employment_type;
    const matchesPosition = !filters.position || app.job_id === filters.position;

    return matchesSearch && matchesStatus && matchesVisa && matchesEmployment && matchesPosition;
  });

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
          <button
            onClick={() => setShowAddForm(true)}
            className="inline-flex items-center px-4 py-2 border border-[#00E5D1] rounded-md text-[#00E5D1] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-colors"
          >
            <Plus className="h-5 w-5 mr-2" />
            Add Applicant
          </button>
        </div>

        {/* Search and Filters */}
        <div className="mb-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="relative flex-1 max-w-lg">
              <input
                type="text"
                placeholder="Search applications..."
                value={filters.search}
                onChange={(e) => setFilters(prev => ({ ...prev, search: e.target.value }))}
                className="w-full px-4 py-2 pl-10 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-[#008F85]" />
            </div>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="ml-4 inline-flex items-center px-4 py-2 border border-[#008F85]/20 rounded-md text-[#E5FFFC] hover:bg-[#008F85]/10 transition-colors"
            >
              <Filter className="h-5 w-5 mr-2" />
              Filters
            </button>
          </div>

          {showFilters && (
            <div className="bg-[#0A1515] p-4 rounded-lg border border-[#008F85]/20">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div>
                  <label className="block text-sm font-medium text-[#E5FFFC] mb-2">
                    Status
                  </label>
                  <select
                    value={filters.status}
                    onChange={(e) => setFilters(prev => ({ ...prev, status: e.target.value as ApplicationStatus }))}
                    className="w-full px-3 py-2 rounded bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC]"
                  >
                    <option value="">All Status</option>
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="accepted">Accepted</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#E5FFFC] mb-2">
                    Visa Status
                  </label>
                  <select
                    value={filters.visa_status}
                    onChange={(e) => setFilters(prev => ({ ...prev, visa_status: e.target.value as VisaStatus }))}
                    className="w-full px-3 py-2 rounded bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC]"
                  >
                    <option value="">All Visa Status</option>
                    <option value="H1B">H1B</option>
                    <option value="H4-EAD">H4-EAD</option>
                    <option value="GreenCard">Green Card</option>
                    <option value="US Citizen">US Citizen</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#E5FFFC] mb-2">
                    Employment Type
                  </label>
                  <select
                    value={filters.employment_type}
                    onChange={(e) => setFilters(prev => ({ ...prev, employment_type: e.target.value as EmploymentType }))}
                    className="w-full px-3 py-2 rounded bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC]"
                  >
                    <option value="">All Types</option>
                    <option value="W2">W2</option>
                    <option value="C2C">C2C</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#E5FFFC] mb-2">
                    Position
                  </label>
                  <select
                    value={filters.position}
                    onChange={(e) => setFilters(prev => ({ ...prev, position: e.target.value }))}
                    className="w-full px-3 py-2 rounded bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC]"
                  >
                    <option value="">All Positions</option>
                    {positions.map(position => (
                      <option key={position.id} value={position.id}>{position.title}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="mt-4 flex justify-end">
                <button
                  onClick={resetFilters}
                  className="px-4 py-2 text-[#E5FFFC] hover:text-[#00E5D1] transition-colors"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {showAddForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#0A1515] p-6 rounded-lg w-full max-w-2xl mx-4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-[#E5FFFC]">Add New Applicant</h2>
                <button
                  onClick={() => setShowAddForm(false)}
                  className="text-[#E5FFFC] hover:text-[#00E5D1] transition-colors"
                >
                  <X className="h-6 w-6" />
                </button>
              </div>
              <AddApplicantForm onSubmit={handleAddApplicant} onCancel={() => setShowAddForm(false)} />
            </div>
          </div>
        )}

        <div className="bg-[#0A1515] rounded-lg border border-[#008F85]/20 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-[#008F85]/20">
              <thead>
                <tr className="bg-[#0A1515]">
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#E5FFFC] uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#E5FFFC] uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#E5FFFC] uppercase tracking-wider">Phone</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#E5FFFC] uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#E5FFFC] uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-[#E5FFFC] uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#008F85]/20">
                {filteredApplications.map((application) => (
                  <tr key={application.id}>
                    <td className="px-6 py-4">
                      {isEditing === application.id ? (
                        <input
                          type="text"
                          value={editForm.full_name}
                          onChange={(e) => setEditForm(prev => ({ ...prev, full_name: e.target.value }))}
                          className="w-full px-2 py-1 rounded bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC]"
                        />
                      ) : (
                        <span className="text-[#E5FFFC]">{application.full_name}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing === application.id ? (
                        <input
                          type="email"
                          value={editForm.email}
                          onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))}
                          className="w-full px-2 py-1 rounded bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC]"
                        />
                      ) : (
                        <span className="text-[#E5FFFC]">{application.email}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {isEditing === application.id ? (
                        <input
                          type="tel"
                          value={editForm.phone}
                          onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))}
                          className="w-full px-2 py-1 rounded bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC]"
                        />
                      ) : (
                        <span className="text-[#E5FFFC]">{application.phone || '-'}</span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[#E5FFFC]">{application.jobs?.title || 'N/A'}</span>
                    </td>
                    <td className="px-6 py-4">
                      {isEditing === application.id ? (
                        <select
                          value={editForm.status}
                          onChange={(e) => setEditForm(prev => ({ ...prev, status: e.target.value as ApplicationStatus }))}
                          className="w-full px-2 py-1 rounded bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC]"
                        >
                          <option value="pending">Pending</option>
                          <option value="reviewed">Reviewed</option>
                          <option value="accepted">Accepted</option>
                          <option value="rejected">Rejected</option>
                        </select>
                      ) : (
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          application.status === 'accepted' ? 'bg-green-100 text-green-800' :
                          application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                          application.status === 'reviewed' ? 'bg-blue-100 text-blue-800' :
                          'bg-yellow-100 text-yellow-800'
                        }`}>
                          {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        {isEditing === application.id ? (
                          <>
                            <button
                              onClick={() => handleUpdate(application.id)}
                              className="text-[#00E5D1] hover:text-[#E5FFFC] transition-colors"
                            >
                              Save
                            </button>
                            <button
                              onClick={() => setIsEditing(null)}
                              className="text-red-500 hover:text-red-400 transition-colors"
                            >
                              Cancel
                            </button>
                          </>
                        ) : (
                          <>
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
                              onClick={() => handleEdit(application)}
                              className="text-[#00E5D1] hover:text-[#E5FFFC] transition-colors"
                            >
                              <Edit className="h-5 w-5" />
                            </button>
                            {showDeleteConfirm === application.id ? (
                              <div className="flex items-center space-x-2">
                                <button
                                  onClick={() => handleDelete(application.id)}
                                  className="text-red-500 hover:text-red-400 transition-colors"
                                >
                                  Confirm
                                </button>
                                <button
                                  onClick={() => setShowDeleteConfirm(null)}
                                  className="text-[#E5FFFC] hover:text-[#E5FFFC]/80 transition-colors"
                                >
                                  Cancel
                                </button>
                              </div>
                            ) : (
                              <button
                                onClick={() => setShowDeleteConfirm(application.id)}
                                className="text-red-500 hover:text-red-400 transition-colors"
                              >
                                <Trash2 className="h-5 w-5" />
                              </button>
                            )}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}