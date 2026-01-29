const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Routes
app.get('/', (req, res) => {
    res.render('index', {
        title: 'Mohaa Finest Curtains - Eastleigh\'s Trusted Curtain Experts',
        description: 'Premium curtains, expert measurement & professional installation — serving Eastleigh and Nairobi from Moyale Mall.',
        currentPage: 'home',
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

app.get('/services', (req, res) => {
    res.render('services', {
        title: 'Services - Mohaa Finest Curtains',
        description: 'Curtain sales, free measurement, professional installation, custom curtains, and wholesale services.',
        currentPage: 'services',
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

app.get('/gallery', (req, res) => {
    res.render('gallery', {
        title: 'Gallery - Mohaa Finest Curtains',
        description: 'View our work - beautiful curtain installations for homes, offices, and commercial spaces.',
        currentPage: 'gallery',
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

app.get('/how-it-works', (req, res) => {
    res.render('how-it-works', {
        title: 'How It Works - Mohaa Finest Curtains',
        description: 'Simple 4-step process: Contact us, free measurement, choose design, professional installation.',
        currentPage: 'how-it-works',
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Us - Mohaa Finest Curtains',
        description: 'Eastleigh\'s trusted curtain experts — from measurement to installation since day one.',
        currentPage: 'about',
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

app.get('/blog', (req, res) => {
    res.render('blog', {
        title: 'Curtain Tips, Ideas & Expert Advice - Mohaa Finest Curtains',
        description: 'Learn how to choose the right curtains, fabrics, and styles for your home or business — straight from Eastleigh\'s curtain experts.',
        currentPage: 'blog',
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact - Mohaa Finest Curtains',
        description: 'Get in touch with us. Located at Moyale Mall, Eastleigh. WhatsApp, call, or visit us today.',
        currentPage: 'contact',
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

app.get('/collections', (req, res) => {
    res.render('collections', {
        title: 'Collections - Mohaa Finest Curtains',
        description: 'Explore our premium curtain collections. Wide range of styles, fabrics, and prices to suit every need.',
        currentPage: 'collections',
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

// API endpoint for contact form (future feature)
app.post('/api/contact', (req, res) => {
    const { name, phone, message, service } = req.body;

    // For now, just log the contact (in production, you'd save to database or send email)
    console.log('New contact inquiry:', {
        name,
        phone,
        message,
        service,
        timestamp: new Date()
    });

    // Redirect to WhatsApp with pre-filled message
    const whatsappMessage = `Hi Mohaa Finest Curtains, I need help with ${service}. Name: ${name}, Phone: ${phone}, Message: ${message}`;
    const whatsappUrl = `https://wa.me/254700000000?text=${encodeURIComponent(whatsappMessage)}`;

    res.json({
        success: true,
        whatsappUrl: whatsappUrl,
        message: 'Redirecting to WhatsApp...'
    });
});

// 404 handler
app.use((req, res) => {
    res.status(404).render('404', {
        title: 'Page Not Found - Mohaa Finest Curtains',
        currentPage: '',
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', {
        title: 'Server Error - Mohaa Finest Curtains',
        currentPage: '',
        error: process.env.NODE_ENV === 'development' ? err : {},
        phone: '0705155727',
        phoneIntl: '+254705155727'
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Mohaa Finest Curtains website running on http://localhost:${PORT}`);
    console.log(`📱 Mobile-first design with conversion focus`);
    console.log(`💬 WhatsApp integration ready`);
});

module.exports = app;
