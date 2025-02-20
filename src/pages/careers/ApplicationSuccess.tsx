import { Link, useParams } from 'react-router-dom';
import { CheckCircle2, ArrowRight } from 'lucide-react';

export default function ApplicationSuccess() {
  const { id } = useParams();

  return (
    <div className="min-h-screen pt-20 pb-12 bg-[#050A0A]">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 animate-fade-in">
          <div className="px-6 py-12 text-center">
            <div className="w-16 h-16 bg-[#00E5D1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-8 w-8 text-[#00E5D1]" />
            </div>
            <h1 className="text-3xl font-bold gradient-text mb-4">Application Submitted!</h1>
            <p className="text-[#E5FFFC] opacity-70 mb-8 max-w-md mx-auto">
              Thank you for your interest. We have received your application and will review it shortly.
              We'll be in touch if your qualifications match our requirements.
            </p>
            <div className="space-x-4">
              <Link
                to={`/careers/${id}`}
                className="inline-flex items-center px-6 py-3 border-2 border-[#00E5D1] text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300"
              >
                Back to Job Details
              </Link>
              <Link
                to="/careers"
                className="inline-flex items-center px-6 py-3 border-2 border-[#008F85]/20 text-base font-medium rounded-full text-[#E5FFFC] hover:border-[#00E5D1] hover:text-[#00E5D1] transition-all duration-300"
              >
                View More Jobs
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}