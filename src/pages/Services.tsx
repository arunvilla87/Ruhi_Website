import { CheckCircle2, ArrowRight, Users, Target, Zap, Shield, Globe, TrendingUp, Clock, Award, Briefcase, Settings, Star, Rocket, Building } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Services() {
  const services = [
    {
      id: 'talent-acquisition',
      title: 'Talent Acquisition',
      subtitle: 'Strategic Workforce Planning',
      description: 'Transform your hiring process with our comprehensive talent acquisition solutions. We identify, attract, and secure top-tier professionals who align with your organizational goals.',
      icon: Users,
      features: [
        'Executive search and leadership recruitment',
        'Technical and specialized role placement',
        'Bulk hiring for scaling teams',
        'Diversity and inclusion initiatives',
        'Employer branding strategies'
      ],
      benefits: [
        'Reduced time-to-hire by 70%',
        'Higher quality candidate pipeline',
        'Improved retention rates',
        'Cost-effective recruitment'
      ]
    },
    {
      id: 'workforce-solutions',
      title: 'Workforce Solutions',
      subtitle: 'Flexible Staffing Models',
      description: 'Adapt to changing business demands with our flexible workforce solutions. From temporary staffing to project-based teams, we provide the right talent at the right time.',
      icon: Target,
      features: [
        'Temporary and contract staffing',
        'Project-based team assembly',
        'Seasonal workforce management',
        'Skills-based talent matching',
        'Rapid deployment capabilities'
      ],
      benefits: [
        'Operational flexibility',
        'Reduced overhead costs',
        'Quick scaling capabilities',
        'Risk mitigation'
      ]
    },
    {
      id: 'consulting-services',
      title: 'Consulting Services',
      subtitle: 'Strategic Business Advisory',
      description: 'Leverage our expertise to optimize your business operations and drive growth. Our consultants provide strategic insights and actionable solutions.',
      icon: Rocket,
      features: [
        'Business process optimization',
        'Digital transformation consulting',
        'Change management support',
        'Performance improvement strategies',
        'Market expansion planning'
      ],
      benefits: [
        'Increased operational efficiency',
        'Strategic competitive advantage',
        'Accelerated growth',
        'Risk reduction'
      ]
    },
    {
      id: 'technology-services',
      title: 'Technology Services',
      subtitle: 'Digital Innovation Partners',
      description: 'Accelerate your digital journey with our comprehensive technology services. From software development to cloud migration, we deliver cutting-edge solutions.',
      icon: Zap,
      features: [
        'Custom software development',
        'Cloud infrastructure setup',
        'Data analytics and insights',
        'Cybersecurity implementation',
        'IT infrastructure management'
      ],
      benefits: [
        'Enhanced productivity',
        'Improved security posture',
        'Scalable technology stack',
        'Data-driven decisions'
      ]
    },
    {
      id: 'managed-services',
      title: 'Managed Services',
      subtitle: 'Outsourced Operations',
      description: 'Focus on your core business while we handle your non-core operations. Our managed services ensure seamless business continuity and operational excellence.',
      icon: Settings,
      features: [
        '24/7 operational support',
        'Service level agreements',
        'Performance monitoring',
        'Continuous improvement',
        'Cost optimization'
      ],
      benefits: [
        'Reduced operational burden',
        'Predictable costs',
        'Improved service quality',
        'Focus on core business'
      ]
    },
    {
      id: 'training-development',
      title: 'Training & Development',
      subtitle: 'Workforce Enhancement',
      description: 'Invest in your team\'s growth with our comprehensive training and development programs. Build capabilities that drive long-term success.',
      icon: Award,
      features: [
        'Leadership development programs',
        'Technical skills training',
        'Soft skills enhancement',
        'Certification programs',
        'Custom curriculum design'
      ],
      benefits: [
        'Enhanced employee capabilities',
        'Improved job satisfaction',
        'Better retention rates',
        'Increased productivity'
      ]
    }
  ];

  const industries = [
    {
      name: 'Financial Services',
      description: 'Banking, insurance, fintech, wealth management, and regulatory compliance solutions.',
      icon: TrendingUp
    },
    {
      name: 'Healthcare & Life Sciences',
      description: 'Medical devices, pharmaceuticals, healthcare IT, and clinical research services.',
      icon: Shield
    },
    {
      name: 'Technology & Software',
      description: 'Software development, cloud services, AI/ML, cybersecurity, and digital platforms.',
      icon: Zap
    },
    {
      name: 'Manufacturing & Industrial',
      description: 'Process optimization, supply chain, quality management, and industrial automation.',
      icon: Settings
    },
    {
      name: 'Retail & Consumer Goods',
      description: 'E-commerce, customer experience, brand management, and omnichannel strategies.',
      icon: Globe
    },
    {
      name: 'Energy & Utilities',
      description: 'Renewable energy, grid modernization, regulatory compliance, and sustainability.',
      icon: Building
    }
  ];

  const methodology = [
    {
      phase: '01',
      title: 'Discovery & Assessment',
      description: 'Deep dive into your business requirements, challenges, and strategic objectives to create a tailored solution approach.'
    },
    {
      phase: '02',
      title: 'Strategy Development',
      description: 'Design comprehensive strategies and roadmaps that align with your business goals and market dynamics.'
    },
    {
      phase: '03',
      title: 'Solution Implementation',
      description: 'Execute solutions with precision using proven methodologies, best practices, and continuous monitoring.'
    },
    {
      phase: '04',
      title: 'Performance Optimization',
      description: 'Monitor, measure, and optimize performance to ensure sustained success and continuous improvement.'
    },
    {
      phase: '05',
      title: 'Ongoing Partnership',
      description: 'Maintain long-term partnerships with ongoing support, strategic guidance, and adaptive solutions.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#0A2E2E] relative overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=80"
            alt="Professional business services"
            className="w-full h-full object-cover opacity-20"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0A2E2E] via-[#0A2E2E]/90 to-[#1A5F5F]"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center animate-fade-in">
            <h1 className="text-5xl font-bold text-[#4DDBCA] mb-6">Professional Services</h1>
            <p className="text-xl text-[#E5FFFC] opacity-90 max-w-4xl mx-auto mb-8">
              Comprehensive business solutions designed to accelerate growth, optimize operations, and drive sustainable success in today's competitive landscape.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/contact"
                className="inline-flex items-center px-8 py-4 border-2 border-[#4DDBCA] text-lg font-medium rounded-full text-[#E5FFFC] hover:bg-[#4DDBCA] hover:text-[#0A2E2E] transition-all duration-300"
              >
                Start Your Project
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <a
                href="#service-portfolio"
                className="inline-flex items-center px-8 py-4 bg-[#4DDBCA] text-lg font-medium rounded-full text-[#0A2E2E] hover:bg-[#E5FFFC] transition-all duration-300"
              >
                Explore Solutions
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Service Portfolio */}
      <section id="service-portfolio" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2E2E] mb-4">Service Portfolio</h2>
            <p className="text-xl text-[#0A2E2E]/80 max-w-3xl mx-auto">
              End-to-end business solutions spanning talent acquisition, technology services, and strategic consulting.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <div 
                key={service.id}
                className="group relative bg-[#0A2E2E] p-8 rounded-2xl border border-[#4DDBCA]/20 animate-slide-up hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1 overflow-hidden"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4DDBCA]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-16 h-16 bg-[#4DDBCA]/10 rounded-xl flex items-center justify-center transform transition-transform duration-500 group-hover:rotate-6 group-hover:scale-110">
                      <service.icon className="h-8 w-8 text-[#4DDBCA]" />
                    </div>
                    <div className="flex items-center space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-[#4DDBCA] fill-current" />
                      ))}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-[#4DDBCA] mb-2">{service.title}</h3>
                  <p className="text-[#4DDBCA] opacity-80 text-sm font-medium mb-4">{service.subtitle}</p>
                  <p className="text-[#E5FFFC] opacity-70 mb-6">{service.description}</p>
                  
                  <div className="mb-6">
                    <h4 className="text-lg font-semibold text-[#4DDBCA] mb-3">Core Capabilities:</h4>
                    <ul className="space-y-2">
                      {service.features.slice(0, 3).map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <CheckCircle2 className="h-5 w-5 text-[#4DDBCA] mr-2 flex-shrink-0 mt-0.5" />
                          <span className="text-[#E5FFFC] opacity-90 text-sm">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="text-[#4DDBCA] text-sm font-medium">
                      View All Capabilities
                    </div>
                    <Link
                      to={`/contact?service=${encodeURIComponent(service.title)}`}
                      className="inline-flex items-center text-[#4DDBCA] font-medium hover:text-[#E5FFFC] transition-colors"
                    >
                      Get Quote
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2E2E] mb-4">Our Methodology</h2>
            <p className="text-xl text-[#0A2E2E]/80 max-w-3xl mx-auto">
              A proven approach that ensures successful project delivery and sustainable business outcomes.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
            {methodology.map((phase, index) => (
              <div 
                key={phase.phase}
                className="relative text-center animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="relative mb-6">
                  <div className="w-20 h-20 bg-[#0A2E2E] rounded-full flex items-center justify-center mx-auto mb-4 relative z-10 shadow-lg">
                    <span className="text-2xl font-bold text-[#4DDBCA]">{phase.phase}</span>
                  </div>
                  {index < methodology.length - 1 && (
                    <div className="hidden md:block absolute top-10 left-1/2 w-full h-0.5 bg-gradient-to-r from-[#4DDBCA] to-[#4DDBCA]/30 transform translate-x-10"></div>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[#0A2E2E] mb-3">{phase.title}</h3>
                <p className="text-[#0A2E2E]/70 text-sm leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Industries Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#0A2E2E] mb-4">Industry Expertise</h2>
            <p className="text-xl text-[#0A2E2E]/80 max-w-3xl mx-auto">
              Deep domain knowledge across key industries, delivering specialized solutions that address unique sector challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {industries.map((industry, index) => (
              <div 
                key={industry.name}
                className="group relative bg-[#0A2E2E] p-6 rounded-2xl border border-[#4DDBCA]/20 animate-slide-up hover:border-[#4DDBCA]/40 transition-all duration-500 hover:transform hover:-translate-y-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-[#4DDBCA]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 bg-[#4DDBCA]/10 rounded-lg flex items-center justify-center mb-4 transform transition-transform duration-500 group-hover:scale-110">
                    <industry.icon className="h-6 w-6 text-[#4DDBCA]" />
                  </div>
                  <h3 className="text-xl font-bold text-[#4DDBCA] mb-3">{industry.name}</h3>
                  <p className="text-[#E5FFFC] opacity-70 leading-relaxed">{industry.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Performance Metrics */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#0A2E2E]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#4DDBCA] mb-4">Performance Excellence</h2>
            <p className="text-xl text-[#E5FFFC] opacity-90 max-w-3xl mx-auto">
              Measurable results that demonstrate our commitment to delivering exceptional value.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '1000+', label: 'Projects Delivered', icon: Briefcase },
              { number: '99.5%', label: 'Client Satisfaction', icon: Star },
              { number: '48hrs', label: 'Average Response Time', icon: Clock },
              { number: '150+', label: 'Enterprise Clients', icon: Building }
            ].map((metric, index) => (
              <div 
                key={metric.label}
                className="animate-slide-up"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <div className="w-16 h-16 bg-[#4DDBCA]/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <metric.icon className="h-8 w-8 text-[#4DDBCA]" />
                </div>
                <div className="text-4xl font-bold text-[#4DDBCA] mb-2">{metric.number}</div>
                <div className="text-[#E5FFFC] opacity-70">{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-[#0A2E2E] mb-6">Ready to Accelerate Your Success?</h2>
          <p className="text-xl text-[#0A2E2E]/80 mb-8">
            Partner with us to unlock your organization's full potential and achieve sustainable competitive advantage.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="inline-flex items-center px-8 py-4 bg-[#0A2E2E] text-lg font-medium rounded-full text-[#4DDBCA] hover:bg-[#1A5F5F] transition-all duration-300 shadow-lg"
            >
              Schedule Discovery Call
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link
              to="/about"
              className="inline-flex items-center px-8 py-4 border-2 border-[#0A2E2E] text-lg font-medium rounded-full text-[#0A2E2E] hover:bg-[#0A2E2E] hover:text-[#4DDBCA] transition-all duration-300"
            >
              Learn About Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}