import React from 'react';
import { Link } from 'react-router-dom';

const About = () => {
  const stats = [
    { number: '10,000+', label: 'Happy Travelers' },
    { number: '500+', label: 'Expert Agents' },
    { number: '100+', label: 'Countries Covered' },
    { number: '50,000+', label: 'Trips Planned' }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'CEO & Founder',
      image: null,
      bio: 'Former travel agent with 15+ years of experience in the industry.'
    },
    {
      name: 'Michael Chen',
      role: 'CTO',
      image: null,
      bio: 'Tech enthusiast passionate about connecting people through travel.'
    },
    {
      name: 'Emma Davis',
      role: 'Head of Operations',
      image: null,
      bio: 'Operations expert ensuring seamless travel experiences.'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20 hero-section">
        <div className="max-w-7xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl font-bold mb-6">
            About
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Booking.com
            </span>
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl mx-auto">
            Connecting passionate travelers with expert agents worldwide to create unforgettable journeys
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="card-ui">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                At Booking.com, we believe that every journey should be extraordinary. Our mission is to bridge the gap between travelers seeking authentic experiences and expert travel agents who know their destinations inside and out.
              </p>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                We're not just another booking platform – we're a community of travel enthusiasts, local experts, and adventure seekers who share a passion for discovering the world's most amazing places.
              </p>
              <Link
                to="/contact"
                className="inline-block px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-semibold animated-gradient-btn main-cta hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
              >
                Get in Touch
              </Link>
            </div>
            <div className="relative card-ui">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f"
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl hero-overlay"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              We've helped thousands of travelers create memories that last a lifetime
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Values Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Our Core Values
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The principles that guide everything we do
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🤝</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Trust & Transparency</h3>
              <p className="text-gray-600">
                We believe in building lasting relationships through honest communication and transparent pricing.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">🌍</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Local Expertise</h3>
              <p className="text-gray-600">
                We connect you with agents who have deep local knowledge and authentic connections.
              </p>
            </div>
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Exceptional Experiences</h3>
              <p className="text-gray-600">
                Every journey should be extraordinary, and we're committed to making that happen.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              The passionate people behind Booking.com
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center">
                <div className="w-32 h-32 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-3xl font-bold mx-auto mb-6">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{member.name}</h3>
                <p className="text-blue-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Story Section */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative card-ui">
              <img 
                src="https://images.unsplash.com/photo-1488646953014-85cb44e25828"
                alt="Travel story"
                className="rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl hero-overlay"></div>
            </div>
            <div className="card-ui">
              <h2 className="text-4xl font-bold text-gray-800 mb-6">
                Our Story
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Booking.com was born from a simple observation: while there are countless travel booking platforms, none truly connect travelers with the local experts who know their destinations best.
              </p>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Our founder, Sarah Johnson, spent 15 years as a travel agent, witnessing firsthand how personal connections and local expertise could transform an ordinary trip into an extraordinary adventure.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Today, we're proud to have built a platform that empowers both travelers and agents, creating a community where authentic experiences and lasting memories are the norm, not the exception.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Start Your Journey?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of travelers who have discovered their perfect adventure with us
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/"
              className="px-8 py-4 bg-white text-orange-500 rounded-xl font-bold animated-gradient-btn main-cta hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Explore Destinations
            </Link>
            <Link
              to="/agentlogin"
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold animated-gradient-btn hover:bg-white hover:text-orange-500 transition-all duration-300 transform hover:scale-105"
            >
              Become an Agent
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About; 