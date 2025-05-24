import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import type { Job } from '@/lib/types';

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  resume_url: string;
  cover_letter: string;
  visa_status: string;
  employment_type: string;
  willing_to_relocate: boolean;
}

const mockJob: Job = {
  id: '1',
  title: 'Senior Full Stack Developer',
  department: 'Engineering',
  location: 'Remote - US',
  type: 'Full-time',
  status: 'open',
  description: 'We are seeking an experienced Full Stack Developer to join our engineering team.',
  responsibilities: [],
  requirements: []
};

export default function JobApplication() {
  const { id: jobId } = useParams();
  const navigate = useNavigate();
  const [job] = useState<Job | null>(mockJob);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    resume_url: '',
    cover_letter: '',
    visa_status: '',
    employment_type: '',
    willing_to_relocate: false
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!jobId) return;

    setSubmitting(true);
    try {
      // Simulate form submission delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      navigate(`/careers/${jobId}/success`);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
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

  if (!job) {
    return (
      <div className="min-h-screen pt-20 bg-[#050A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold gradient-text">Job not found</h2>
            <p className="mt-2 text-[#E5FFFC] opacity-70">The job posting you're looking for doesn't exist.</p>
            <button
              onClick={() => navigate('/careers')}
              className="mt-6 inline-flex items-center text-[#00E5D1] hover:text-[#E5FFFC] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Careers
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#050A0A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <button
          onClick={() => navigate(`/careers/${jobId}`)}
          className="inline-flex items-center text-[#00E5D1] hover:text-[#E5FFFC] transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Job Details
        </button>

        <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20">
          <h1 className="text-3xl font-bold gradient-text mb-4">Apply for {job.title}</h1>
          <p className="text-[#E5FFFC] opacity-70 mb-8">
            Complete the form below to apply for this position.
          </p>

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
                  className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
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
                  className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
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
                className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
              />
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
                rows={6}
                className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow resize-none"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="visa_status" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                  Visa Status *
                </label>
                <select
                  id="visa_status"
                  name="visa_status"
                  value={formData.visa_status}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
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
                  Employment Type *
                </label>
                <select
                  id="employment_type"
                  name="employment_type"
                  value={formData.employment_type}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                >
                  <option value="">Select type</option>
                  <option value="W2">W2</option>
                  <option value="C2C">C2C</option>
                </select>
              </div>
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
                I am willing to relocate if required
              </label>
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full flex items-center justify-center px-8 py-4 border-2 border-[#00E5D1] text-lg font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}