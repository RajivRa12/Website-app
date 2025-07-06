import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      alert('Thank you for your message! We\'ll get back to you soon.');
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 2000);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            Get in
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Touch
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    First Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Enter your email"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                  placeholder="What's this about?"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us more about your inquiry..."
                  required
                ></textarea>
              </div>
              
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-4 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                    Sending Message...
                  </div>
                ) : (
                  'Send Message'
                )}
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-6">Contact Information</h2>
              <p className="text-lg text-gray-600 mb-8">
                We're here to help and answer any questions you might have. We look forward to hearing from you.
              </p>
            </div>

            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-blue-600 text-xl">📍</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Our Office</h3>
                  <p className="text-gray-600">
                    123 Travel Street<br />
                    New York, NY 10001<br />
                    United States
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-green-600 text-xl">📧</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Email Us</h3>
                  <p className="text-gray-600">
                                    <a href="mailto:hello@booking.com" className="hover:text-blue-600 transition-colors">
                  hello@booking.com
                    </a><br />
                                          <a href="mailto:support@booking.com" className="hover:text-blue-600 transition-colors">
                        support@booking.com
                    </a>
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-purple-600 text-xl">📞</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Call Us</h3>
                  <p className="text-gray-600">
                    <a href="tel:+1234567890" className="hover:text-blue-600 transition-colors">
                      +1 (234) 567-8900
                    </a><br />
                    Monday - Friday: 9:00 AM - 6:00 PM EST
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4 mt-1">
                  <span className="text-orange-600 text-xl">💬</span>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800 mb-1">Live Chat</h3>
                  <p className="text-gray-600">
                    Available 24/7 for instant support<br />
                    Click the chat icon in the bottom right
                  </p>
                </div>
              </div>
            </div>

            {/* Social Media */}
            <div className="pt-8 border-t border-gray-200">
              <h3 className="font-semibold text-gray-800 mb-4">Follow Us</h3>
              <div className="flex space-x-4">
                <a href="#" className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white hover:bg-blue-600 transition-colors">
                  📘
                </a>
                <a href="#" className="w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-colors">
                  📷
                </a>
                <a href="#" className="w-12 h-12 bg-blue-400 rounded-full flex items-center justify-center text-white hover:bg-blue-500 transition-colors">
                  🐦
                </a>
                <a href="#" className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center text-white hover:bg-red-600 transition-colors">
                  📺
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find quick answers to common questions about our platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-3">How do I book a trip?</h3>
              <p className="text-gray-600">
                Browse our available packages, select your preferred itinerary, and contact the travel agent directly through our platform.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-3">How do I become a travel agent?</h3>
              <p className="text-gray-600">
                Click "Join as Agent" in the navigation, fill out the registration form, and our team will review your application.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-3">Is my payment secure?</h3>
              <p className="text-gray-600">
                Yes, we use industry-standard encryption and secure payment gateways to protect your financial information.
              </p>
            </div>
            
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <h3 className="font-semibold text-gray-800 mb-3">What if I need to cancel?</h3>
              <p className="text-gray-600">
                Cancellation policies vary by package. Contact your travel agent directly to discuss cancellation options.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 