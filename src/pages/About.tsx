import { Award, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A2E2E] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&q=80"
            alt="Modern office space"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E2E] to-[#1A5F5F]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-[#4DDBCA] mb-6">About Us</h1>
            <p className="text-xl text-[#E5FFFC] opacity-90 max-w-3xl mx-auto">
              We are a team of experienced consultants dedicated to helping businesses grow and succeed in today's competitive landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0A2E2E] mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group relative bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 text-center animate-slide-up hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-[#4DDBCA]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#4DDBCA]/10 rounded-xl flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Target className="h-8 w-8 text-[#4DDBCA] transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#4DDBCA] transition-colors duration-300">Excellence</h3>
                <p className="text-[#E5FFFC] opacity-70 transform transition-all duration-500 group-hover:opacity-100">
                  We strive for excellence in everything we do, ensuring the highest quality of service for our clients.
                </p>
              </div>
            </div>

            <div className="group relative bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 text-center animate-slide-up hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1 overflow-hidden" style={{ animationDelay: '0.2s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#4DDBCA]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#4DDBCA]/10 rounded-xl flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Users className="h-8 w-8 text-[#4DDBCA] transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#4DDBCA] transition-colors duration-300">Collaboration</h3>
                <p className="text-[#E5FFFC] opacity-70 transform transition-all duration-500 group-hover:opacity-100">
                  We believe in working closely with our clients to achieve the best possible outcomes.
                </p>
              </div>
            </div>

            <div className="group relative bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 text-center animate-slide-up hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1 overflow-hidden" style={{ animationDelay: '0.4s' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-[#4DDBCA]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="w-16 h-16 bg-[#4DDBCA]/10 rounded-xl flex items-center justify-center mx-auto mb-6 transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                  <Award className="h-8 w-8 text-[#4DDBCA] transition-all duration-500 group-hover:scale-110" />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-[#4DDBCA] transition-colors duration-300">Integrity</h3>
                <p className="text-[#E5FFFC] opacity-70 transform transition-all duration-500 group-hover:opacity-100">
                  We maintain the highest standards of integrity and professionalism in all our interactions.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-[#0A2E2E] mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Sravan Villa",
                role: "CEO & Founder",
                image: "/sravan-villa.jpg?" + Date.now(), // Add cache busting
                experience: "20+ years of experience in business consulting and strategy"
              },
              {
                name: "Sirisha Balantrapu",
                role: "Chief Operations Officer",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80",
                experience: "15+ years of operational excellence and team management"
              },
              {
                name: "Sahab Shahi ( Hardik )",
                role: "Lead Recruitment Specialist",
                image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80",
                experience: "12+ years of technology innovation and digital transformation"
              }
            ].map((member, index) => (
              <div 
                key={member.name}
                className="group relative bg-[#0A2E2E] p-6 rounded-2xl border border-[#4DDBCA]/20 animate-slide-up hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4DDBCA]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="relative mb-4 transform transition-transform duration-500 group-hover:scale-105">
                    <div className="absolute inset-0 bg-[#4DDBCA]/20 rounded-full transition-opacity duration-500 group-hover:opacity-100 opacity-0"></div>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-32 h-32 rounded-full mx-auto object-cover ring-2 ring-[#4DDBCA]/20 transition-all duration-500 group-hover:ring-[#4DDBCA]/40"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        console.log('Image failed to load:', member.image);
                        target.src = "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=256&h=256&q=80";
                      }}
                      onLoad={() => {
                        console.log('Image loaded successfully:', member.image);
                      }}
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-center mb-1 text-[#4DDBCA] transition-colors duration-300">{member.name}</h3>
                  <p className="text-[#4DDBCA] text-center mb-2 opacity-90">{member.role}</p>
                  <p className="text-[#E5FFFC] opacity-70 text-center transform transition-all duration-500 group-hover:opacity-100">
                    {member.experience}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}