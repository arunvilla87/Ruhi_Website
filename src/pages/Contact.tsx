import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import { useLocation } from 'react-router-dom';

export default function Contact() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const position = searchParams.get('position');

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: position ? `I'm interested in the ${position} position.` : '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_yj5lxum',
        'template_nyd1jip',
        {
          to_email: 'arunvilla.ux@gmail.com',
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          message: formData.message,
        },
        'Nus34mmWVBIJdO3dR'
      );
      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send email:', error);
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="min-h-screen bg-[#050A0A]">
      {/* Hero Section */}
      <section className="h-[40vh] relative flex items-center justify-center hero-gradient">
        <div className="absolute inset-0 glow-effect"></div>
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1534536281715-e28d76689b4d?auto=format&fit=crop&q=80"
            alt="Modern IT communication setup with phone and laptop"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#050A0A]/50 via-[#050A0A]/70 to-[#050A0A]"></div>
        </div>
        <div className="relative z-20 text-center px-4 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold gradient-text mb-4">Get in Touch</h1>
          <p className="text-xl text-[#E5FFFC] opacity-90 max-w-2xl mx-auto">
            Let's discuss how we can help transform your business
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#050A0A]">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Contact Information Cards */}
            <div className="lg:col-span-1 space-y-6">
              <div className="card-glow bg-[#0A1515] p-8 rounded-2xl border border-[#008F85]/20 animate-slide-up">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-[#00E5D1]/10 rounded-xl flex items-center justify-center">
                    <Mail className="h-6 w-6 text-[#00E5D1]" />
                  </div>
                  <div className="w-12 h-12 bg-[#00E5D1]/10 rounded-xl flex items-center justify-center">
                    <Phone className="h-6 w-6 text-[#00E5D1]" />
                  </div>
                </div>
                <h3 className="text-xl font-bold mt-6 mb-2 text-[#E5FFFC]">Contact Information</h3>
                <div className="space-y-2">
                  <p className="text-[#E5FFFC] opacity-70">
                    <a href="mailto:contact@ruhiinc.com" className="hover:text-[#00E5D1] transition-colors">
                      contact@ruhiinc.com
                    </a>
                  </p>
                  <p className="text-[#E5FFFC] opacity-70">
                    <a href="tel:9407584552" className="hover:text-[#00E5D1] transition-colors">
                      (940) 758-4552
                    </a>
                  </p>
                </div>
              </div>

              <div className="card-glow bg-[#0A1515] p-8 rounded-2xl border border-[#008F85]/20 animate-slide-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-12 h-12 bg-[#00E5D1]/10 rounded-xl flex items-center justify-center mb-6">
                  <MapPin className="h-6 w-6 text-[#00E5D1]" />
                </div>
                <h3 className="text-xl font-bold mb-2 text-[#E5FFFC]">Location</h3>
                <p className="text-[#E5FFFC] opacity-70">
                  11101 Emory Oak Rdg<br />
                  Argyle, TX 76226
                </p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="card-glow bg-[#0A1515] p-8 md:p-12 rounded-2xl border border-[#008F85]/20">
                {isSubmitted ? (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-[#00E5D1]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                      <CheckCircle2 className="h-8 w-8 text-[#00E5D1]" />
                    </div>
                    <h2 className="text-2xl font-bold text-[#E5FFFC] mb-4">Thank You!</h2>
                    <p className="text-[#E5FFFC] opacity-70 mb-8">
                      Your message has been sent successfully. We'll get back to you soon.
                    </p>
                    <button
                      onClick={() => {
                        setIsSubmitted(false);
                        setFormData({ name: '', email: '', phone: '', message: '' });
                      }}
                      className="inline-flex items-center px-6 py-3 border-2 border-[#00E5D1] text-base font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300"
                    >
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <h2 className="text-2xl font-bold gradient-text mb-8">Send us a Message</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label htmlFor="name" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                            Full Name
                          </label>
                          <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                            Email Address
                          </label>
                          <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                            required
                          />
                        </div>
                      </div>

                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                          Phone Number
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow"
                        />
                      </div>

                      <div>
                        <label htmlFor="message" className="block text-sm font-medium text-[#E5FFFC] mb-2">
                          Your Message
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          rows={6}
                          className="w-full px-4 py-3 rounded-lg bg-[#0A1515] border border-[#008F85]/20 text-[#E5FFFC] focus:ring-2 focus:ring-[#00E5D1] focus:border-transparent transition-shadow resize-none"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full flex items-center justify-center px-8 py-4 border-2 border-[#00E5D1] text-lg font-medium rounded-full text-[#E5FFFC] hover:bg-[#00E5D1] hover:text-[#050A0A] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="ml-2 h-5 w-5" />
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}