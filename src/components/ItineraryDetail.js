import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config/api';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ItineraryDetail = () => {
  const { id } = useParams();
  const [itinerary, setItinerary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [aiQuery, setAiQuery] = useState('');
  const [aiResponse, setAiResponse] = useState('');
  const [showBookingModal, setShowBookingModal] = useState(false);
  const [bookingForm, setBookingForm] = useState({
    name: '',
    email: '',
    phone: '',
    days: 1,
    travelers: 1,
    startDate: null,
    endDate: null,
    special: '',
    agree: false,
  });
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [bookingSubmitted, setBookingSubmitted] = useState(false);
  const navigate = useNavigate();
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);

  useEffect(() => {
    fetchItinerary();
  }, [id]);

  // Auto-calculate end date when startDate or days changes
  useEffect(() => {
    if (bookingForm.startDate && bookingForm.days > 0) {
      const end = new Date(bookingForm.startDate);
      end.setDate(end.getDate() + Number(bookingForm.days) - 1);
      setBookingForm(prev => ({ ...prev, endDate: end }));
    } else {
      setBookingForm(prev => ({ ...prev, endDate: null }));
    }
  }, [bookingForm.startDate, bookingForm.days]);

  // Check for demo login status (simulate login)
  useEffect(() => {
    if (localStorage.getItem('customerLoggedIn') === 'true') {
      setIsCustomerLoggedIn(true);
    }
  }, []);

  const fetchItinerary = async () => {
    try {
      // Use the id param to select the correct mock itinerary
      if (id === '2') {
        setItinerary(mockItineraryGoa);
      } else if (id === '3') {
        setItinerary(mockItineraryKerala);
      } else {
        setItinerary(mockItineraryManali);
      }
    } catch (error) {
      setItinerary(mockItineraryManali);
    }
    setLoading(false);
  };

  const handleAiSearch = (e) => {
    e.preventDefault();
    // Placeholder AI response
    setAiResponse(`AI (demo): Sorry, I can't answer that right now, but this is where an AI response would appear!`);
  };

  const handleBookingChange = (e) => {
    const { name, value, type, checked } = e.target;
    setBookingForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    setBookingSubmitted(true);
    setTimeout(() => {
      setShowBookingModal(false);
      setBookingSubmitted(false);
      setBookingForm({
        name: '',
        email: '',
        phone: '',
        days: 1,
        travelers: 1,
        startDate: null,
        endDate: null,
        special: '',
        agree: false,
      });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">Loading amazing journey...</p>
        </div>
      </div>
    );
  }

  if (!itinerary) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Itinerary not found</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-600">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Booking Modal */}
      {showBookingModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-xl shadow-2xl p-8 w-full max-w-lg relative animate-fadeIn">
            <button
              className="absolute top-3 right-3 text-gray-400 hover:text-gray-700 text-2xl font-bold"
              onClick={() => setShowBookingModal(false)}
              aria-label="Close"
            >
              ×
            </button>
            <h2 className="text-2xl font-bold mb-4 text-center">Book This Package</h2>
            {bookingSubmitted ? (
              <div className="text-green-600 text-center font-semibold py-8">Thank you! Your booking request has been submitted.</div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="space-y-4">
                <div>
                  <label className="block font-medium mb-1">Name</label>
                  <input type="text" name="name" value={bookingForm.name} onChange={handleBookingChange} required className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Email</label>
                  <input type="email" name="email" value={bookingForm.email} onChange={handleBookingChange} required className="w-full border rounded-lg px-3 py-2" />
                </div>
                <div>
                  <label className="block font-medium mb-1">Phone</label>
                  <input type="tel" name="phone" value={bookingForm.phone} onChange={handleBookingChange} required className="w-full border rounded-lg px-3 py-2" />
                </div>
                {/* Number of Days */}
                <div>
                  <label className="block font-medium mb-1">Number of Days</label>
                  <input
                    type="number"
                    name="days"
                    min="1"
                    value={bookingForm.days}
                    onChange={handleBookingChange}
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                {/* Number of Travelers */}
                <div>
                  <label className="block font-medium mb-1">Number of Travelers</label>
                  <input
                    type="number"
                    name="travelers"
                    min="1"
                    value={bookingForm.travelers}
                    onChange={handleBookingChange}
                    required
                    className="w-full border rounded-lg px-3 py-2"
                  />
                </div>
                {/* Start Date */}
                <div>
                  <label className="block font-medium mb-1">Start Date</label>
                  <div className="relative">
                    <DatePicker
                      selected={bookingForm.startDate}
                      onChange={date => setBookingForm(prev => ({ ...prev, startDate: date }))}
                      selectsStart
                      startDate={bookingForm.startDate}
                      endDate={bookingForm.endDate}
                      placeholderText="Select start date"
                      className="w-full border rounded-lg px-3 py-2 pr-10 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      showMonthDropdown
                      showYearDropdown
                      dropdownMode="select"
                      withPortal
                    />
                    <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <rect x="3" y="4" width="18" height="18" rx="2" fill="white" stroke="currentColor" strokeWidth="1.5"/>
                        <path d="M8 2v4M16 2v4M3 10h18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                      </svg>
                    </span>
                  </div>
                </div>
                {/* End Date (read-only) */}
                <div>
                  <label className="block font-medium mb-1">End Date</label>
                  <input
                    type="text"
                    value={bookingForm.endDate ? bookingForm.endDate.toLocaleDateString() : ''}
                    readOnly
                    className="w-full border rounded-lg px-3 py-2 bg-gray-100 text-gray-700"
                    placeholder="End date"
                  />
                </div>
                <div>
                  <label className="block font-medium mb-1">Special Requests</label>
                  <textarea name="special" value={bookingForm.special} onChange={handleBookingChange} className="w-full border rounded-lg px-3 py-2" rows={2} placeholder="Optional" />
                </div>
                <div className="flex items-center">
                  <input type="checkbox" name="agree" checked={bookingForm.agree} onChange={handleBookingChange} required className="mr-2" />
                  <label htmlFor="agree" className="text-sm">I agree to the Terms of Service and Privacy Policy</label>
                </div>
                <div className="flex gap-2 mt-4">
                  <button type="submit" className="flex-1 bg-blue-600 text-white py-2 rounded-lg font-semibold hover:bg-blue-700 transition">Submit</button>
                  <button type="button" className="flex-1 border border-gray-300 py-2 rounded-lg font-semibold hover:bg-gray-50 transition" onClick={() => setShowBookingModal(false)}>Cancel</button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
      {/* AI Search */}
      <div className="max-w-3xl mx-auto px-4 py-6">
        <form onSubmit={handleAiSearch} className="flex gap-2 items-center">
          <input
            type="text"
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ask AI about this itinerary..."
            value={aiQuery}
            onChange={e => setAiQuery(e.target.value)}
          />
          <button
            type="submit"
            className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
          >
            AI Search
          </button>
        </form>
        {aiResponse && (
          <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg text-blue-800">
            {aiResponse}
          </div>
        )}
      </div>
      {/* Hero Section */}
      <div className="relative h-96 overflow-hidden">
        <img 
          src={itinerary.images?.[0] ? `data:image/jpeg;base64,${itinerary.images[0]}` : "https://images.unsplash.com/photo-1550399504-8953e1a6ac87"}
          alt={itinerary.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl font-bold mb-4">{itinerary.title}</h1>
            <div className="flex items-center space-x-6 text-lg">
              <span>📍 {itinerary.location.destination}</span>
              <span>⏱️ {itinerary.duration}</span>
              <span>👥 {itinerary.max_travelers || '12'} travelers</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex space-x-8 border-b border-gray-200 mb-6">
                {['overview', 'itinerary', 'inclusions', 'reviews'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-4 px-2 font-medium transition-colors capitalize ${
                      activeTab === tab
                        ? 'text-blue-600 border-b-2 border-blue-600'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Tab Content */}
              <div className="min-h-96">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Overview</h3>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {itinerary.description}
                    </p>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-2">Highlights</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• Expert local guides</li>
                          <li>• Comfortable accommodations</li>
                          <li>• Authentic cultural experiences</li>
                          <li>• Small group sizes</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Best Time to Visit</h4>
                        <p className="text-gray-600">Year-round, with peak season from March to October</p>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'itinerary' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Daily Itinerary</h3>
                    <div className="space-y-6">
                      {[1, 2, 3, 4, 5, 6, 7].map((day) => (
                        <div key={day} className="border-l-4 border-blue-500 pl-6">
                          <h4 className="font-semibold text-lg mb-2">Day {day}</h4>
                          <p className="text-gray-600">
                            Experience the highlights of Bali with guided tours, cultural activities, and free time to explore at your own pace.
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'inclusions' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">What's Included</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">✅ Included</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• All accommodations</li>
                          <li>• Daily breakfast</li>
                          <li>• Professional guide</li>
                          <li>• Transportation</li>
                          <li>• Entrance fees</li>
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-red-600">❌ Not Included</h4>
                        <ul className="space-y-2 text-gray-600">
                          <li>• International flights</li>
                          <li>• Travel insurance</li>
                          <li>• Personal expenses</li>
                          <li>• Tips and gratuities</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'reviews' && (
                  <div>
                    <h3 className="text-2xl font-bold mb-4">Customer Reviews</h3>
                    <div className="space-y-6">
                      {[1, 2, 3].map((review) => (
                        <div key={review} className="border border-gray-200 rounded-lg p-4">
                          <div className="flex items-center mb-3">
                            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-3">
                              U
                            </div>
                            <div>
                              <p className="font-semibold">User {review}</p>
                              <div className="flex items-center">
                                <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                                <span className="text-sm text-gray-500 ml-2">2 weeks ago</span>
                              </div>
                            </div>
                          </div>
                          <p className="text-gray-600">
                            Amazing experience! The itinerary was perfectly planned and our guide was incredibly knowledgeable. 
                            Highly recommend this trip!
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Booking Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-2">
                  {itinerary.currency} {itinerary.price}
                </div>
                <p className="text-gray-500">per person</p>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration</span>
                  <span className="font-semibold">{itinerary.duration}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Size</span>
                  <span className="font-semibold">{itinerary.max_travelers || '12'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Rating</span>
                  <span className="font-semibold">⭐ {itinerary.agent.avg_rating} ({itinerary.agent.total_reviews})</span>
                </div>
              </div>

              <button
                className="w-full bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-lg font-semibold hover:from-blue-600 hover:to-purple-600 transition-all duration-300 transform hover:scale-105 mb-4"
                onClick={() => setShowBookingModal(true)}
              >
                Book Now
              </button>

              {/* Contact Agent Button Logic */}
              {isCustomerLoggedIn ? (
                <a
                  href={`tel:${itinerary.agent.phone}`}
                  className="w-full block bg-green-500 text-white py-3 rounded-lg font-semibold hover:bg-green-600 transition-colors text-center mb-2"
                >
                  📞 {itinerary.agent.phone}
                </a>
              ) : (
                <>
                  <button
                    className="w-full border border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-50 transition-colors"
                    onClick={() => alert('Please log in to our website to view agent contact details.')}
                  >
                    Contact Agent
                  </button>
                  <button
                    className="w-full mt-2 bg-blue-500 text-white py-3 rounded-lg font-semibold hover:bg-blue-600 transition-colors"
                    onClick={() => navigate('/login')}
                  >
                    Customer Login
                  </button>
                </>
              )}
            </div>

            {/* Agent Info */}
            {itinerary.agent && (
              <div className="bg-white rounded-xl shadow-lg p-6 mt-6">
                <h3 className="font-bold text-lg mb-4">Travel Agent</h3>
                <div className="flex items-center mb-4">
                  {itinerary.agent.profile_image ? (
                    <img 
                      src={`data:image/jpeg;base64,${itinerary.agent.profile_image}`}
                      alt={itinerary.agent.name}
                      className="w-12 h-12 rounded-full mr-3 object-cover"
                    />
                  ) : (
                    <div className="w-12 h-12 rounded-full mr-3 bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white font-bold">
                      {itinerary.agent.name.charAt(0)}
                    </div>
                  )}
                  <div>
                    <p className="font-semibold">{itinerary.agent.name}</p>
                    <p className="text-sm text-gray-500">
                      {itinerary.agent.location?.city}, {itinerary.agent.location?.state}
                    </p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <span className="text-yellow-400 mr-1">⭐</span>
                    <span className="font-semibold">{itinerary.agent.avg_rating}</span>
                    <span className="text-sm text-gray-500 ml-1">({itinerary.agent.total_reviews})</span>
                  </div>
                  <Link 
                    to={`/agent/${itinerary.agent.id}`}
                    className="text-blue-500 hover:text-blue-600 text-sm font-medium"
                  >
                    View Profile
                  </Link>
                </div>

                {itinerary.agent.phone && (
                  <div className="space-y-2">
                    <a
                      href={`tel:${itinerary.agent.phone}`}
                      className="block w-full bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600 transition-colors"
                    >
                      📞 Call Agent
                    </a>
                    <a
                      href={`https://wa.me/${itinerary.agent.phone.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 transition-colors"
                    >
                      📱 WhatsApp
                    </a>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data for development
const mockItineraryManali = {
  id: 1,
  title: "Manali Adventure Package",
  description: "Experience thrilling adventures in the beautiful mountains of Manali.",
  price: 15000,
  currency: "₹",
  duration: "5D/4N",
  max_travelers: 12,
  location: { country: "India", state: "Himachal Pradesh", destination: "Manali" },
  agent: {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@travelpro.com",
    phone: "+1234567890",
    location: { city: "New York", state: "NY" },
    avg_rating: 4.7,
    total_reviews: 127
  },
  images: []
};

const mockItineraryGoa = {
  id: 2,
  title: "Goa Beach Holiday",
  description: "Relax on pristine beaches and enjoy water sports.",
  price: 12000,
  currency: "₹",
  duration: "4D/3N",
  max_travelers: 10,
  location: { country: "India", state: "Goa", destination: "Goa" },
  agent: {
    id: 2,
    name: "Michael Chen",
    email: "michael@wanderlust.com",
    phone: "+1234567891",
    location: { city: "San Francisco", state: "CA" },
    avg_rating: 4.5,
    total_reviews: 89
  },
  images: []
};

const mockItineraryKerala = {
  id: 3,
  title: "Kerala Backwaters",
  description: "Cruise through serene backwaters and lush landscapes.",
  price: 18000,
  currency: "₹",
  duration: "6D/5N",
  max_travelers: 8,
  location: { country: "India", state: "Kerala", destination: "Alleppey" },
  agent: {
    id: 3,
    name: "Emma Davis",
    email: "emma@adventures.com",
    phone: "+1234567892",
    location: { city: "Miami", state: "FL" },
    avg_rating: 4.6,
    total_reviews: 156
  },
  images: []
};

export default ItineraryDetail; 