import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Building, Users, GraduationCap, MapPin, Briefcase, Clock } from 'lucide-react';

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A2E2E] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&q=80"
            alt="Team collaboration"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E2E] to-[#1A5F5F]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-[#4DDBCA] mb-6">Join Our Team</h1>
            <p className="text-xl text-[#E5FFFC] opacity-90 max-w-3xl mx-auto">
              Be part of a dynamic team that's shaping the future of business consulting.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0A2E2E] mb-12">Why Join Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Building,
                title: "Growth Opportunities",
                description: "Accelerate your career with continuous learning and development opportunities."
              },
              {
                icon: Users,
                title: "Collaborative Culture",
                description: "Work with talented professionals in an inclusive and supportive environment."
              },
              {
                icon: GraduationCap,
                title: "Learning & Development",
                description: "Access to training programs and resources to enhance your skills."
              }
            ].map((benefit, index) => (
              <div 
                key={benefit.title}
                className="group relative bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 animate-slide-up hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4DDBCA]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 bg-[#4DDBCA]/10 rounded-xl flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                    <benefit.icon className="h-8 w-8 text-[#4DDBCA] transition-all duration-500 group-hover:scale-110" />
                  </div>
                  <h3 className="text-xl font-semibold mb-4 text-[#4DDBCA] transition-colors duration-300">{benefit.title}</h3>
                  <p className="text-[#E5FFFC] opacity-70 transform transition-all duration-500 group-hover:opacity-100">{benefit.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
            <h2 className="text-3xl font-bold text-[#0A2E2E] mb-4 md:mb-0">Open Positions</h2>
            <div className="flex gap-4">
              {['all', 'engineering', 'design', 'product'].map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDepartment(dept)}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    selectedDepartment === dept
                      ? 'bg-[#0A2E2E] text-[#4DDBCA]'
                      : 'border border-[#0A2E2E] text-[#0A2E2E] hover:bg-[#0A2E2E] hover:text-[#4DDBCA]'
                  }`}
                >
                  {dept.charAt(0).toUpperCase() + dept.slice(1)}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            {filteredJobs.map((job, index) => (
              <div 
                key={job.id}
                className="group relative bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1 animate-slide-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4DDBCA]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-[#4DDBCA] mb-4">{job.title}</h3>
                      <div className="flex flex-wrap gap-6 mb-4">
                        <div className="flex items-center text-[#E5FFFC] opacity-70">
                          <Briefcase className="h-5 w-5 mr-2" />
                          {job.department}
                        </div>
                        <div className="flex items-center text-[#E5FFFC] opacity-70">
                          <MapPin className="h-5 w-5 mr-2" />
                          {job.location}
                        </div>
                        <div className="flex items-center text-[#E5FFFC] opacity-70">
                          <Clock className="h-5 w-5 mr-2" />
                          {job.type}
                        </div>
                      </div>
                      <p className="text-[#E5FFFC] opacity-70 mb-6 lg:mb-0 max-w-2xl">{job.description}</p>
                    </div>
                    <div className="flex gap-4">
                      <Link
                        to={`/careers/${job.id}`}
                        className="inline-flex items-center px-6 py-3 border border-[#4DDBCA]/20 text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#4DDBCA]/10 transition-colors"
                      >
                        View Details
                      </Link>
                      <Link
                        to={`/careers/${job.id}/apply`}
                        className="inline-flex items-center px-6 py-3 border-2 border-[#4DDBCA] text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#4DDBCA] hover:text-[#0A2E2E] transition-all duration-300"
                      >
                        Apply Now
                        <ArrowRight className="ml-2 h-5 w-5" />
                      </Link>
                    </div>
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