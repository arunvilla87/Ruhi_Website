import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { ApplicationStatus, VisaStatus, EmploymentType } from '@/lib/types';

interface AddApplicantFormProps {
  onSubmit: (applicant: any) => void;
  onCancel: () => void;
}

export default function AddApplicantForm({ onSubmit, onCancel }: AddApplicantFormProps) {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    job_id: '',
    status: 'pending' as ApplicationStatus,
    visa_status: '' as VisaStatus,
    employment_type: '' as EmploymentType,
    willing_to_relocate: false,
    cover_letter: ''
  });
  const [jobs, setJobs] = useState<Array<{ id: string; title: string }>>([]);
  const [loading, setLoading] = useState(false);

  // Fetch jobs when component mounts
  useEffect(() => {
    fetchJobs();
  }, []); // Empty dependency array means this runs once on mount

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('id, title')
        .eq('status', 'open');

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Remove job_id if not selected
      const submitData = {
        ...formData,
        job_id: formData.job_id || null
      };

      onSubmit(submitData);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to add applicant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value,
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="full_name" className="block text-sm font-medium text-[#E5FFFC] mb-2">
            Full Name *
          </label>
          <input
            type="text"
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
          />
        </div>

        <div>
          <label htmlFor="email" className="block text-sm font-medium text-[#E5FFFC] mb-2">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label htmlFor="phone" className="block text-sm font-medium text-[#E5FFFC] mb-2">
          Phone Number
        </label>
        <input
          type="tel"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
        />
      </div>

      <div>
        <label htmlFor="job_id" className="block text-sm font-medium text-[#E5FFFC] mb-2">
          Position (Optional)
        </label>
        <select
          id="job_id"
          name="job_id"
          value={formData.job_id}
          onChange={handleChange}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
        >
          <option value="">Select position</option>
          {jobs.map(job => (
            <option key={job.id} value={job.id}>{job.title}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="visa_status" className="block text-sm font-medium text-[#E5FFFC] mb-2">
            Visa Status
          </label>
          <select
            id="visa_status"
            name="visa_status"
            value={formData.visa_status}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
          >
            <option value="">Select status</option>
            <option value="H1B">H1B</option>
            <option value="H4-EAD">H4-EAD</option>
            <option value="GreenCard">Green Card</option>
            <option value="US Citizen">US Citizen</option>
          </select>
        </div>

        <div>
          <label htmlFor="employment_type" className="block text-sm font-medium text-[#E5FFFC] mb-2">
            Employment Type
          </label>
          <select
            id="employment_type"
            name="employment_type"
            value={formData.employment_type}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent"
          >
            <option value="">Select type</option>
            <option value="W2">W2</option>
            <option value="C2C">C2C</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="cover_letter" className="block text-sm font-medium text-[#E5FFFC] mb-2">
          Cover Letter
        </label>
        <textarea
          id="cover_letter"
          name="cover_letter"
          value={formData.cover_letter}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent resize-none"
        />
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          id="willing_to_relocate"
          name="willing_to_relocate"
          checked={formData.willing_to_relocate}
          onChange={handleChange}
          className="h-4 w-4 text-[#00E5D1] focus:ring-[#00E5D1] border-[#008F85]/20 rounded"
        />
        <label htmlFor="willing_to_relocate" className="ml-2 block text-sm text-[#E5FFFC]">
          Willing to relocate
        </label>
      </div>

      <div className="flex justify-end space-x-4">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-3 border border-[#008F85]/20 rounded-lg text-[#E5FFFC] hover:bg-[#008F85]/10 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          disabled={loading}
          className="px-6 py-3 border-2 border-[#00E5D1] rounded-lg text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-colors disabled:opacity-50"
        >
          {loading ? 'Adding...' : 'Add Applicant'}
        </button>
      </div>
    </form>
  );
}