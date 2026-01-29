# Mohaa Finest Curtains - Eastleigh's Trusted Curtain Experts

A high-converting, mobile-first business website for Mohaa Finest Curtains, built with Node.js and Express.

## 🚀 Features

- **Mobile-First Design**: Responsive design optimized for all devices
- **Conversion-Focused**: WhatsApp integration and clear call-to-actions throughout
- **Brand Colors**: Mandatory teal (#0F6F6D), gold (#E3A62B), and dark contrast (#0B2F3A) colors
- **SEO Optimized**: Proper meta tags, alt texts, and structured content
- **Fast Loading**: Optimized images and efficient code structure

## 🛠️ Technology Stack

- **Backend**: Node.js with Express.js
- **Frontend**: EJS templates, CSS3, Vanilla JavaScript
- **Deployment**: Ready for Heroku, DigitalOcean, or any Node.js hosting

## 📁 Project Structure

```
mohaa-finest-curtains/
├── server.js              # Express server
├── package.json           # Dependencies and scripts
├── views/                 # EJS templates
│   ├── layout.ejs        # Main layout template
│   ├── index.ejs         # Home page
│   ├── services.ejs      # Services page
│   ├── gallery.ejs       # Gallery page
│   ├── how-it-works.ejs  # Process page
│   ├── about.ejs         # About us page
│   ├── contact.ejs       # Contact page
│   ├── 404.ejs           # 404 error page
│   └── 500.ejs           # 500 error page
├── public/               # Static assets
│   ├── css/
│   │   └── styles.css    # Main stylesheet
│   ├── js/
│   │   └── script.js     # Client-side JavaScript
│   └── images/           # Images and logo
└── README.md             # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository** (if applicable) or navigate to the project directory

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm start
   ```

4. **Open your browser and visit:**
   ```
   http://localhost:3000
   ```

### Development

For development with auto-restart:
```bash
npm run dev
```

## 📱 Pages Overview

### 🏠 Home Page
- Hero carousel with brand messaging
- Trust signals and problem/solution sections
- Services overview and gallery preview
- Multiple conversion points

### 🛠️ Services Page
- Detailed service descriptions
- Curtain sales, measurements, installations
- Custom and commercial solutions
- Wholesale information

### 🖼️ Gallery Page
- Categorized curtain showcase
- Before/after images
- WhatsApp CTAs on each image

### 📋 How It Works
- 4-step process explanation
- Timeline and service areas
- FAQ section

### 👥 About Us
- Company story and values
- Team information
- Trust indicators

### 📞 Contact Page
- Multiple contact methods
- Google Maps integration
- Business hours and location

## 🎨 Brand Implementation

### Colors (Mandatory)
- **Primary Teal**: `#0F6F6D`
- **Accent Gold**: `#E3A62B`
- **Dark Contrast**: `#0B2F3A`
- **White**: `#FFFFFF`
- **Light Grey**: `#F4F6F7`

### Buttons
- **Primary CTA**: Gold background, white text
- **Secondary CTA**: Teal outline

## 📈 Conversion Optimization

- **WhatsApp Integration**: Pre-filled messages for all services
- **Sticky WhatsApp Button**: Always accessible
- **Multiple Contact Points**: Phone, WhatsApp, showroom visits
- **Clear Value Propositions**: Problem/solution focused
- **Trust Signals**: Location, testimonials, guarantees

## 🌐 Deployment

### Environment Variables

Create a `.env` file for production:

```env
PORT=3000
NODE_ENV=production
```

### Deploy to Heroku

1. **Install Heroku CLI**
2. **Login to Heroku:**
   ```bash
   heroku login
   ```
3. **Create app:**
   ```bash
   heroku create mohaa-finest-curtains
   ```
4. **Deploy:**
   ```bash
   git push heroku main
   ```

### Deploy to DigitalOcean/VPS

1. **Transfer files to server**
2. **Install dependencies:**
   ```bash
   npm install --production
   ```
3. **Start with PM2:**
   ```bash
   npm install -g pm2
   pm2 start server.js --name "mohaa-curtains"
   pm2 startup
   pm2 save
   ```

## 📞 Contact Information

For the website owner:
- **Business**: Mohaa Finest Curtains
- **Location**: Moyale Mall, Eastleigh, Nairobi
- **Phone**: +254 700 000 000
- **WhatsApp**: +254 700 000 000

## 🔧 Maintenance

### Updating Content
- Edit EJS templates in `views/` directory
- Modify styles in `public/css/styles.css`
- Update images in `public/images/`

### Adding New Pages
1. Create new EJS template in `views/`
2. Add route in `server.js`
3. Update navigation in `layout.ejs`

### Performance Monitoring
- Monitor WhatsApp inquiry conversion rates
- Track user engagement with Google Analytics
- Optimize images and loading times

## 📊 Success Metrics

The website will be successful when:
- ✅ Customers mention "I saw you online"
- ✅ WhatsApp inquiry volume increases
- ✅ Walk-in traffic references the website
- ✅ Conversion rates meet or exceed targets

## 🤝 Contributing

This website was built with conversion optimization and local business needs in mind. For modifications, ensure all changes maintain:
- Mobile-first responsive design
- Brand color consistency
- WhatsApp integration functionality
- Clear call-to-action placement

---

**Built with ❤️ for Mohaa Finest Curtains - Eastleigh's curtain experts since day one.**
