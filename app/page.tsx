import { ArrowRight, Globe, Shield, Briefcase } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="h-screen relative flex items-center justify-center bg-gradient-to-r from-gray-900 to-cyan-900 overflow-hidden">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80"
            alt="Hero background"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-8">
            Excellence<br />Internalized
          </h1>
          <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-3xl mx-auto">
            Strategic consulting solutions that drive growth, efficiency, and competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center px-8 py-4 border-2 border-cyan-400 text-lg font-medium rounded-full text-white hover:bg-cyan-400 hover:text-gray-900 transition-colors"
            >
              CONTACT US
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              href="/services"
              className="inline-flex items-center px-8 py-4 bg-cyan-400 text-lg font-medium rounded-full text-gray-900 hover:bg-cyan-300 transition-colors"
            >
              Our Services
            </Link>
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Expertise</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive solutions tailored to meet your business challenges and drive sustainable growth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
                <Globe className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Global Strategy</h3>
              <p className="text-gray-600 mb-6">
                Develop comprehensive strategies to expand your business globally and capture new markets.
              </p>
              <Link href="/services" className="text-cyan-500 font-medium hover:text-cyan-600 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
                <Shield className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Risk Management</h3>
              <p className="text-gray-600 mb-6">
                Identify and mitigate risks while ensuring compliance and operational resilience.
              </p>
              <Link href="/services" className="text-cyan-500 font-medium hover:text-cyan-600 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-cyan-100 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="h-8 w-8 text-cyan-500" />
              </div>
              <h3 className="text-2xl font-bold mb-4">Business Transformation</h3>
              <p className="text-gray-600 mb-6">
                Transform your organization with cutting-edge solutions and innovative strategies.
              </p>
              <Link href="/services" className="text-cyan-500 font-medium hover:text-cyan-600 flex items-center">
                Learn More <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold mb-8">Ready to Transform Your Business?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto">
            Let's work together to achieve your business goals and create lasting success.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center px-8 py-4 border-2 border-white text-lg font-medium rounded-full text-white hover:bg-white hover:text-cyan-600 transition-colors"
          >
            Schedule a Consultation
            <ArrowRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}