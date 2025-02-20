import { useState } from 'react';
import { supabase } from '@/lib/supabase';

interface FormData {
  resume_url: string;
  [key: string]: any;
}

export default function AddApplicantForm({ onUpload }: { onUpload: (url: string) => void }) {
  const [formData, setFormData] = useState<FormData>({
    resume_url: '',
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

      const { error: uploadError } = await supabase.storage
        .from('resumes')
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false,
          contentType: file.type
        });

      if (uploadError) throw uploadError;

      // Get the public URL
      const { data: { publicUrl } } = supabase.storage
        .from('resumes')
        .getPublicUrl(fileName);

      setFormData(prev => ({
        ...prev,
        resume_url: publicUrl,
      }));

      // Notify parent component about the upload
      onUpload(publicUrl);
    } catch (error: any) {
      console.error('Error uploading file:', error);
      alert(error.message || 'Failed to upload resume. Please try again.');
    }
  };

  return (
    <div className="w-full">
      <label 
        htmlFor="resume-upload" 
        className="block text-sm font-medium text-[#E5FFFC] mb-2"
      >
        Upload Resume (PDF or DOCX)
      </label>
      <input
        id="resume-upload"
        type="file"
        accept=".pdf,.docx"
        onChange={handleFileUpload}
        className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-medium file:bg-[#00E5D1]/10 file:text-[#00E5D1] hover:file:bg-[#00E5D1]/20"
      />
      {formData.resume_url && (
        <p className="mt-2 text-sm text-[#00E5D1]">
          Resume uploaded successfully!
        </p>
      )}
    </div>
  );
}