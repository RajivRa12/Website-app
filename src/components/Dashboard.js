import React, { useState } from 'react';

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { label: 'Total Packages', value: '12', change: '+2', changeType: 'positive' },
    { label: 'Active Bookings', value: '8', change: '+1', changeType: 'positive' },
    { label: 'Total Revenue', value: '$12,450', change: '+15%', changeType: 'positive' },
    { label: 'Average Rating', value: '4.8', change: '+0.2', changeType: 'positive' }
  ];

  const recentBookings = [
    { id: 1, customer: 'John Doe', package: 'Bali Adventure', date: '2024-01-15', status: 'Confirmed' },
    { id: 2, customer: 'Jane Smith', package: 'Swiss Alps', date: '2024-01-14', status: 'Pending' },
    { id: 3, customer: 'Mike Johnson', package: 'Tokyo Culture', date: '2024-01-13', status: 'Confirmed' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Agent Dashboard</h1>
          <p className="text-gray-600">Welcome back, Sarah! Here's what's happening with your business.</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-800">{stat.value}</p>
                </div>
                <div className={`text-sm font-medium ${
                  stat.changeType === 'positive' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.change}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-lg mb-8">
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {['overview', 'packages', 'bookings', 'messages'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`py-4 px-2 font-medium text-sm border-b-2 transition-colors capitalize ${
                    activeTab === tab
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'overview' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Activity</h3>
                <div className="space-y-4">
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-green-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">New booking received</p>
                      <p className="text-sm text-gray-600">John Doe booked "Bali Adventure" package</p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-blue-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">Package updated</p>
                      <p className="text-sm text-gray-600">"Swiss Alps Explorer" package details modified</p>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center p-4 bg-gray-50 rounded-lg">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full mr-4"></div>
                    <div className="flex-1">
                      <p className="font-medium text-gray-800">New review received</p>
                      <p className="text-sm text-gray-600">5-star review for "Tokyo Cultural Immersion"</p>
                    </div>
                    <span className="text-sm text-gray-500">2 days ago</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'packages' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold text-gray-800">Your Packages</h3>
                  <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
                    Add New Package
                  </button>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {[1, 2, 3].map((pkg) => (
                    <div key={pkg} className="border border-gray-200 rounded-lg p-4">
                      <h4 className="font-semibold text-gray-800 mb-2">Package {pkg}</h4>
                      <p className="text-sm text-gray-600 mb-4">Amazing travel experience</p>
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-600">$1,299</span>
                        <button className="text-blue-500 hover:text-blue-600 text-sm">Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'bookings' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Recent Bookings</h3>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Customer</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Package</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Date</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                        <th className="text-left py-3 px-4 font-medium text-gray-700">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {recentBookings.map((booking) => (
                        <tr key={booking.id} className="border-b border-gray-100">
                          <td className="py-3 px-4">{booking.customer}</td>
                          <td className="py-3 px-4">{booking.package}</td>
                          <td className="py-3 px-4">{booking.date}</td>
                          <td className="py-3 px-4">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              booking.status === 'Confirmed' 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-yellow-100 text-yellow-800'
                            }`}>
                              {booking.status}
                            </span>
                          </td>
                          <td className="py-3 px-4">
                            <button className="text-blue-500 hover:text-blue-600 text-sm">View</button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {activeTab === 'messages' && (
              <div>
                <h3 className="text-xl font-bold text-gray-800 mb-6">Messages</h3>
                <div className="space-y-4">
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">John Doe</h4>
                      <span className="text-sm text-gray-500">2 hours ago</span>
                    </div>
                    <p className="text-gray-600 mb-3">Hi! I'm interested in the Bali Adventure package. Can you tell me more about the accommodation options?</p>
                    <button className="text-blue-500 hover:text-blue-600 text-sm">Reply</button>
                  </div>
                  <div className="border border-gray-200 rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-semibold text-gray-800">Jane Smith</h4>
                      <span className="text-sm text-gray-500">1 day ago</span>
                    </div>
                    <p className="text-gray-600 mb-3">Thanks for the quick response! I'd like to proceed with the booking.</p>
                    <button className="text-blue-500 hover:text-blue-600 text-sm">Reply</button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 