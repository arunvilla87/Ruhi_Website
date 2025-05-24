import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, ArrowRight } from 'lucide-react';
import type { Job } from '@/lib/types';

const mockJob: Job = {
  id: '1',
  title: 'Senior Full Stack Developer',
  department: 'Engineering',
  location: 'Remote - US',
  type: 'Full-time',
  status: 'open',
  description: 'We are seeking an experienced Full Stack Developer to join our engineering team. In this role, you will be responsible for developing and maintaining web applications, collaborating with cross-functional teams, and contributing to technical architecture decisions.',
  responsibilities: [
    'Design and implement new features for our web applications',
    'Write clean, maintainable, and efficient code',
    'Collaborate with product managers and designers',
    'Mentor junior developers and conduct code reviews',
    'Contribute to technical architecture decisions'
  ],
  requirements: [
    '5+ years of experience in full stack development',
    'Strong proficiency in React, Node.js, and TypeScript',
    'Experience with cloud platforms (AWS, GCP, or Azure)',
    'Excellent problem-solving and communication skills',
    'Bachelor\'s degree in Computer Science or related field'
  ]
};

export default function JobDetails() {
  const { id } = useParams();
  const [job] = useState<Job | null>(mockJob);
  const [loading] = useState(false);

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
          to="/careers"
          className="inline-flex items-center text-[#00E5D1] hover:text-[#E5FFFC] transition-colors mb-8"
        >
          <ArrowLeft className="h-5 w-5 mr-1" />
          Back to Careers
        </Link>

        <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 animate-fade-in">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold gradient-text mb-4">{job.title}</h1>
            <div className="flex flex-wrap gap-4 text-sm text-[#E5FFFC] opacity-70 mb-8">
              <span>{job.department}</span>
              <span>·</span>
              <span>{job.location}</span>
              <span>·</span>
              <span>{job.type}</span>
              {job.status === 'closed' && (
                <>
                  <span>·</span>
                  <span className="text-red-500 font-medium">Position Closed</span>
                </>
              )}
            </div>

            <div className="space-y-8">
              <div className="animate-slide-up">
                <h2 className="text-xl font-semibold gradient-text mb-4">About the Role</h2>
                <p className="text-[#E5FFFC] opacity-70 mb-8">{job.description}</p>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <h2 className="text-xl font-semibold gradient-text mb-4">Key Responsibilities</h2>
                <ul className="space-y-3 mb-8">
                  {job.responsibilities.map((responsibility, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#00E5D1] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-[#E5FFFC] opacity-70">{responsibility}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="animate-slide-up" style={{ animationDelay: '0.4s' }}>
                <h2 className="text-xl font-semibold gradient-text mb-4">Requirements</h2>
                <ul className="space-y-3 mb-8">
                  {job.requirements.map((requirement, index) => (
                    <li key={index} className="flex items-start">
                      <CheckCircle2 className="h-5 w-5 text-[#00E5D1] mr-2 flex-shrink-0 mt-0.5" />
                      <span className="text-[#E5FFFC] opacity-70">{requirement}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {job.status !== 'closed' ? (
              <div className="mt-8 border-t border-[#008F85]/20 pt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <Link
                  to={`/careers/${job.id}/apply`}
                  className="inline-flex items-center justify-center w-full px-6 py-3 border-2 border-[#00E5D1] text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300"
                >
                  Apply for this Position
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            ) : (
              <div className="mt-8 border-t border-[#008F85]/20 pt-8 animate-slide-up" style={{ animationDelay: '0.6s' }}>
                <div className="text-center">
                  <p className="text-red-500 font-medium mb-4">This position is no longer accepting applications</p>
                  <Link
                    to="/careers"
                    className="inline-flex items-center px-6 py-3 border-2 border-[#00E5D1] text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300"
                  >
                    View Other Opportunities
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}