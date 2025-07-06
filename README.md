# 🌍 Booking.com - Modern Travel Website

A beautiful, modern travel marketplace website that connects travelers with expert travel agents worldwide. Built with React, Tailwind CSS, and modern web technologies.

## ✨ Features

### 🏠 Home Page
- **Hero Section** with parallax background and animated elements
- **Advanced Search** with real-time filtering and location search
- **Filter System** with price, duration, and sorting options
- **Featured Itineraries** with agent information and contact options
- **Featured Agents** section with ratings and contact details
- **Responsive Design** with modern animations and interactions

### 🔍 Search & Discovery
- Real-time search as you type
- Advanced filtering (price, duration, location)
- Sorting options (price, rating, name)
- Beautiful itinerary cards with hover effects
- Agent contact integration (phone, WhatsApp, email)

### 👥 Agent Features
- **Agent Profiles** with detailed information
- **Package Management** for travel agents
- **Dashboard** with analytics and booking management
- **Contact Integration** with multiple communication channels
- **Rating System** for agent credibility

### 📱 User Experience
- **Responsive Design** - Works perfectly on all devices
- **Modern UI/UX** with smooth animations and transitions
- **Accessibility** features for better user experience
- **Fast Loading** with optimized performance
- **SEO Optimized** with proper meta tags and structure

### 🛠 Technical Features
- **React 18** with modern hooks and functional components
- **Tailwind CSS** for utility-first styling
- **React Router** for seamless navigation
- **Axios** for API integration
- **Custom Animations** with CSS keyframes
- **Mock Data** for development and testing

## 🚀 Getting Started

### Prerequisites
- Node.js (version 14 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd traveler-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000` to view the application.

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `build` folder.

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Home.js         # Main home page
│   ├── Navbar.js       # Navigation component
│   ├── AgentLogin.js   # Agent login/registration
│   ├── Dashboard.js    # Agent dashboard
│   ├── About.js        # About page
│   ├── Contact.js      # Contact page
│   ├── HowItWorks.js   # How it works page
│   ├── ItineraryDetail.js # Itinerary details
│   └── AgentDetail.js  # Agent profile page
├── config/
│   └── api.js          # API configuration
├── App.js              # Main app component
├── index.js            # Entry point
└── index.css           # Global styles
```

## 🎨 Design System

### Colors
- **Primary**: Blue gradient (`from-blue-500 to-purple-500`)
- **Secondary**: Orange gradient (`from-orange-500 to-red-500`)
- **Background**: Light gray (`gray-50`)
- **Text**: Dark gray (`gray-800`)

### Typography
- **Headings**: Bold, large fonts with gradient text effects
- **Body**: Clean, readable fonts with proper line spacing
- **Buttons**: Rounded corners with hover effects

### Components
- **Cards**: Rounded corners with shadows and hover effects
- **Buttons**: Gradient backgrounds with scale animations
- **Forms**: Clean inputs with focus states
- **Navigation**: Transparent to solid background on scroll

## 🔧 Configuration

### API Configuration
The API configuration is located in `src/config/api.js`. You can modify the base URL and endpoints as needed:

```javascript
export const API = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
```

### Environment Variables
Create a `.env` file in the root directory:

```env
REACT_APP_API_URL=your-api-url-here
```

## 📱 Responsive Design

The website is fully responsive and works on:
- **Desktop** (1200px+)
- **Tablet** (768px - 1199px)
- **Mobile** (320px - 767px)

### Breakpoints
- `sm`: 640px
- `md`: 768px
- `lg`: 1024px
- `xl`: 1280px
- `2xl`: 1536px

## 🎭 Animations

### Custom Animations
- **Fade In Up**: Elements slide up with fade effect
- **Float**: Subtle floating animation for background elements
- **Ken Burns**: Slow zoom effect for hero images
- **Scale**: Button hover effects with scale transformation

### Animation Classes
- `.animate-fade-in-up`
- `.animate-float`
- `.animate-ken-burns`
- `.animate-slide-down`

## 🔌 API Integration

### Endpoints
- `GET /api/agents` - Get all agents
- `GET /api/agents/:id` - Get specific agent
- `GET /api/itineraries` - Get all itineraries
- `GET /api/itineraries/:id` - Get specific itinerary
- `POST /api/auth/login` - Agent login
- `POST /api/auth/register` - Agent registration

### Mock Data
The application includes mock data for development:
- Sample agents with ratings and reviews
- Sample itineraries with pricing and descriptions
- Mock booking data for the dashboard

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect it's a React app
3. Deploy with default settings

### Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure environment variables if needed

### Other Platforms
The app can be deployed to any static hosting service that supports React applications.

## 🛠 Development

### Available Scripts
- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style
- Use functional components with hooks
- Follow React best practices
- Use Tailwind CSS classes for styling
- Keep components modular and reusable

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- **Unsplash** for beautiful travel images
- **Tailwind CSS** for the utility-first CSS framework
- **React** team for the amazing framework
- **Create React App** for the project setup

## 📞 Support

For support and questions:
- Email: support@booking.com
- Documentation: [Link to docs]
- Issues: [GitHub Issues]

---

**Made with ❤️ for travelers worldwide** 