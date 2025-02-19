import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Upload } from 'lucide-react';
import type { Job } from '@/lib/types';

interface AddApplicantFormProps {
  jobs: Job[];
  onCancel: () => void;
  onSuccess: () => void;
}

export default function AddApplicantForm({ jobs, onCancel, onSuccess }: AddApplicantFormProps) {
  const [loading, setLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [formData, setFormData] = useState({
    job_id: '',
    full_name: '',
    email: '',
    phone: '',
    cover_letter: '',
    resume_url: '',
    visa_status: '',
    employment_type: '',
    willing_to_relocate: false,
    status: 'pending'
  });

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
    setLoading(true);

    try {
      // Remove job_id if empty
      const submitData = {
        ...formData,
        job_id: formData.job_id || null
      };

      const { error } = await supabase
        .from('applications')
        .insert([submitData]);

      if (error) throw error;
      onSuccess();
    } catch (error) {
      console.error('Error adding applicant:', error);
      alert('Failed to add applicant. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="px-6 py-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Applicant</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="full_name" className="block text-sm font-medium text-gray-700">
                Full Name
              </label>
              <input
                type="text"
                id="full_name"
                name="full_name"
                required
                value={formData.full_name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-cyan-500"
              />
            </div>

            <div>
              <label htmlFor="job_id" className="block text-sm font-medium text-gray-700">
                Position (Optional)
              </label>
              <select
                id="job_id"
                name="job_id"
                value={formData.job_id}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-cyan-500"
              >
                <option value="">Select position</option>
                {jobs.map((job) => (
                  <option key={job.id} value={job.id}>
                    {job.title} - {job.department}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label htmlFor="visa_status" className="block text-sm font-medium text-gray-700">
                Visa Status
              </label>
              <select
                id="visa_status"
                name="visa_status"
                required
                value={formData.visa_status}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-cyan-500"
              >
                <option value="">Select visa status</option>
                <option value="H1B">H1B</option>
                <option value="H4-EAD">H4-EAD</option>
                <option value="GreenCard">Green Card</option>
                <option value="US Citizen">US Citizen</option>
              </select>
            </div>

            <div>
              <label htmlFor="employment_type" className="block text-sm font-medium text-gray-700">
                Employment Type
              </label>
              <select
                id="employment_type"
                name="employment_type"
                required
                value={formData.employment_type}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-cyan-500"
              >
                <option value="">Select employment type</option>
                <option value="W2">W2</option>
                <option value="C2C">C2C</option>
              </select>
            </div>

            <div className="flex items-center">
              <div className="flex h-6 items-center">
                <input
                  id="willing_to_relocate"
                  name="willing_to_relocate"
                  type="checkbox"
                  checked={formData.willing_to_relocate}
                  onChange={handleChange}
                  className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                />
              </div>
              <div className="ml-3">
                <label htmlFor="willing_to_relocate" className="text-sm font-medium text-gray-700">
                  Willing to Relocate
                </label>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
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
                  />
                  <div className={`flex items-center justify-center px-6 py-3 border-2 border-dashed rounded-lg transition-colors ${
                    formData.resume_url 
                      ? 'border-green-300 bg-green-50' 
                      : 'border-gray-300 hover:border-cyan-500'
                  }`}>
                    <Upload className={`h-6 w-6 mr-2 ${formData.resume_url ? 'text-green-500' : 'text-gray-400'}`} />
                    <span className={formData.resume_url ? 'text-green-600' : 'text-gray-600'}>
                      {formData.resume_url ? 'Resume uploaded - Click to change' : 'Upload Resume'}
                    </span>
                  </div>
                </div>
              </label>
              {uploadProgress > 0 && uploadProgress < 100 && (
                <div className="w-20 text-sm text-gray-600">
                  {Math.round(uploadProgress)}%
                </div>
              )}
            </div>
            <p className="mt-1 text-sm text-gray-500">
              Accepted formats: PDF (.pdf) or Microsoft Word (.docx)
            </p>
          </div>

          <div>
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              required
              value={formData.status}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-cyan-500"
            >
              <option value="pending">Pending</option>
              <option value="reviewed">Reviewed</option>
              <option value="accepted">Accepted</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <div>
            <label htmlFor="cover_letter" className="block text-sm font-medium text-gray-700">
              Cover Letter (Optional)
            </label>
            <textarea
              id="cover_letter"
              name="cover_letter"
              rows={4}
              value={formData.cover_letter}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 focus:border-cyan-500 focus:ring-cyan-500"
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500 disabled:opacity-50"
            >
              {loading ? 'Adding...' : 'Add Applicant'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}