import { useState } from 'react';

interface CompanyLogo {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
}

export default function CompanyLogos() {
  const [logos] = useState<CompanyLogo[]>([
    {
      id: 'oracle',
      url: "https://upload.wikimedia.org/wikipedia/commons/5/50/Oracle_logo.svg",
      alt: "Oracle",
      width: 200,
      height: 64
    },
    {
      id: 'sap',
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/59/SAP_2011_logo.svg/2560px-SAP_2011_logo.svg.png",
      alt: "SAP",
      width: 200,
      height: 64
    },
    {
      id: 'salesforce',
      url: "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f9/Salesforce.com_logo.svg/2560px-Salesforce.com_logo.svg.png",
      alt: "Salesforce",
      width: 200,
      height: 64
    },
    {
      id: 'finomini',
      url: "/finomini.JPG",
      alt: "Finomini",
      width: 300,
      height: 96
    }
  ]);

  return (
    <section className="py-20 bg-[#d5f5e3] relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#4DDBCA]/5 to-transparent"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <h2 className="text-3xl font-bold text-center text-[#0A2E2E] mb-16">
          Trusted by Leading Companies
        </h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-12 items-center justify-items-center">
          {logos.map((logo) => (
            <div 
              key={logo.id}
              className="group relative transform hover:scale-105 transition-all duration-500 w-full max-w-[300px]"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#4DDBCA]/10 via-transparent to-[#4DDBCA]/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-lg"></div>
              <div className="relative bg-white/80 backdrop-blur-sm rounded-lg p-6 shadow-lg transform transition-transform duration-500 group-hover:-translate-y-1 border border-[#4DDBCA]/20">
                <img
                  src={logo.url}
                  alt={logo.alt}
                  width={logo.width}
                  height={logo.height}
                  className={`w-full ${logo.id === 'finomini' ? 'h-24' : 'h-16'} object-contain transition-all duration-500 group-hover:brightness-110`}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.onerror = null;
                    target.style.opacity = '0.5';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}