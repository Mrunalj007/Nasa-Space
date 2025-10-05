# 🌍 UrbanInsight - Smart Urban Planner

**Powered by NASA Earth Observation Data & Google Gemini AI**

A full-stack interactive platform for urban planners, city officials, and citizens to visualize environmental data, plan interventions, and get AI-driven recommendations.

---

## 🚀 **Live Demo**

**GitHub**: https://github.com/Mrunalj007/Nasa-Space  
**Vercel**: Deploy from GitHub at https://vercel.com/new

---

## ✨ **Features Implemented**

### ✅ **Core Features**
- [x] Interactive map-based dashboard (Leaflet)
- [x] Real-time environmental metrics (AQI, NDVI, Temperature, Water Quality)
- [x] AI-powered insights using Google Gemini 2.0
- [x] What-if simulator for urban interventions
- [x] Community reporting system
- [x] PDF report generation
- [x] Responsive UI with dark/light mode

### ✅ **Data Sources**
- [x] NASA POWER API (Temperature data)
- [x] OpenAQ API (Air Quality data)
- [x] MODIS NDVI (Vegetation index - simulated for now)
- [x] Simulated water quality data

### ✅ **AI Capabilities**
- [x] Gemini 2.0 Flash for recommendations
- [x] Predictive impact analysis
- [x] Automated policy suggestions
- [x] Environmental insights generation

### ✅ **Pages**
- [x] Home Page
- [x] Dashboard (Main Visualizer)
- [x] AI Planner (Simulations)
- [x] Community Hub
- [x] Policy Insights
- [x] About/Team

---

## 🛠️ **Tech Stack**

### **Frontend**
- React 18 + TypeScript
- TailwindCSS + shadcn/ui
- Framer Motion (animations)
- Leaflet (maps)
- Recharts (data visualization)
- Wouter (routing)

### **Backend**
- Node.js + Express
- TypeScript
- Google Generative AI (Gemini)
- NASA APIs integration
- In-memory storage (upgradeable to PostgreSQL)

### **APIs**
- Google Gemini 2.0 Flash
- NASA POWER API
- OpenAQ Air Quality API
- MODIS (planned)

---

## 📦 **Installation**

### **Prerequisites**
- Node.js 20+
- npm or yarn
- Google Gemini API Key

### **Setup**

```bash
# Clone the repository
git clone https://github.com/Mrunalj007/Nasa-Space.git
cd Nasa-Space/UrbanInsight/UrbanInsight

# Install dependencies
npm install

# Create .env file
cp .env.example .env
```

### **Environment Variables**

Create `.env` file:

```env
# Google Gemini AI
GEMINI_API_KEY=your_gemini_api_key_here

# NASA APIs (optional - uses DEMO_KEY by default)
NASA_API_KEY=DEMO_KEY

# Server
NODE_ENV=development
PORT=5000
```

### **Get API Keys**

1. **Gemini API**: https://makersuite.google.com/app/apikey
2. **NASA API**: https://api.nasa.gov/ (optional)

---

## 🚀 **Running Locally**

```bash
# Development mode
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Visit: http://localhost:5000

---

## 🌐 **Deployment to Vercel**

### **Method 1: Via Dashboard (Recommended)**

1. Go to https://vercel.com/new
2. Import `Mrunalj007/Nasa-Space` repository
3. Configure:
   - **Framework**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist/client`
4. Add Environment Variable:
   - `GEMINI_API_KEY`: Your Gemini API key
   - `NODE_ENV`: `production`
5. Deploy!

### **Method 2: Via CLI**

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

---

## 📊 **Project Structure**

```
UrbanInsight/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── pages/          # Route pages
│   │   ├── hooks/          # Custom hooks
│   │   └── lib/            # Utilities
│   └── index.html
├── server/                 # Backend Express app
│   ├── services/
│   │   ├── gemini.ts       # AI service
│   │   ├── nasa.ts         # NASA data (simulated)
│   │   └── nasa-api.ts     # Real NASA API integration
│   ├── routes.ts           # API routes
│   └── index.ts            # Server entry
├── shared/                 # Shared types/schemas
└── vercel.json            # Vercel config
```

---

## 🔌 **API Endpoints**

### **NASA Data**
- `GET /api/nasa/metrics?location={city}&lat={lat}&lon={lon}`
- `GET /api/nasa/historical?location={city}&metric={aqi|ndvi|temp}&months={6}`

### **AI Services**
- `POST /api/ai/insights` - Generate AI recommendations
- `POST /api/ai/simulate` - Run what-if scenarios

### **Community**
- `GET /api/community/reports` - Get all reports
- `POST /api/community/reports` - Submit new report
- `POST /api/community/reports/:id/upvote` - Upvote report

### **Reports**
- `POST /api/reports/generate` - Generate PDF report

---

## 🎯 **Features Roadmap**

### **Phase 1** ✅ (Completed)
- [x] Core dashboard
- [x] AI integration
- [x] Community features
- [x] Vercel deployment

### **Phase 2** 🚧 (In Progress)
- [ ] Real NASA MODIS integration
- [ ] Database persistence (PostgreSQL)
- [ ] Advanced map layers
- [ ] User authentication

### **Phase 3** 📋 (Planned)
- [ ] Chatbot assistant
- [ ] 3D city visualization
- [ ] Multi-city comparison
- [ ] Historical trend analysis

---

## 🤝 **Contributing**

1. Fork the repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open Pull Request

---

## 📝 **License**

MIT License - feel free to use this project for your hackathon or personal use!

---

## 👥 **Team**

Built for NASA Space Apps Challenge 2024

- **Developer**: Mrunal Jadhav
- **GitHub**: [@Mrunalj007](https://github.com/Mrunalj007)

---

## 🙏 **Acknowledgments**

- NASA for Earth observation data
- Google for Gemini AI API
- OpenAQ for air quality data
- shadcn/ui for component library

---

## 📧 **Support**

For questions or issues, please open an issue on GitHub.

---

**Made with ❤️ for sustainable urban planning**
