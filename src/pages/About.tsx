import { Award, Target, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="min-h-screen bg-[#050A0A]">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 glow-effect"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-6">About RUHI ENTERPRISES</h1>
            <p className="text-xl text-[#E5FFFC] opacity-90 max-w-3xl mx-auto">
              We are a team of experienced consultants dedicated to helping businesses grow and succeed in today's competitive landscape.
            </p>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#0A1515]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 text-center animate-slide-up">
              <div className="w-16 h-16 bg-[#00E5D1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="h-8 w-8 text-[#00E5D1]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#E5FFFC]">Excellence</h3>
              <p className="text-[#E5FFFC] opacity-70">
                We strive for excellence in everything we do, ensuring the highest quality of service for our clients.
              </p>
            </div>
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 text-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="w-16 h-16 bg-[#00E5D1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="h-8 w-8 text-[#00E5D1]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#E5FFFC]">Collaboration</h3>
              <p className="text-[#E5FFFC] opacity-70">
                We believe in working closely with our clients to achieve the best possible outcomes.
              </p>
            </div>
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 text-center animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="w-16 h-16 bg-[#00E5D1]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="h-8 w-8 text-[#00E5D1]" />
              </div>
              <h3 className="text-xl font-semibold mb-2 text-[#E5FFFC]">Integrity</h3>
              <p className="text-[#E5FFFC] opacity-70">
                We maintain the highest standards of integrity and professionalism in all our interactions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050A0A]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center gradient-text mb-12">Our Leadership Team</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20 animate-slide-up">
              <img
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80"
                alt="CEO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-2 ring-[#00E5D1]/20"
              />
              <h3 className="text-xl font-semibold text-center mb-1 text-[#E5FFFC]">John Smith</h3>
              <p className="text-[#00E5D1] text-center mb-2">CEO & Founder</p>
              <p className="text-[#E5FFFC] opacity-70 text-center">
                20+ years of experience in business consulting and strategy.
              </p>
            </div>
            <div className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <img
                src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80"
                alt="COO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-2 ring-[#00E5D1]/20"
              />
              <h3 className="text-xl font-semibold text-center mb-1 text-[#E5FFFC]">Sarah Johnson</h3>
              <p className="text-[#00E5D1] text-center mb-2">Chief Operations Officer</p>
              <p className="text-[#E5FFFC] opacity-70 text-center">
                15+ years of operational excellence and team management.
              </p>
            </div>
            <div className="card-glow bg-[#0A1515] p-6 rounded-lg border border-[#008F85]/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <img
                src="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=256&h=256&q=80"
                alt="CTO"
                className="w-32 h-32 rounded-full mx-auto mb-4 object-cover ring-2 ring-[#00E5D1]/20"
              />
              <h3 className="text-xl font-semibold text-center mb-1 text-[#E5FFFC]">Michael Chen</h3>
              <p className="text-[#00E5D1] text-center mb-2">Chief Technology Officer</p>
              <p className="text-[#E5FFFC] opacity-70 text-center">
                12+ years of technology innovation and digital transformation.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}