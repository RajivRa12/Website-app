import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { API } from '../config/api';

const AgentDetail = () => {
  const { id } = useParams();
  const [agent, setAgent] = useState(null);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('packages');
  const [isCustomerLoggedIn, setIsCustomerLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Always check login status on every render
  useEffect(() => {
    setIsCustomerLoggedIn(localStorage.getItem('customerLoggedIn') === 'true');
  });

  useEffect(() => {
    fetchAgentData();
  }, [id]);

  const fetchAgentData = async () => {
    try {
      const [agentResponse, itinerariesResponse] = await Promise.all([
        axios.get(`${API}/agents/${id}`),
        axios.get(`${API}/itineraries?agent_id=${id}`)
      ]);
      setAgent(agentResponse.data);
      setItineraries(itinerariesResponse.data);
    } catch (error) {
      console.error('Error fetching agent data:', error);
      // Use mock data for development
      const agentObj = mockAgentList.find(a => String(a.id) === String(id));
      setAgent(agentObj);
      setItineraries(mockItineraries.filter(pkg => String(pkg.agent.id) === String(id)));
    }
    setLoading(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mb-4"></div>
          <p className="text-xl text-gray-600 font-medium">Loading agent profile...</p>
        </div>
      </div>
    );
  }

  if (!agent) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Agent not found</h1>
          <Link to="/" className="text-blue-500 hover:text-blue-600">Back to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 py-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            {/* Agent Photo */}
            <div className="md:mr-8 mb-8 md:mb-0">
              {agent.profile_image ? (
                <img 
                  src={`data:image/jpeg;base64,${agent.profile_image}`}
                  alt={agent.name}
                  className="w-32 h-32 rounded-full object-cover border-4 border-white/20"
                />
              ) : (
                <div className="w-32 h-32 rounded-full bg-gradient-to-r from-yellow-400 to-orange-500 flex items-center justify-center text-white text-4xl font-bold border-4 border-white/20">
                  {agent.name.charAt(0)}
                </div>
              )}
            </div>

            {/* Agent Info */}
            <div className="text-white text-center md:text-left">
              <h1 className="text-4xl font-bold mb-4">{agent.name}</h1>
              <p className="text-xl text-blue-100 mb-4">
                📍 {agent.location?.city}, {agent.location?.state}
              </p>
              
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 mb-6">
                {agent.avg_rating > 0 && (
                  <div className="flex items-center">
                    <span className="text-yellow-400 text-xl mr-2">⭐</span>
                    <span className="text-2xl font-bold">{agent.avg_rating}</span>
                    <span className="text-blue-200 ml-2">({agent.total_reviews} reviews)</span>
                  </div>
                )}
                <div className="text-center">
                  <div className="text-2xl font-bold">{itineraries.length}</div>
                  <div className="text-blue-200">Packages</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold">{agent.experience_years || 5}+</div>
                  <div className="text-blue-200">Years Experience</div>
                </div>
              </div>

              {/* Agent Contact Buttons Logic */}
              <div className="space-y-2">
                <button
                  className="block w-full bg-blue-500 text-white py-2 rounded-lg text-center hover:bg-blue-600 transition-colors"
                  onClick={() => {
                    if (isCustomerLoggedIn) {
                      window.location.href = `tel:${agent.phone}`;
                    } else {
                      alert('Please log in to our website to view agent contact details.');
                    }
                  }}
                >
                  📞 Call Agent
                </button>
                <button
                  className="block w-full bg-green-500 text-white py-2 rounded-lg text-center hover:bg-green-600 transition-colors"
                  onClick={() => {
                    if (isCustomerLoggedIn) {
                      window.open(`https://wa.me/${agent.phone.replace(/[^0-9]/g, '')}`, '_blank');
                    } else {
                      alert('Please log in to our website to view agent contact details.');
                    }
                  }}
                >
                  📱 WhatsApp
                </button>
                {!isCustomerLoggedIn && (
                  <button
                    className="block w-full bg-blue-500 text-white py-2 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors"
                    onClick={() => navigate('/login')}
                  >
                    Customer Login
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <div className="flex space-x-8 border-b border-gray-200 mb-6">
            {['packages', 'about', 'reviews'].map((tab) => (
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
            {activeTab === 'packages' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Travel Packages</h3>
                {itineraries.length === 0 ? (
                  <div className="text-center py-12">
                    <div className="text-6xl mb-4">🌍</div>
                    <p className="text-xl text-gray-600 mb-4">No packages available yet</p>
                    <p className="text-gray-500">Check back soon for amazing travel experiences!</p>
                  </div>
                ) : (
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {itineraries.map((itinerary) => (
                      <div 
                        key={itinerary.id} 
                        className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1"
                      >
                        <div className="relative">
                          <img 
                            src={itinerary.images && itinerary.images.length > 0 ? itinerary.images[0] : "https://images.unsplash.com/photo-1550399504-8953e1a6ac87"}
                            alt={itinerary.title}
                            className="w-full h-48 object-cover"
                          />
                          <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1">
                            <span className="text-sm font-semibold text-gray-800">{itinerary.duration}</span>
                          </div>
                        </div>
                        
                        <div className="p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                              {itinerary.location.destination}
                            </span>
                            {itinerary.agent?.avg_rating > 0 && (
                              <div className="flex items-center gap-1">
                                <span className="text-yellow-400">⭐</span>
                                <span className="text-sm font-semibold">{itinerary.agent.avg_rating}</span>
                              </div>
                            )}
                          </div>
                          
                          <h4 className="text-xl font-bold mb-3 text-gray-800">
                            {itinerary.title}
                          </h4>
                          
                          <p className="text-gray-600 mb-4 line-clamp-2">
                            {itinerary.description.substring(0, 100)}...
                          </p>
                          
                          <div className="flex justify-between items-center">
                            <div>
                              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                {itinerary.currency} {itinerary.price.toLocaleString()}
                              </span>
                              <span className="text-gray-500 text-sm ml-1">per person</span>
                            </div>
                            <Link 
                              to={`/itinerary/${itinerary.id}`}
                              className="px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg hover:from-blue-600 hover:to-purple-600 transition-all duration-300"
                            >
                              View Details
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {activeTab === 'about' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">About {agent.name}</h3>
                <div className="grid md:grid-cols-2 gap-8">
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Bio</h4>
                    <p className="text-gray-600 leading-relaxed mb-6">
                      {agent.bio || `${agent.name} is a passionate travel professional with ${agent.experience_years || 5}+ years of experience in creating unforgettable journeys. Specializing in personalized travel experiences, ${agent.name} has helped hundreds of travelers discover the world's most amazing destinations.`}
                    </p>
                    
                    <h4 className="font-semibold text-lg mb-3">Specializations</h4>
                    <div className="flex flex-wrap gap-2">
                      {['Cultural Tours', 'Adventure Travel', 'Luxury Vacations', 'Group Tours', 'Honeymoon Planning'].map((specialty) => (
                        <span key={specialty} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                          {specialty}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div>
                    <h4 className="font-semibold text-lg mb-3">Languages</h4>
                    <div className="space-y-2 mb-6">
                      {['English', 'Spanish', 'French'].map((language) => (
                        <div key={language} className="flex items-center">
                          <span className="w-3 h-3 bg-green-500 rounded-full mr-3"></span>
                          <span className="text-gray-700">{language}</span>
                        </div>
                      ))}
                    </div>
                    
                    <h4 className="font-semibold text-lg mb-3">Certifications</h4>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">IATA Certified Travel Agent</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-blue-500 rounded-full mr-3"></span>
                        <span className="text-gray-700">Destination Specialist</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div>
                <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {[1, 2, 3, 4, 5].map((review) => (
                    <div key={review} className="border border-gray-200 rounded-lg p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center">
                          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold mr-4">
                            U{review}
                          </div>
                          <div>
                            <p className="font-semibold">User {review}</p>
                            <div className="flex items-center">
                              <span className="text-yellow-400">⭐⭐⭐⭐⭐</span>
                              <span className="text-sm text-gray-500 ml-2">2 weeks ago</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm text-gray-500">Package: Bali Adventure</p>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-relaxed">
                        {review === 1 && "Absolutely amazing experience! The itinerary was perfectly planned and our guide was incredibly knowledgeable. Every detail was taken care of and we felt completely safe throughout the entire trip."}
                        {review === 2 && "Sarah went above and beyond to make our honeymoon special. She personalized everything to our preferences and the accommodations were stunning. Highly recommend!"}
                        {review === 3 && "Professional, responsive, and truly passionate about travel. The local experiences she arranged were authentic and unforgettable. Will definitely book with her again."}
                        {review === 4 && "Great communication from start to finish. The trip exceeded our expectations and the value for money was excellent. Sarah really knows her destinations."}
                        {review === 5 && "Outstanding service! She handled all the logistics perfectly and we had zero stress during our vacation. The attention to detail was impressive."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Mock data for development
const mockAgentList = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah@travelpro.com",
    phone: "+1234567890",
    location: { city: "New York", state: "NY" },
    avg_rating: 4.8,
    total_reviews: 127,
    experience_years: 8,
    bio: "Sarah is a passionate travel professional with 8+ years of experience in creating unforgettable journeys. Specializing in adventure and spiritual tours.",
    profile_image: null
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "michael@travelpro.com",
    phone: "+0987654321",
    location: { city: "Los Angeles", state: "CA" },
    avg_rating: 4.5,
    total_reviews: 85,
    experience_years: 6,
    bio: "Michael specializes in beach and heritage tours, ensuring every journey is unforgettable.",
    profile_image: null
  },
  {
    id: 3,
    name: "Emma Davis",
    email: "emma@travelpro.com",
    phone: "+1122334455",
    location: { city: "London", state: "UK" },
    avg_rating: 4.9,
    total_reviews: 200,
    experience_years: 10,
    bio: "Emma is a world traveler with 10+ years of experience. She's passionate about Kerala and city tours.",
    profile_image: null
  },
  {
    id: 4,
    name: "David Wilson",
    email: "david@travelpro.com",
    phone: "+1987654321",
    location: { city: "Seattle", state: "WA" },
    avg_rating: 4.7,
    total_reviews: 110,
    experience_years: 7,
    bio: "David is an expert in heritage and cultural tours across India.",
    profile_image: null
  },
  {
    id: 5,
    name: "Mountain Explorers",
    email: "info@mountainexplorers.com",
    phone: "+91 8438327763",
    location: { city: "Manali", state: "Himachal Pradesh" },
    avg_rating: 4.8,
    total_reviews: 1250,
    experience_years: 8,
    bio: "We are a leading travel agency specializing in adventure tourism and cultural experiences in the beautiful Himalayas.",
    profile_image: null
  }
];

const mockItineraries = [
  // Sarah Johnson
  {
    id: 1,
    title: "Manali Adventure Package",
    description: "Trekking, paragliding, river rafting in the beautiful mountains of Manali.",
    price: 15000,
    currency: "₹",
    duration: "7 Days",
    location: { destination: "Manali" },
    agent: mockAgentList[0],
    images: ["https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 2,
    title: "Varanasi Spiritual Journey",
    description: "Ganga Aarti, temples, spiritual experiences in Varanasi.",
    price: 11000,
    currency: "₹",
    duration: "3D/2N",
    location: { destination: "Varanasi" },
    agent: mockAgentList[0],
    images: ["https://images.unsplash.com/photo-1508672019048-805c876b67e2?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 3,
    title: "Agra Taj Mahal Tour",
    description: "Iconic monuments, historical sites in Agra.",
    price: 10000,
    currency: "₹",
    duration: "3D/2N",
    location: { destination: "Agra" },
    agent: mockAgentList[0],
    images: ["https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=800&q=80"]
  },
  // Michael Chen
  {
    id: 4,
    title: "Goa Beach Holiday",
    description: "Beaches, water sports, nightlife in Goa.",
    price: 12000,
    currency: "₹",
    duration: "4D/3N",
    location: { destination: "Goa" },
    agent: mockAgentList[1],
    images: ["https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 5,
    title: "Ooty Botanical Gardens",
    description: "Gardens, boat rides, cool climate in Ooty.",
    price: 13000,
    currency: "₹",
    duration: "4D/3N",
    location: { destination: "Ooty" },
    agent: mockAgentList[1],
    images: ["https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 6,
    title: "Jaipur Heritage Walk",
    description: "Pink City, forts, palaces in Jaipur.",
    price: 14000,
    currency: "₹",
    duration: "4D/3N",
    location: { destination: "Jaipur" },
    agent: mockAgentList[1],
    images: ["https://images.unsplash.com/photo-1504196606672-aef5c9cefc92?auto=format&fit=crop&w=800&q=80"]
  },
  // Emma Davis
  {
    id: 7,
    title: "Kerala Backwaters",
    description: "Houseboat cruises, serene landscapes in Kerala.",
    price: 18000,
    currency: "₹",
    duration: "6D/5N",
    location: { destination: "Alleppey" },
    agent: mockAgentList[2],
    images: ["https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 8,
    title: "Munnar Hill Station",
    description: "Tea gardens, waterfalls, misty mountains in Munnar.",
    price: 17000,
    currency: "₹",
    duration: "4D/3N",
    location: { destination: "Munnar" },
    agent: mockAgentList[2],
    images: ["https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 9,
    title: "Mumbai City Experience",
    description: "Bollywood, street food, landmarks in Mumbai.",
    price: 16000,
    currency: "₹",
    duration: "4D/3N",
    location: { destination: "Mumbai" },
    agent: mockAgentList[2],
    images: ["https://images.unsplash.com/photo-1509228468518-180dd4864904?auto=format&fit=crop&w=800&q=80"]
  },
  // David Wilson
  {
    id: 10,
    title: "Darjeeling Tea Gardens",
    description: "Tea plantations, toy train, sunrise views in Darjeeling.",
    price: 14000,
    currency: "₹",
    duration: "5D/4N",
    location: { destination: "Darjeeling" },
    agent: mockAgentList[3],
    images: ["https://images.unsplash.com/photo-1501594907352-04cda38ebc29?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 11,
    title: "Udaipur Palace Tour",
    description: "City of Lakes, palaces, cultural experiences in Udaipur.",
    price: 19000,
    currency: "₹",
    duration: "5D/4N",
    location: { destination: "Udaipur" },
    agent: mockAgentList[3],
    images: ["https://images.unsplash.com/photo-1505761671935-60b3a7427bad?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 12,
    title: "Delhi Historical Tour",
    description: "Old and New Delhi, monuments, markets in Delhi.",
    price: 12000,
    currency: "₹",
    duration: "4D/3N",
    location: { destination: "Delhi" },
    agent: mockAgentList[3],
    images: ["https://images.unsplash.com/photo-1465378552210-88481e5b7cbe?auto=format&fit=crop&w=800&q=80"]
  },
  // Mountain Explorers
  {
    id: 13,
    title: "Rishikesh Yoga Retreat",
    description: "Yoga sessions, meditation, spiritual experiences in Rishikesh.",
    price: 22000,
    currency: "₹",
    duration: "5D/4N",
    location: { destination: "Rishikesh" },
    agent: mockAgentList[4],
    images: ["https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 14,
    title: "Shimla Heritage Tour",
    description: "Colonial architecture, toy train, mountain views in Shimla.",
    price: 16000,
    currency: "₹",
    duration: "6D/5N",
    location: { destination: "Shimla" },
    agent: mockAgentList[4],
    images: ["https://images.unsplash.com/photo-1505483531331-2111b6c9b76c?auto=format&fit=crop&w=800&q=80"]
  },
  {
    id: 15,
    title: "Leh Ladakh Adventure",
    description: "High-altitude adventure with monasteries, lakes, and mountain passes in Ladakh.",
    price: 35000,
    currency: "₹",
    duration: "8D/7N",
    location: { destination: "Leh" },
    agent: mockAgentList[4],
    images: ["https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=800&q=80"]
  }
];

export default AgentDetail; 