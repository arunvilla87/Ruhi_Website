import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Users, GraduationCap } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import type { Job } from '@/lib/types';

export default function Careers() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const { data, error } = await supabase
        .from('jobs')
        .select('*')
        .eq('status', 'open')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setJobs(data || []);
    } catch (error) {
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050A0A]">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 glow-effect"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-6">Join Our Team</h1>
            <p className="text-xl text-[#E5FFFC] opacity-90 max-w-3xl mx-auto">
              Be part of a dynamic team that's shaping the future of business consulting.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A1515]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">Why Join RUHI ENTERPRISES INC?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 text-center animate-slide-up">
              <div className="w-16 h-16 bg-[#00E5D1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building className="h-8 w-8 text-[#00E5D1]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#E5FFFC]">Growth Opportunities</h3>
              <p className="text-[#E5FFFC] opacity-70">
                Accelerate your career with continuous learning and development opportunities.
              </p>
            </div>
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-[#00E5D1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="h-8 w-8 text-[#00E5D1]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#E5FFFC]">Collaborative Culture</h3>
              <p className="text-[#E5FFFC] opacity-70">
                Work with talented professionals in an inclusive and supportive environment.
              </p>
            </div>
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-[#00E5D1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-[#00E5D1]" />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-[#E5FFFC]">Learning & Development</h3>
              <p className="text-[#E5FFFC] opacity-70">
                Access to training programs and resources to enhance your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">Open Positions</h2>
          {loading ? (
            <div className="text-center py-12 text-[#E5FFFC]">Loading...</div>
          ) : jobs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-[#E5FFFC] opacity-70">No open positions at the moment. Please check back later.</p>
            </div>
          ) : (
            <div className="grid gap-6">
              {jobs.map((job) => (
                <div key={job.id} className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20 hover:border-[#00E5D1]/30 transition-all">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-[#E5FFFC] mb-2">{job.title}</h3>
                      <div className="space-y-1">
                        <p className="text-[#E5FFFC] opacity-70">{job.department} · {job.location} · {job.type}</p>
                        <p className="text-[#E5FFFC] opacity-70 line-clamp-2">{job.description}</p>
                      </div>
                    </div>
                    <div className="mt-4 md:mt-0">
                      <Link
                        to={`/careers/${job.id}`}
                        className="inline-flex items-center px-6 py-3 border-2 border-[#00E5D1] text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300"
                      >
                        View Details
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}