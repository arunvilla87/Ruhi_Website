import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Upload } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Job } from '@/lib/types';

export default function JobApplication() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState<Job | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setIsSubmitting] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume_url: '',
  });

  useEffect(() => {
    if (id) {
      fetchJob();
    }
  }, [id]);

  const fetchJob = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      setJob(data);
    } catch (error) {
      console.error('Error fetching job:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // Check file type
      const validTypes = ['application/pdf', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!validTypes.includes(file.type)) {
        alert('Please upload a PDF or Microsoft Word (.docx) file');
        return;
      }

      // Maximum file size: 5MB
      if (file.size > 5 * 1024 * 1024) {
        alert('File size must be less than 5MB');
        return;
      }

      // Create a unique filename
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;

      setUploadProgress(0);
      const { data, error } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type,
          onUploadProgress: (progress) => {
            const percent = (progress.loaded / progress.total) * 100;
            setUploadProgress(percent);
          },
        });

      if (error) throw error;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      setFormData(prev => ({
        ...prev,
        resume_url: publicUrl,
      }));
    } catch (error: any) {
      console.error('Error uploading file:', error);
      alert(error.message || 'Failed to upload resume. Please try again.');
    } finally {
      setUploadProgress(0);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const { error } = await supabase
        .from('applications')
        .insert([
          {
            job_id: id,
            ...formData,
          },
        ]);

      if (error) throw error;
      navigate(`/careers/${id}/success`);
    } catch (error) {
      console.error('Error submitting application:', error);
      alert('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center bg-[#050A0A] text-[#E5FFFC]">
        Loading...
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen pt-20 bg-[#050A0A]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold gradient-text">Job not found</h2>
            <p className="mt-2 text-[#E5FFFC] opacity-70">The job posting you're looking for doesn't exist.</p>
            <Link
              to="/careers"
              className="mt-6 inline-flex items-center text-[#00E5D1] hover:text-[#E5FFFC] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-1" />
              Back to Careers
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#050A0A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to={`/careers/${id}`}
          className="inline-flex items-center text-[#00E5D1] hover:text-[#E5FFFC] transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Job Details
        </Link>

        <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 animate-fade-in">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold gradient-text mb-2">Apply for {job.title}</h1>
            <p className="text-[#E5FFFC] opacity-70 mb-8">{job.department} · {job.location} · {job.type}</p>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="full_name" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  id="full_name"
                  name="full_name"
                  required
                  value={formData.full_name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                />
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
                <label className="block text-sm font-medium text-[#E5FFFC] mb-2">
                  Resume (PDF or Word document, max 5MB)
                </label>
                <div className="mt-1 flex items-center gap-4">
                  <label className="flex-1">
                    <div className="relative">
                      <input
                        type="file"
                        accept=".pdf,.docx"
                        onChange={handleFileUpload}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        required={!formData.resume_url}
                      />
                      <div className={`flex items-center justify-center px-6 py-3 border-2 border-dashed rounded-lg transition-colors ${
                        formData.resume_url 
                          ? 'border-[#00E5D1] bg-[#00E5D1]/10' 
                          : 'border-[#008F85]/20 hover:border-[#00E5D1]'
                      }`}>
                        <Upload className={`h-6 w-6 mr-2 ${formData.resume_url ? 'text-[#00E5D1]' : 'text-[#E5FFFC]/50'}`} />
                        <span className={formData.resume_url ? 'text-[#00E5D1]' : 'text-[#E5FFFC]/70'}>
                          {formData.resume_url ? 'Resume uploaded - Click to change' : 'Upload Resume'}
                        </span>
                      </div>
                    </div>
                  </label>
                  {uploadProgress > 0 && uploadProgress < 100 && (
                    <div className="w-20 text-sm text-[#E5FFFC]">
                      {Math.round(uploadProgress)}%
                    </div>
                  )}
                </div>
                <p className="mt-1 text-sm text-[#E5FFFC] opacity-50">
                  Accepted formats: PDF (.pdf) or Microsoft Word (.docx)
                </p>
              </div>

              <div>
                <label htmlFor="cover_letter" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                  Cover Letter (Optional)
                </label>
                <textarea
                  id="cover_letter"
                  name="cover_letter"
                  rows={6}
                  value={formData.cover_letter}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow resize-none"
                  placeholder="Tell us why you're interested in this position and what makes you a great fit..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting || !formData.resume_url}
                className="w-full flex items-center justify-center px-8 py-4 border-2 border-[#00E5D1] text-lg font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Application'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}