import { ArrowRight, Globe, Shield, Briefcase } from 'lucide-react';
import { Link } from 'react-router-dom';
import CompanyLogos from '@/components/CompanyLogos';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center hero-gradient overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80"
            alt="Modern IT workspace with computers and technology"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050A0A]/50 via-[#050A0A]/70 to-[#050A0A] pointer-events-none"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold gradient-text mb-8 animate-fade-in">
            Excellence<br />Internalized
          </h1>
          <p className="text-xl md:text-2xl text-[#E5FFFC] mb-12 max-w-3xl mx-auto opacity-90 uppercase tracking-wide">
            STRATEGIC CONSULTING SOLUTIONS THAT DRIVE GROWTH, EFFICIENCY, AND COMPETITIVE ADVANTAGE.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-[#00E5D1] text-lg font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300"
            >
              CONTACT US
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center px-8 py-4 bg-[#00E5D1] text-lg font-medium rounded-full text-[#050A0A] hover:bg-[#E5FFFC] transition-all duration-300"
            >
              OUR SERVICES
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2E2E] mb-4">Our Services</h2>
            <p className="text-xl text-[#0A2E2E]/80 max-w-3xl mx-auto">
              Comprehensive solutions tailored to meet your business challenges and drive sustainable growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-[#4DDBCA]/10 rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:rotate-6">
                <Globe className="h-8 w-8 text-[#4DDBCA]" />
              </div>
              <h3 className="text-2xl font-bold text-[#4DDBCA] mb-4">Global Strategy</h3>
              <p className="text-[#E5FFFC]/70 mb-6">
                Develop comprehensive strategies to expand your business globally and capture new markets.
              </p>
              <Link to="/services" className="text-[#4DDBCA] font-medium hover:text-[#E5FFFC] flex items-center transition-colors">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="group bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-[#4DDBCA]/10 rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:rotate-6">
                <Shield className="h-8 w-8 text-[#4DDBCA]" />
              </div>
              <h3 className="text-2xl font-bold text-[#4DDBCA] mb-4">Risk Management</h3>
              <p className="text-[#E5FFFC]/70 mb-6">
                Identify and mitigate risks while ensuring compliance and operational resilience.
              </p>
              <Link to="/services" className="text-[#4DDBCA] font-medium hover:text-[#E5FFFC] flex items-center transition-colors">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="group bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1">
              <div className="w-16 h-16 bg-[#4DDBCA]/10 rounded-xl flex items-center justify-center mb-6 transform transition-transform duration-500 group-hover:rotate-6">
                <Briefcase className="h-8 w-8 text-[#4DDBCA]" />
              </div>
              <h3 className="text-2xl font-bold text-[#4DDBCA] mb-4">Business Transformation</h3>
              <p className="text-[#E5FFFC]/70 mb-6">
                Transform your organization with cutting-edge solutions and innovative strategies.
              </p>
              <Link to="/services" className="text-[#4DDBCA] font-medium hover:text-[#E5FFFC] flex items-center transition-colors">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Company Logos Section */}
      <CompanyLogos />
    </div>
  );
}