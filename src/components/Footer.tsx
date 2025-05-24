import { Facebook, Twitter, Linkedin, Instagram } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#0A2E2E] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Follow Us */}
          <div>
            <h3 className="text-xl font-bold mb-6">Follow Us:</h3>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: '#' },
                { icon: Twitter, href: '#' },
                { icon: Linkedin, href: '#' },
                { icon: Instagram, href: '#' }
              ].map((social, index) => (
                <a
                  key={index}
                  href={social.href}
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-[#4DDBCA] transition-colors"
                >
                  <social.icon className="h-5 w-5 text-[#0A2E2E]" />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact</h3>
            <div className="space-y-4">
              <p>Address:</p>
              <p>11101 Emory Oak Rdg,</p>
              <p>Argyle, TX-76226</p>
              <p>Phone: (940) 758-4552</p>
              <p>Email: contact@ruhiinc.com</p>
            </div>
          </div>

          {/* Industries */}
          <div>
            <h3 className="text-xl font-bold mb-6">Industries</h3>
            <ul className="space-y-3">
              {[
                'Information Technology',
                'Logistics & Services',
                'Hospitality',
                'Manufacturing',
                'Education',
                'Customer Self-Service'
              ].map((industry) => (
                <li key={industry}>
                  <Link to="#" className="hover:text-[#4DDBCA] transition-colors">
                    {industry}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6">Services</h3>
            <ul className="space-y-3">
              {[
                'Contract Hiring',
                'Direct Hiring',
                'Offshore Hiring',
                'Nearshore Hiring',
                'Product Development',
                'Executive Search'
              ].map((service) => (
                <li key={service}>
                  <Link to="#" className="hover:text-[#4DDBCA] transition-colors">
                    {service}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-sm text-[#E5FFFC]/70">
          <p>© 2025 Ruhi Enterprises Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}