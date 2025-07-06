import React from 'react';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const travelerSteps = [
    {
      number: '01',
      title: 'Browse Destinations',
      description: 'Explore our curated collection of travel packages from expert agents worldwide.',
      icon: '🔍'
    },
    {
      number: '02',
      title: 'Choose Your Package',
      description: 'Select the perfect itinerary that matches your interests, budget, and travel style.',
      icon: '✈️'
    },
    {
      number: '03',
      title: 'Connect with Agent',
      description: 'Get in touch directly with the travel agent through our secure messaging system.',
      icon: '💬'
    },
    {
      number: '04',
      title: 'Book & Travel',
      description: 'Confirm your booking and embark on your unforgettable journey with confidence.',
      icon: '🎉'
    }
  ];

  const agentSteps = [
    {
      number: '01',
      title: 'Join Our Network',
      description: 'Sign up as a travel agent and complete your professional profile.',
      icon: '📝'
    },
    {
      number: '02',
      title: 'Create Packages',
      description: 'Design and publish your unique travel itineraries with detailed descriptions.',
      icon: '✏️'
    },
    {
      number: '03',
      title: 'Connect with Travelers',
      description: 'Receive inquiries and build relationships with potential clients.',
      icon: '🤝'
    },
    {
      number: '04',
      title: 'Grow Your Business',
      description: 'Earn commissions and expand your client base through our platform.',
      icon: '📈'
    }
  ];

  const benefits = [
    {
      title: 'Expert Local Knowledge',
      description: 'Connect with agents who have deep understanding of their destinations',
      icon: '🌍'
    },
    {
      title: 'Personalized Experiences',
      description: 'Get customized itineraries tailored to your specific preferences',
      icon: '✨'
    },
    {
      title: 'Secure Communication',
      description: 'Safe and reliable messaging system for all your travel inquiries',
      icon: '🔒'
    },
    {
      title: 'Transparent Pricing',
      description: 'Clear, upfront pricing with no hidden fees or surprises',
      icon: '💰'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock assistance for both travelers and agents',
      icon: '🛟'
    },
    {
      title: 'Verified Agents',
      description: 'All agents are thoroughly vetted and rated by previous travelers',
      icon: '✅'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            How It
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Discover how our platform connects travelers with expert agents to create amazing journeys
          </p>
        </div>
      </div>

      {/* For Travelers Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              For Travelers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Your journey to amazing destinations starts here
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {travelerSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < travelerSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* For Agents Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              For Travel Agents
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Grow your business and reach travelers worldwide
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {agentSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-6">
                    {step.number}
                  </div>
                  <div className="text-4xl mb-4">{step.icon}</div>
                  <h3 className="text-xl font-bold text-gray-800 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < agentSteps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <svg className="w-8 h-8 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose Booking.com?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Experience the advantages of our unique platform
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-4">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comparison Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Traditional vs. Booking.com
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              See how we're revolutionizing the travel industry
            </p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="bg-red-50 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-red-800 mb-6">Traditional Booking</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-700">Impersonal booking experience</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-700">Limited local knowledge</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-700">Generic itineraries</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-700">Hidden fees and charges</span>
                </li>
                <li className="flex items-start">
                  <span className="text-red-500 mr-3 mt-1">✗</span>
                  <span className="text-gray-700">Limited support options</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-green-50 rounded-2xl p-8">
                              <h3 className="text-2xl font-bold text-green-800 mb-6">Booking.com</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Personal connection with expert agents</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Deep local expertise and insights</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Customized travel experiences</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">Transparent pricing structure</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-3 mt-1">✓</span>
                  <span className="text-gray-700">24/7 dedicated support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of travelers and agents who are already part of our community
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-orange-500 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Start Exploring
            </Link>
            <Link
              to="/agentlogin"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-orange-500 transition-all duration-300 transform hover:scale-105"
            >
              Join as Agent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks; 