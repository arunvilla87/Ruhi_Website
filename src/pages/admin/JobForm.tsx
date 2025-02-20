import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/lib/supabase';
import { X, ArrowLeft } from 'lucide-react';
import type { Job } from '@/lib/types';

export default function JobForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [job, setJob] = useState<Partial<Job>>({
    title: '',
    department: '',
    location: '',
    type: '',
    description: '',
    requirements: [],
    responsibilities: [],
    status: 'open'
  });

  useEffect(() => {
    checkAuth();
    if (id) {
      fetchJob();
    }
  }, [id]);

  const checkAuth = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      navigate('/admin/login');
    }
  };

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      if (data) setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Get current user's ID
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) throw new Error('Not authenticated');

      if (id) {
        const { error } = await supabase
          .from('jobs')
          .update(job)
          .eq('id', id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('jobs')
          .insert([{
            ...job,
            created_by: session.user.id
          }]);
        if (error) throw error;
      }
      navigate('/admin/jobs');
    } catch (error) {
      console.error('Error saving job:', error);
      alert('Failed to save job. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleArrayInput = (field: 'requirements' | 'responsibilities', value: string) => {
    if (value.trim()) {
      setJob(prev => ({
        ...prev,
        [field]: [...(prev[field] || []), value.trim()]
      }));
    }
  };

  const removeArrayItem = (field: 'requirements' | 'responsibilities', index: number) => {
    setJob(prev => ({
      ...prev,
      [field]: prev[field]?.filter((_, i) => i !== index)
    }));
  };

  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#050A0A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center mb-8">
          <button
            onClick={() => navigate('/admin/jobs')}
            className="inline-flex items-center text-[#00E5D1] hover:text-[#E5FFFC] transition-colors"
          >
            <ArrowLeft className="h-5 w-5 mr-1" />
            Back to Manage Jobs
          </button>
          <h1 className="text-3xl font-bold gradient-text">
            {id ? 'Edit Job Listing' : 'Create New Job Listing'}
          </h1>
        </div>

        <form onSubmit={handleSubmit} className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 space-y-6">
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-[#E5FFFC] mb-2">
              Job Title
            </label>
            <input
              type="text"
              id="title"
              value={job.title}
              onChange={(e) => setJob(prev => ({ ...prev, title: e.target.value }))}
              className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="department" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                Department
              </label>
              <input
                type="text"
                id="department"
                value={job.department}
                onChange={(e) => setJob(prev => ({ ...prev, department: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                required
              />
            </div>

            <div>
              <label htmlFor="location" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                Location
              </label>
              <input
                type="text"
                id="location"
                value={job.location}
                onChange={(e) => setJob(prev => ({ ...prev, location: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                required
              />
            </div>

            <div>
              <label htmlFor="type" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                Employment Type
              </label>
              <select
                id="type"
                value={job.type}
                onChange={(e) => setJob(prev => ({ ...prev, type: e.target.value }))}
                className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                required
              >
                <option value="">Select type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
                <option value="Contract">Contract</option>
                <option value="Temporary">Temporary</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-[#E5FFFC] mb-2">
              Job Description
            </label>
            <textarea
              id="description"
              value={job.description}
              onChange={(e) => setJob(prev => ({ ...prev, description: e.target.value }))}
              rows={4}
              className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow resize-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-[#E5FFFC] mb-2">
              Requirements
            </label>
            <div className="space-y-2">
              {job.requirements?.map((req, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 bg-[#008F85]/10 px-4 py-2 rounded-lg text-[#E5FFFC]">{req}</span>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('requirements', index)}
                    className="text-[#E5FFFC]/40 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add a requirement and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleArrayInput('requirements', (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
                className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-[#E5FFFC] mb-2">
              Responsibilities
            </label>
            <div className="space-y-2">
              {job.responsibilities?.map((resp, index) => (
                <div key={index} className="flex items-center gap-2">
                  <span className="flex-1 bg-[#008F85]/10 px-4 py-2 rounded-lg text-[#E5FFFC]">{resp}</span>
                  <button
                    type="button"
                    onClick={() => removeArrayItem('responsibilities', index)}
                    className="text-[#E5FFFC]/40 hover:text-red-500 transition-colors"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))}
              <input
                type="text"
                placeholder="Add a responsibility and press Enter"
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleArrayInput('responsibilities', (e.target as HTMLInputElement).value);
                    (e.target as HTMLInputElement).value = '';
                  }
                }}
                className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
              />
            </div>
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={() => navigate('/admin/jobs')}
              className="px-6 py-3 border border-[#008F85]/20 rounded-lg text-[#E5FFFC] hover:bg-[#008F85]/10 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-3 border-2 border-[#00E5D1] rounded-lg text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-colors disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Job'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}