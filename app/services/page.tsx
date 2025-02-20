import { CheckCircle2 } from 'lucide-react';

export default function Services() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-indigo-50 to-blue-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-6">Our Services</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
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
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Strategic Planning</h3>
              <p className="text-gray-600 mb-6">
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
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Operational Excellence */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Operational Excellence</h3>
              <p className="text-gray-600 mb-6">
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
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Digital Transformation */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Digital Transformation</h3>
              <p className="text-gray-600 mb-6">
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
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Change Management */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <h3 className="text-2xl font-bold mb-4">Change Management</h3>
              <p className="text-gray-600 mb-6">
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
                    <CheckCircle2 className="h-6 w-6 text-green-500 mr-2 flex-shrink-0" />
                    <span>{item}</span>
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