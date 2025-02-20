import { CheckCircle2 } from 'lucide-react';

export default function Services() {
  return (
    <div className="min-h-screen bg-[#050A0A]">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 hero-gradient relative overflow-hidden">
        <div className="absolute inset-0 glow-effect"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold gradient-text mb-6">Our Services</h1>
            <p className="text-xl text-[#E5FFFC] opacity-90 max-w-3xl mx-auto">
              Comprehensive consulting solutions tailored to meet your business needs and drive success.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Strategic Planning */}
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 animate-slide-up">
              <h3 className="text-2xl font-bold mb-4 gradient-text">Strategic Planning</h3>
              <p className="text-[#E5FFFC] opacity-70 mb-6">
                Develop comprehensive business strategies to achieve your organizational goals.
              </p>
              <ul className="space-y-3">
                {[
                  'Market Analysis',
                  'Competitive Positioning',
                  'Growth Strategy Development',
                  'Risk Assessment',
                  'Performance Metrics',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-[#00E5D1] mr-2 flex-shrink-0" />
                    <span className="text-[#E5FFFC] opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Operational Excellence */}
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Operational Excellence</h3>
              <p className="text-[#E5FFFC] opacity-70 mb-6">
                Optimize your business operations for maximum efficiency and productivity.
              </p>
              <ul className="space-y-3">
                {[
                  'Process Optimization',
                  'Quality Management',
                  'Cost Reduction',
                  'Supply Chain Management',
                  'Performance Monitoring',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-[#00E5D1] mr-2 flex-shrink-0" />
                    <span className="text-[#E5FFFC] opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Digital Transformation */}
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Digital Transformation</h3>
              <p className="text-[#E5FFFC] opacity-70 mb-6">
                Leverage technology to modernize your business and stay competitive.
              </p>
              <ul className="space-y-3">
                {[
                  'Technology Assessment',
                  'Digital Strategy Development',
                  'System Implementation',
                  'Data Analytics',
                  'Cloud Migration',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-[#00E5D1] mr-2 flex-shrink-0" />
                    <span className="text-[#E5FFFC] opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Change Management */}
            <div className="card-glow bg-[#0A1515] p-8 rounded-lg border border-[#008F85]/20 animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <h3 className="text-2xl font-bold mb-4 gradient-text">Change Management</h3>
              <p className="text-[#E5FFFC] opacity-70 mb-6">
                Guide your organization through transitions with minimal disruption.
              </p>
              <ul className="space-y-3">
                {[
                  'Change Readiness Assessment',
                  'Stakeholder Management',
                  'Communication Planning',
                  'Training Programs',
                  'Culture Transformation',
                ].map((item) => (
                  <li key={item} className="flex items-start">
                    <CheckCircle2 className="h-6 w-6 text-[#00E5D1] mr-2 flex-shrink-0" />
                    <span className="text-[#E5FFFC] opacity-90">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}