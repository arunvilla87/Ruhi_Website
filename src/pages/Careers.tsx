import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Users, GraduationCap, MapPin, Briefcase, Clock } from 'lucide-react';

// Static job data
const jobs = [
  {
    id: '1',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote',
    type: 'Full-time',
    description: 'We are looking for an experienced software engineer to join our team and help build scalable solutions.',
    postedDate: '2024-02-25',
    status: 'open'
  },
  {
    id: '2',
    title: 'Product Manager',
    department: 'Product',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'Join our product team to help shape the future of our platform and drive innovation.',
    postedDate: '2024-02-24',
    status: 'open'
  },
  {
    id: '3',
    title: 'UX Designer',
    department: 'Design',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Create beautiful and intuitive user experiences for our growing product suite.',
    postedDate: '2024-02-23',
    status: 'open'
  }
];

export default function Careers() {
  const [selectedDepartment, setSelectedDepartment] = useState('all');

  const filteredJobs = selectedDepartment === 'all' 
    ? jobs 
    : jobs.filter(job => job.department.toLowerCase() === selectedDepartment);

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
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h2 className="text-3xl font-bold gradient-text mb-4 md:mb-0">Open Positions</h2>
            <div className="flex gap-4">
              <button
                onClick={() => setSelectedDepartment('all')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedDepartment === 'all'
                    ? 'bg-[#00E5D1] text-[#050A0A]'
                    : 'border border-[#00E5D1] text-[#00E5D1] hover:bg-[#00E5D1] hover:text-[#050A0A]'
                }`}
              >
                All
              </button>
              <button
                onClick={() => setSelectedDepartment('engineering')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedDepartment === 'engineering'
                    ? 'bg-[#00E5D1] text-[#050A0A]'
                    : 'border border-[#00E5D1] text-[#00E5D1] hover:bg-[#00E5D1] hover:text-[#050A0A]'
                }`}
              >
                Engineering
              </button>
              <button
                onClick={() => setSelectedDepartment('design')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  selectedDepartment === 'design'
                    ? 'bg-[#00E5D1] text-[#050A0A]'
                    : 'border border-[#00E5D1] text-[#00E5D1] hover:bg-[#00E5D1] hover:text-[#050A0A]'
                }`}
              >
                Design
              </button>
            </div>
          </div>

          <div className="grid gap-6">
            {filteredJobs.map((job) => (
              <div key={job.id} className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20 hover:border-[#00E5D1]/30 transition-all">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-[#E5FFFC] mb-2">{job.title}</h3>
                    <div className="flex flex-wrap gap-4 mb-4">
                      <div className="flex items-center text-[#E5FFFC] opacity-70">
                        <Briefcase className="h-4 w-4 mr-2" />
                        {job.department}
                      </div>
                      <div className="flex items-center text-[#E5FFFC] opacity-70">
                        <MapPin className="h-4 w-4 mr-2" />
                        {job.location}
                      </div>
                      <div className="flex items-center text-[#E5FFFC] opacity-70">
                        <Clock className="h-4 w-4 mr-2" />
                        {job.type}
                      </div>
                    </div>
                    <p className="text-[#E5FFFC] opacity-70 mb-6 lg:mb-0">{job.description}</p>
                  </div>
                  <div className="flex gap-4">
                    <Link
                      to={`/careers/${job.id}`}
                      className="inline-flex items-center px-6 py-3 border border-[#008F85]/20 text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#008F85]/10 transition-colors"
                    >
                      View Details
                    </Link>
                    <Link
                      to={`/careers/${job.id}/apply`}
                      className="inline-flex items-center px-6 py-3 border-2 border-[#00E5D1] text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300"
                    >
                      Apply Now
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}