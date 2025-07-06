import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config/api';

const Home = () => {
  const [agents, setAgents] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [searchLocation, setSearchLocation] = useState('');
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const [showAllPackages, setShowAllPackages] = useState(false);
  const [filters, setFilters] = useState({
    minPrice: '',
    maxPrice: '',
    duration: '',
    sortBy: 'price'
  });

  const agentCarouselRef = useRef(null);
  const [isCarouselHovered, setIsCarouselHovered] = useState(false);

  const scrollAgents = (direction) => {
    const container = agentCarouselRef.current;
    if (!container) return;
    const scrollAmount = 320; // px, roughly one card
    if (direction === 'left') {
      container.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // AI-powered auto-scroll effect with intelligent timing
  useEffect(() => {
    const container = agentCarouselRef.current;
    if (!container) return;
    if (isCarouselHovered) return;
    
    let scrollAmount = 320;
    let interval = 2500;
    
    // AI-powered adaptive timing based on content
    const adaptiveInterval = () => {
      const totalAgents = agents.length;
      if (totalAgents > 4) {
        interval = 2000; // Faster for more agents
        scrollAmount = 280;
      } else if (totalAgents > 2) {
        interval = 2500; // Normal speed
        scrollAmount = 320;
      } else {
        interval = 3000; // Slower for fewer agents
        scrollAmount = 360;
      }
    };
    
    adaptiveInterval();
    
    const autoScroll = setInterval(() => {
      if (!container) return;
      
      // AI-powered smooth scrolling with bounce effect
      if (container.scrollLeft + container.offsetWidth >= container.scrollWidth - 10) {
        // Smooth reset to beginning with easing
        container.scrollTo({ 
          left: 0, 
          behavior: 'smooth' 
        });
      } else {
        // Progressive scroll with momentum
        container.scrollBy({ 
          left: scrollAmount, 
          behavior: 'smooth' 
        });
      }
    }, interval);
    
    return () => clearInterval(autoScroll);
  }, [isCarouselHovered, agents.length]);

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [itineraries, filters, searchLocation]);

  // AI-powered real-time search with suggestions
  useEffect(() => {
    if (searchLocation.trim()) {
      handleRealTimeSearch();
      generateAISuggestions();
    } else {
      setFilteredItineraries(itineraries);
      setSearchSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchLocation, itineraries]);

  // AI-powered search suggestions
  const generateAISuggestions = () => {
    const popularDestinations = [
      'Manali, Himachal Pradesh',
      'Goa, India',
      'Kerala Backwaters',
      'Rishikesh, Uttarakhand',
      'Shimla, Himachal Pradesh',
      'Darjeeling, West Bengal',
      'Munnar, Kerala',
      'Ooty, Tamil Nadu',
      'Leh, Ladakh',
      'Varanasi, Uttar Pradesh'
    ];
    
    const suggestions = popularDestinations.filter(dest => 
      dest.toLowerCase().includes(searchLocation.toLowerCase())
    ).slice(0, 5);
    
    setSearchSuggestions(suggestions);
    setShowSuggestions(suggestions.length > 0);
  };

  // AI-powered recommendations
  const generateAIRecommendations = () => {
    const recommendations = itineraries
      .sort((a, b) => (b.agent?.avg_rating || 0) - (a.agent?.avg_rating || 0))
      .slice(0, 3)
      .map(item => ({
        ...item,
        aiReason: `Recommended by AI based on high ratings (${item.agent?.avg_rating}⭐) and popularity`
      }));
    
    setAiRecommendations(recommendations);
  };

  const handleRealTimeSearch = async () => {
    try {
      const response = await axios.get(`${API}/itineraries?location=${searchLocation}`);
      setFilteredItineraries(response.data);
      
      // Scroll to results if user has typed something
      if (searchLocation.trim()) {
        setTimeout(() => {
          const resultsSection = document.getElementById('search-results');
          if (resultsSection) {
            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 300);
      }
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const fetchData = async () => {
    // Always use mock data for development
    setAgents(mockAgents);
    setItineraries(mockItineraries);
    setLoading(false);
    generateAIRecommendations();
  };

  const applyFilters = () => {
    let filtered = [...itineraries];

    // Location filter
    if (searchLocation) {
      filtered = filtered.filter(itinerary => 
        itinerary.location.country.toLowerCase().includes(searchLocation.toLowerCase()) ||
        itinerary.location.state.toLowerCase().includes(searchLocation.toLowerCase()) ||
        itinerary.location.destination.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    // Price filters
    if (filters.minPrice) {
      filtered = filtered.filter(itinerary => itinerary.price >= parseFloat(filters.minPrice));
    }
    if (filters.maxPrice) {
      filtered = filtered.filter(itinerary => itinerary.price <= parseFloat(filters.maxPrice));
    }

    // Duration filter
    if (filters.duration) {
      filtered = filtered.filter(itinerary => 
        itinerary.duration.toLowerCase().includes(filters.duration.toLowerCase())
      );
    }

    // Sort
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'price':
          return a.price - b.price;
        case 'rating':
          return (b.agent?.avg_rating || 0) - (a.agent?.avg_rating || 0);
        case 'name':
          return a.title.localeCompare(b.title);
        default:
          return 0;
      }
    });

    setFilteredItineraries(filtered);
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!searchLocation.trim()) return;
    
    try {
      const response = await axios.get(`${API}/itineraries?location=${searchLocation}`);
      setItineraries(response.data);
      
      // Scroll to results section after search
      setTimeout(() => {
        const resultsSection = document.getElementById('search-results');
        if (resultsSection) {
          resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (error) {
      console.error('Search error:', error);
    }
  };

  const clearSearch = () => {
    setSearchLocation('');
    fetchData(); // Reset to show all itineraries
  };

  const resetFilters = () => {
    setFilters({
      minPrice: '',
      maxPrice: '',
      duration: '',
      sortBy: 'price'
    });
    setSearchLocation('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">Discovering amazing destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <div className="relative h-screen flex items-center justify-center overflow-hidden">
        {/* Background with parallax effect */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1544551763-46a013bb70d5" 
            alt="Tropical Beach"
            className="w-full h-full object-cover transform scale-105 animate-ken-burns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-purple-900/70 to-indigo-900/80"></div>
        </div>
        
        {/* Floating elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-32 h-32 bg-yellow-400/20 rounded-full animate-float-delayed"></div>
          <div className="absolute bottom-32 left-1/4 w-16 h-16 bg-pink-400/15 rounded-full animate-float"></div>
        </div>

        <div className="relative text-center text-white z-10 max-w-6xl mx-auto px-4">
          <h1 className="text-7xl font-bold mb-6 leading-tight animate-fade-in-up">
            Discover Your
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Dream Journey
            </span>
          </h1>
          <p className="text-2xl mb-12 font-light opacity-90 animate-fade-in-up animation-delay-300">
            Connect with expert travel agents worldwide and create unforgettable memories
          </p>
          
          {/* Enhanced Search */}
          <div className="max-w-2xl mx-auto animate-fade-in-up animation-delay-600">
            <form onSubmit={handleSearch} className="relative">
              <div className="flex flex-col md:flex-row gap-4 bg-white/95 backdrop-blur-sm rounded-2xl p-4 shadow-2xl">
                <div className="flex-1 relative">
                  <input
                    type="text"
                    placeholder="Where do you want to explore?"
                    className="w-full px-6 py-4 text-gray-800 bg-transparent border-0 focus:outline-none text-lg placeholder-gray-500 pr-12"
                    value={searchLocation}
                    onChange={(e) => setSearchLocation(e.target.value)}
                    onFocus={() => setShowSuggestions(searchSuggestions.length > 0)}
                    onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
                  />
                  {searchLocation && (
                    <button
                      type="button"
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 text-xl"
                    >
                      ✕
                    </button>
                  )}
                  
                  {/* AI-powered search suggestions */}
                  {showSuggestions && searchSuggestions.length > 0 && (
                    <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 max-h-60 overflow-y-auto">
                      {searchSuggestions.map((suggestion, index) => (
                        <button
                          key={index}
                          type="button"
                          className="w-full px-6 py-3 text-left hover:bg-blue-50 transition-colors flex items-center gap-3"
                          onClick={() => {
                            setSearchLocation(suggestion);
                            setShowSuggestions(false);
                          }}
                        >
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <span className="text-gray-700">{suggestion}</span>
                          <span className="ml-auto text-xs text-gray-400">AI Suggestion</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                <button
                  type="button"
                  onClick={() => setShowFilters(!showFilters)}
                  className="px-6 py-4 bg-gray-100 text-gray-700 rounded-xl hover:bg-gray-200 transition-all duration-300 flex items-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4" />
                  </svg>
                  Filters
                </button>
                <button
                  type="submit"
                  className="px-8 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Search
                </button>
              </div>
            </form>

            {/* Filters Panel */}
            {showFilters && (
              <div className="mt-4 bg-white/95 backdrop-blur-sm rounded-2xl p-6 shadow-xl animate-slide-down">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Min Price</label>
                    <input
                      type="number"
                      placeholder="₹0"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                      value={filters.minPrice}
                      onChange={(e) => setFilters({...filters, minPrice: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Max Price</label>
                    <input
                      type="number"
                      placeholder="₹500000"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                      value={filters.maxPrice}
                      onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Duration</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                      value={filters.duration}
                      onChange={(e) => setFilters({...filters, duration: e.target.value})}
                    >
                      <option value="" className="text-gray-800">Any Duration</option>
                      <option value="3" className="text-gray-800">3 Days</option>
                      <option value="5" className="text-gray-800">5 Days</option>
                      <option value="7" className="text-gray-800">7 Days</option>
                      <option value="10" className="text-gray-800">10+ Days</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                    <select
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-800"
                      value={filters.sortBy}
                      onChange={(e) => setFilters({...filters, sortBy: e.target.value})}
                    >
                      <option value="price" className="text-gray-800">Price (Low to High)</option>
                      <option value="rating" className="text-gray-800">Rating (High to Low)</option>
                      <option value="name" className="text-gray-800">Name (A to Z)</option>
                    </select>
                  </div>
                </div>
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={resetFilters}
                    className="px-6 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Reset Filters
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 animate-fade-in-up animation-delay-900">
            <div className="text-center">
              <div className="text-4xl font-bold text-yellow-400 mb-2">{agents.length}+</div>
              <div className="text-lg opacity-90">Expert Agents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-400 mb-2">{itineraries.length}+</div>
              <div className="text-lg opacity-90">Amazing Destinations</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-pink-400 mb-2">50+</div>
              <div className="text-lg opacity-90">Countries Covered</div>
            </div>
          </div>

          {/* AI-powered Recommendations */}
          {aiRecommendations.length > 0 && (
            <div className="mt-12 animate-fade-in-up animation-delay-1200">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-2">
                  🤖 AI-Powered Recommendations
                </h3>
                <p className="text-lg text-blue-100">
                  Discover top-rated experiences curated by our AI
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                {aiRecommendations.map((item, index) => (
                  <div key={item.id} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 transform hover:scale-105">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-lg font-semibold text-white">{item.title}</h4>
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-white text-sm">{item.agent?.avg_rating}</span>
                      </div>
                    </div>
                    <p className="text-blue-100 text-sm mb-3">{item.description}</p>
                    <div className="flex items-center justify-between text-sm text-blue-200">
                      <span>{item.location.destination}</span>
                      <span className="font-semibold">{item.currency}{item.price}</span>
                    </div>
                    <div className="mt-3 text-xs text-blue-300 italic">
                      {item.aiReason}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Featured Itineraries */}
      <div id="search-results" className="max-w-7xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            {searchLocation ? `Search Results for "${searchLocation}"` : 'Handpicked Travel'}
            {!searchLocation && (
              <span className="block bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Experiences
              </span>
            )}
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            {searchLocation 
              ? `Found ${filteredItineraries.length} amazing ${filteredItineraries.length === 1 ? 'trip' : 'trips'} matching your search`
              : 'Discover carefully curated journeys designed by our expert travel agents around the world'
            }
          </p>
        </div>
        
        {filteredItineraries.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">🔍</div>
            <p className="text-xl text-gray-600 mb-4">No trips found matching your criteria</p>
            <button
              onClick={resetFilters}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              Clear Filters
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {(showAllPackages ? filteredItineraries : filteredItineraries.slice(0, 6)).map((itinerary, index) => (
              <Link 
                key={itinerary.id}
                to={`/itinerary/${itinerary.id}`}
                className="group bg-white rounded-3xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up"
                style={{animationDelay: `${index * 100}ms`}}
              >
                <div className="relative overflow-hidden">
                  {/* Package Image */}
                  <img
                    src={itinerary.images && itinerary.images.length > 0 ? itinerary.images[0] : "https://images.unsplash.com/photo-1550399504-8953e1a6ac87"}
                    alt={itinerary.title}
                    className="w-full h-64 object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                    <span className="text-sm font-semibold text-gray-800">{itinerary.duration}</span>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-8">
                  <div className="flex items-center justify-between mb-4">
                    <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                      {itinerary.location.destination}
                    </span>
                    {itinerary.agent?.avg_rating > 0 && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-400">⭐</span>
                        <span className="text-sm font-semibold">{itinerary.agent.avg_rating}</span>
                        <span className="text-xs text-gray-500">({itinerary.agent.total_reviews})</span>
                      </div>
                    )}
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-3 text-gray-800 group-hover:text-blue-600 transition-colors">
                    {itinerary.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-6 line-clamp-3">
                    {itinerary.description.substring(0, 120)}...
                  </p>

                  {/* Agent Info */}
                  {itinerary.agent && (
                    <div className="flex items-center mb-6 p-3 bg-gray-50 rounded-xl">
                      {itinerary.agent.profile_image ? (
                        <img 
                          src={`data:image/jpeg;base64,${itinerary.agent.profile_image}`}
                          alt={itinerary.agent.name}
                          className="w-10 h-10 rounded-full mr-3 object-cover"
                        />
                      ) : (
                        <div className="w-10 h-10 rounded-full mr-3 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                          {itinerary.agent.name.charAt(0)}
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="font-semibold text-gray-800">{itinerary.agent.name}</p>
                        <p className="text-sm text-gray-500">
                          {itinerary.agent.location?.city}, {itinerary.agent.location?.state}
                        </p>
                      </div>
                      {itinerary.agent.phone && (
                        <div className="flex gap-2">
                          <a
                            href={`tel:${itinerary.agent.phone}`}
                            className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors"
                            title="Call Agent"
                            onClick={e => e.stopPropagation()}
                            onMouseDown={e => e.stopPropagation()}
                          >
                            📞
                          </a>
                          <a
                            href={`https://wa.me/${itinerary.agent.phone.replace(/[^0-9]/g, '')}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center hover:bg-green-600 transition-colors"
                            title="WhatsApp"
                            onClick={e => e.stopPropagation()}
                            onMouseDown={e => e.stopPropagation()}
                          >
                            📱
                          </a>
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                        {itinerary.currency} {itinerary.price.toLocaleString()}
                      </span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <span
                      className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                    >
                      Explore
                    </span>
                  </div>
                </div>
              </Link>
            ))}
            
            {/* View Packages Button */}
            {!searchLocation && filteredItineraries.length > 6 && (
              <div className="text-center mt-12">
                <button
                  onClick={() => setShowAllPackages(!showAllPackages)}
                  className="px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-xl font-bold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  {showAllPackages ? 'Show Less Packages' : `View All ${filteredItineraries.length} Packages`}
                </button>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Featured Agents */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold text-white mb-6">
              Meet Our Travel
              <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Experts
              </span>
            </h2>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Connect with passionate travel professionals who know their destinations inside and out
            </p>
          </div>
          {/* Carousel with arrows */}
          <div className="relative">
            {/* Left Arrow */}
            <button
              type="button"
              className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-blue-700 shadow-lg rounded-full w-12 h-12 items-center justify-center transition-all duration-200 border border-blue-200"
              onClick={() => scrollAgents('left')}
              aria-label="Scroll left"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            {/* Agent Cards Scrollable Row */}
            <div
              ref={agentCarouselRef}
              className="flex overflow-x-auto space-x-8 pb-4 scrollbar-hide snap-x snap-mandatory scroll-smooth"
              onMouseEnter={() => setIsCarouselHovered(true)}
              onMouseLeave={() => setIsCarouselHovered(false)}
            >
              {agents.slice(0, 8).map((agent, index) => (
                <div 
                  key={agent.id} 
                  className="group bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center hover:bg-white/20 transition-all duration-500 transform hover:-translate-y-2 animate-fade-in-up min-w-[280px] max-w-xs snap-center"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  {agent.profile_image ? (
                    <img 
                      src={`data:image/jpeg;base64,${agent.profile_image}`}
                      alt={agent.name}
                      className="w-20 h-20 rounded-full mx-auto mb-4 object-cover border-4 border-white/20 group-hover:border-white/40 transition-all duration-300"
                    />
                  ) : (
                    <div className="w-20 h-20 rounded-full mx-auto mb-4 bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white text-2xl font-bold border-4 border-white/20 group-hover:border-white/40 transition-all duration-300">
                      {agent.name.charAt(0)}
                    </div>
                  )}
                  <h3 className="text-xl font-bold mb-2 text-white group-hover:text-yellow-400 transition-colors">
                    {agent.name}
                  </h3>
                  <p className="text-blue-200 mb-2">
                    {agent.location.city}, {agent.location.state}
                  </p>
                  {agent.avg_rating > 0 && (
                    <div className="flex items-center justify-center gap-1 mb-3">
                      <span className="text-yellow-400">⭐</span>
                      <span className="text-white font-semibold">{agent.avg_rating}</span>
                      <span className="text-blue-200 text-sm">({agent.total_reviews} reviews)</span>
                    </div>
                  )}
                  <p className="text-sm text-blue-200 mb-6">
                    {agent.itinerary_count} packages available
                  </p>
                  <div className="space-y-2">
                    <Link 
                      to={`/agent/${agent.id}`}
                      className="block w-full py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105"
                    >
                      View Profile
                    </Link>
                    <a 
                      href={`mailto:${agent.email}`}
                      className="block w-full py-2 bg-white/10 text-white rounded-lg hover:bg-white/20 transition-all duration-300"
                    >
                      Contact
                    </a>
                  </div>
                </div>
              ))}
            </div>
            {/* Right Arrow */}
            <button
              type="button"
              className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white/80 hover:bg-white text-blue-700 shadow-lg rounded-full w-12 h-12 items-center justify-center transition-all duration-200 border border-blue-200"
              onClick={() => scrollAgents('right')}
              aria-label="Scroll right"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-orange-500 to-red-500 py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-5xl font-bold text-white mb-6">
            Ready to Start Your Adventure?
          </h2>
          <p className="text-xl text-orange-100 mb-8">
            Join thousands of travelers who have discovered their perfect journey with our expert agents
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link
              to="/agentlogin"
              className="px-8 py-4 bg-white text-orange-500 rounded-xl font-bold hover:bg-orange-50 transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              Become an Agent
            </Link>
            <button
              onClick={() => {
                document.querySelector('input[placeholder*="explore"]').scrollIntoView({ behavior: 'smooth' });
                document.querySelector('input[placeholder*="explore"]').focus();
              }}
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-xl font-bold hover:bg-white hover:text-orange-500 transition-all duration-300 transform hover:scale-105"
            >
              Find Your Trip
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                Booking.com
              </h3>
              <p className="text-gray-300 mb-6">
                Connecting travelers with expert agents worldwide for unforgettable experiences.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center hover:bg-blue-600 transition-colors cursor-pointer">
                  📘
                </div>
                <div className="w-10 h-10 bg-pink-500 rounded-full flex items-center justify-center hover:bg-pink-600 transition-colors cursor-pointer">
                  📷
                </div>
                <div className="w-10 h-10 bg-blue-400 rounded-full flex items-center justify-center hover:bg-blue-500 transition-colors cursor-pointer">
                  🐦
                </div>
              </div>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">For Travelers</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/" className="hover:text-white transition-colors">Browse Packages</Link></li>
                <li><Link to="/" className="hover:text-white transition-colors">Find Agents</Link></li>
                <li><Link to="/how-it-works" className="hover:text-white transition-colors">How It Works</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">For Agents</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/agentlogin" className="hover:text-white transition-colors">Agent Login</Link></li>
                <li><Link to="/agentlogin" className="hover:text-white transition-colors">Join as Agent</Link></li>
                <li><Link to="/dashboard" className="hover:text-white transition-colors">Dashboard</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-6 text-lg">Support</h4>
              <ul className="space-y-3 text-gray-300">
                <li><Link to="/about" className="hover:text-white transition-colors">About Us</Link></li>
                <li><Link to="/terms" className="hover:text-white transition-colors">Terms of Service</Link></li>
                <li><Link to="/privacy" className="hover:text-white transition-colors">Privacy Policy</Link></li>
                <li><Link to="/contact" className="hover:text-white">Contact</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
            <p>&copy; 2025 Booking.com. All rights reserved. Made with ❤️ for travelers worldwide.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

// Mock data for development
const mockAgents = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@travelpro.com",
    phone: "+1234567890",
    location: { city: "New York", state: "NY" },
    avg_rating: 4.8,
    total_reviews: 127,
    itinerary_count: 15
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@wanderlust.com",
    phone: "+1234567891",
    location: { city: "San Francisco", state: "CA" },
    avg_rating: 4.9,
    total_reviews: 89,
    itinerary_count: 12
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@adventures.com",
    phone: "+1234567892",
    location: { city: "Miami", state: "FL" },
    avg_rating: 4.7,
    total_reviews: 156,
    itinerary_count: 18
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@explorer.com",
    phone: "+1234567893",
    location: { city: "Seattle", state: "WA" },
    avg_rating: 4.6,
    total_reviews: 94,
    itinerary_count: 10
  },
  {
    id: 5,
    name: "Mountain Explorers",
    email: "info@mountainexplorers.com",
    phone: "+91 8438327763",
    location: { city: "Manali", state: "Himachal Pradesh" },
    avg_rating: 4.8,
    total_reviews: 1250,
    itinerary_count: 1250,
    description: "We are a leading travel agency specializing in adventure tourism and cultural experiences in the beautiful Himalayas. With over 8 years of experience, we've helped thousands of travelers create unforgettable memories.",
    experience: "8 years experience",
    website: "www.mountainexplorers.com"
  }
];

const mockItineraries = [
  // Sarah Johnson (Adventure & Spiritual Tours) - 3 packages
  {
    id: 1,
    title: "Manali Adventure Package",
    description: "Experience thrilling adventures in the beautiful mountains of Manali with trekking, paragliding, and river rafting.",
    price: 15000,
    currency: "₹",
    duration: "7 Days",
    location: { country: "India", state: "Himachal Pradesh", destination: "Manali" },
    agent: mockAgents[0],
    images: []
  },
  {
    id: 2,
    title: "Varanasi Spiritual Journey",
    description: "Experience the spiritual essence with Ganga Aarti, temple visits, and boat rides.",
    price: 11000,
    currency: "₹",
    duration: "3D/2N",
    location: { country: "India", state: "Uttar Pradesh", destination: "Varanasi" },
    agent: mockAgents[0],
    images: []
  },
  {
    id: 3,
    title: "Agra Taj Mahal Tour",
    description: "Visit the iconic Taj Mahal, Agra Fort, and Fatehpur Sikri.",
    price: 10000,
    currency: "₹",
    duration: "3D/2N",
    location: { country: "India", state: "Uttar Pradesh", destination: "Agra" },
    agent: mockAgents[0],
    images: []
  },

  // Michael Chen (Beach & Heritage Tours) - 3 packages
  {
    id: 4,
    title: "Goa Beach Holiday",
    description: "Relax on pristine beaches and enjoy water sports, nightlife, and Portuguese heritage.",
    price: 12000,
    currency: "₹",
    duration: "4D/3N",
    location: { country: "India", state: "Goa", destination: "Goa" },
    agent: mockAgents[1],
    images: []
  },
  {
    id: 5,
    title: "Ooty Botanical Gardens",
    description: "Explore the famous botanical gardens, take boat rides, and enjoy the cool climate.",
    price: 13000,
    currency: "₹",
    duration: "4D/3N",
    location: { country: "India", state: "Tamil Nadu", destination: "Ooty" },
    agent: mockAgents[1],
    images: []
  },
  {
    id: 6,
    title: "Jaipur Heritage Walk",
    description: "Discover the Pink City with forts, palaces, and traditional markets.",
    price: 14000,
    currency: "₹",
    duration: "4D/3N",
    location: { country: "India", state: "Rajasthan", destination: "Jaipur" },
    agent: mockAgents[1],
    images: []
  },

  // Emma Davis (Kerala & City Tours) - 3 packages
  {
    id: 7,
    title: "Kerala Backwaters",
    description: "Cruise through serene backwaters and lush landscapes in traditional houseboats.",
    price: 18000,
    currency: "₹",
    duration: "6D/5N",
    location: { country: "India", state: "Kerala", destination: "Alleppey" },
    agent: mockAgents[2],
    images: []
  },
  {
    id: 8,
    title: "Munnar Hill Station",
    description: "Experience the beauty of rolling tea gardens, waterfalls, and misty mountains.",
    price: 17000,
    currency: "₹",
    duration: "4D/3N",
    location: { country: "India", state: "Kerala", destination: "Munnar" },
    agent: mockAgents[2],
    images: []
  },
  {
    id: 9,
    title: "Mumbai City Experience",
    description: "Explore the financial capital with Bollywood tours, street food, and landmarks.",
    price: 16000,
    currency: "₹",
    duration: "4D/3N",
    location: { country: "India", state: "Maharashtra", destination: "Mumbai" },
    agent: mockAgents[2],
    images: []
  },

  // David Wilson (Heritage & Cultural Tours) - 3 packages
  {
    id: 10,
    title: "Darjeeling Tea Gardens",
    description: "Visit tea plantations, ride the toy train, and witness sunrise at Tiger Hill.",
    price: 14000,
    currency: "₹",
    duration: "5D/4N",
    location: { country: "India", state: "West Bengal", destination: "Darjeeling" },
    agent: mockAgents[3],
    images: []
  },
  {
    id: 11,
    title: "Udaipur Palace Tour",
    description: "Explore the City of Lakes with palace visits, boat rides, and cultural experiences.",
    price: 19000,
    currency: "₹",
    duration: "5D/4N",
    location: { country: "India", state: "Rajasthan", destination: "Udaipur" },
    agent: mockAgents[3],
    images: []
  },
  {
    id: 12,
    title: "Delhi Historical Tour",
    description: "Discover Old and New Delhi with monuments, markets, and cultural heritage.",
    price: 12000,
    currency: "₹",
    duration: "4D/3N",
    location: { country: "India", state: "Delhi", destination: "Delhi" },
    agent: mockAgents[3],
    images: []
  },

  // Mountain Explorers (Himalayan Adventure Tours) - 3 packages
  {
    id: 13,
    title: "Rishikesh Yoga Retreat",
    description: "Find inner peace with yoga sessions, meditation, and spiritual experiences in the yoga capital.",
    price: 22000,
    currency: "₹",
    duration: "5D/4N",
    location: { country: "India", state: "Uttarakhand", destination: "Rishikesh" },
    agent: mockAgents[4],
    images: []
  },
  {
    id: 14,
    title: "Shimla Heritage Tour",
    description: "Explore colonial architecture, toy train rides, and scenic mountain views in the Queen of Hills.",
    price: 16000,
    currency: "₹",
    duration: "6D/5N",
    location: { country: "India", state: "Himachal Pradesh", destination: "Shimla" },
    agent: mockAgents[4],
    images: []
  },
  {
    id: 15,
    title: "Leh Ladakh Adventure",
    description: "Experience high-altitude adventure with monasteries, lakes, and mountain passes.",
    price: 35000,
    currency: "₹",
    duration: "8D/7N",
    location: { country: "India", state: "Ladakh", destination: "Leh" },
    agent: mockAgents[4],
    images: []
  }
];

export default Home; 