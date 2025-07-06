import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (localStorage.getItem('customerLoggedIn') === 'true') {
      setIsCustomerLoggedIn(true);
    } else {
      setIsCustomerLoggedIn(false);
    }
  }, [location]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'How It Works', path: '/how-it-works' },
    { name: 'Contact', path: '/contact' }
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-white/95 backdrop-blur-md shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <img src="/logo.jpg" alt="Logo" className="w-10 h-10 object-contain rounded-lg shadow" />
            <span className={`font-bold text-xl transition-colors ${
              isScrolled ? 'text-gray-800' : 'text-white'
            }`}>
              Booking.com
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`font-medium transition-colors hover:text-blue-500 ${
                  location.pathname === link.path
                    ? 'text-blue-500'
                    : isScrolled
                    ? 'text-gray-700'
                    : 'text-white'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/agentlogin"
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                isScrolled
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-white/20 text-white hover:bg-white/30 backdrop-blur-sm'
              }`}
            >
              Agent Login
            </Link>
            <Link
              to="/agentlogin"
              className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105"
            >
              Join as Agent
            </Link>
            {isCustomerLoggedIn && (
              <button
                onClick={() => {
                  localStorage.removeItem('customerLoggedIn');
                  setIsCustomerLoggedIn(false);
                  navigate('/');
                }}
                className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300 ml-2"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg transition-colors"
          >
            <svg
              className={`w-6 h-6 transition-colors ${
                isScrolled ? 'text-gray-800' : 'text-white'
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              {isMobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white/95 backdrop-blur-md rounded-lg mt-2 p-4 shadow-xl animate-slide-down">
            <div className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={`font-medium transition-colors hover:text-blue-500 ${
                    location.pathname === link.path
                      ? 'text-blue-500'
                      : 'text-gray-700'
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 border-t border-gray-200 space-y-2">
                <Link
                  to="/agentlogin"
                  className="block w-full px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-colors text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Agent Login
                </Link>
                <Link
                  to="/agentlogin"
                  className="block w-full px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-all duration-300 text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Join as Agent
                </Link>
                {isCustomerLoggedIn && (
                  <button
                    onClick={() => {
                      localStorage.removeItem('customerLoggedIn');
                      setIsCustomerLoggedIn(false);
                      navigate('/');
                      setIsMobileMenuOpen(false);
                    }}
                    className="block w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-all duration-300 text-center"
                  >
                    Logout
                  </button>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 