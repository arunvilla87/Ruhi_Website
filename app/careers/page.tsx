import { ArrowRight, Building2, Users2, GraduationCap } from 'lucide-react';
import Link from 'next/link';

export default function Careers() {
  const positions = [
    {
      title: "Senior Management Consultant",
      department: "Consulting",
      location: "New York, NY",
      type: "Full-time",
      description: "Join our team as a Senior Management Consultant to lead strategic initiatives and drive business transformation for our clients."
    },
    {
      title: "Business Analyst",
      department: "Analytics",
      location: "Remote",
      type: "Full-time",
      description: "We're seeking a Business Analyst to help our clients make data-driven decisions and optimize their operations."
    },
    {
      title: "Technology Consultant",
      department: "Digital Transformation",
      location: "Chicago, IL",
      type: "Full-time",
      description: "Help organizations leverage cutting-edge technology to drive innovation and achieve their business objectives."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900 to-cyan-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Join Our Team</h1>
            <p className="text-xl text-gray-200 max-w-3xl mx-auto">
              Be part of a dynamic team that's shaping the future of business consulting.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join RUHI ENTERPRISES INC?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Building2 className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Growth Opportunities</h3>
              <p className="text-gray-600">
                Accelerate your career with continuous learning and development opportunities.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users2 className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Collaborative Culture</h3>
              <p className="text-gray-600">
                Work with talented professionals in an inclusive and supportive environment.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg text-center">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <GraduationCap className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Learning & Development</h3>
              <p className="text-gray-600">
                Access to training programs and resources to enhance your skills.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Open Positions */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Open Positions</h2>
          <div className="grid gap-6">
            {positions.map((position, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{position.title}</h3>
                    <div className="space-y-1">
                      <p className="text-gray-600">{position.department} · {position.location} · {position.type}</p>
                      <p className="text-gray-600">{position.description}</p>
                    </div>
                  </div>
                  <div className="mt-4 md:mt-0">
                    <Link
                      href={`/contact?position=${encodeURIComponent(position.title)}`}
                      className="inline-flex items-center px-6 py-3 border border-cyan-500 text-base font-medium rounded-full text-cyan-500 hover:bg-cyan-500 hover:text-white transition-colors"
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