import { CheckCircle2 } from 'lucide-react';

export default function Services() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A2E2E] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&q=80"
            alt="Business consulting services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E2E] to-[#1A5F5F]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl font-bold text-[#4DDBCA] mb-6">Our Services</h1>
            <p className="text-xl text-[#E5FFFC] opacity-90 max-w-3xl mx-auto">
              Comprehensive consulting solutions tailored to meet your business needs and drive success.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              {
                title: "Strategic Planning",
                description: "Develop comprehensive business strategies to achieve your organizational goals.",
                items: [
                  'Market Analysis',
                  'Competitive Positioning',
                  'Growth Strategy Development',
                  'Risk Assessment',
                  'Performance Metrics'
                ]
              },
              {
                title: "Operational Excellence",
                description: "Optimize your business operations for maximum efficiency and productivity.",
                items: [
                  'Process Optimization',
                  'Quality Management',
                  'Cost Reduction',
                  'Supply Chain Management',
                  'Performance Monitoring'
                ]
              },
              {
                title: "Digital Transformation",
                description: "Leverage technology to modernize your business and stay competitive.",
                items: [
                  'Technology Assessment',
                  'Digital Strategy Development',
                  'System Implementation',
                  'Data Analytics',
                  'Cloud Migration'
                ]
              },
              {
                title: "Change Management",
                description: "Guide your organization through transitions with minimal disruption.",
                items: [
                  'Change Readiness Assessment',
                  'Stakeholder Management',
                  'Communication Planning',
                  'Training Programs',
                  'Culture Transformation'
                ]
              }
            ].map((service, index) => (
              <div 
                key={service.title}
                className="group relative bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 animate-slide-up hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4DDBCA]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <h3 className="text-2xl font-bold mb-4 text-[#4DDBCA] transition-colors duration-300">{service.title}</h3>
                  <p className="text-[#E5FFFC] opacity-70 mb-6 transform transition-all duration-500 group-hover:opacity-100">{service.description}</p>
                  <ul className="space-y-3">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start group-hover:transform group-hover:translate-x-2 transition-transform duration-300">
                        <div className="transform transition-transform duration-500 group-hover:rotate-6">
                          <CheckCircle2 className="h-6 w-6 text-[#4DDBCA] mr-2 flex-shrink-0" />
                        </div>
                        <span className="text-[#E5FFFC] opacity-90 transition-opacity duration-500 group-hover:opacity-100">{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}