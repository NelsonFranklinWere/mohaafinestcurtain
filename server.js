const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// SEO: Base URL for canonical, OG image, sitemap (set in production)
const BASE_URL = process.env.BASE_URL || 'https://www.mohaafinestcurtains.co.ke';

// Shared data for all pages
const siteData = {
    phone: '0705155727',
    phoneIntl: '254705155727'
};

function renderPage(res, view, opts) {
    const urlPath = opts.canonicalPath || (view === 'index' ? '/' : `/${view}`);
    res.render(view, {
        ...opts,
        currentPage: opts.currentPage || (view === 'index' ? 'home' : view),
        phone: siteData.phone,
        phoneIntl: siteData.phoneIntl,
        baseUrl: BASE_URL,
        canonicalUrl: urlPath === '/' ? BASE_URL : `${BASE_URL}${urlPath}`,
        ogImage: `${BASE_URL}/images/logo.jpeg`
    });
}

// Set EJS as template engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ----- SEO: Sitemap (XML)
app.get('/sitemap.xml', (req, res) => {
    const lastmod = new Date().toISOString().split('T')[0];
    const pages = [
        { path: '', priority: '1.0', changefreq: 'weekly' },
        { path: '/collections', priority: '0.95', changefreq: 'weekly' },
        { path: '/services', priority: '0.95', changefreq: 'monthly' },
        { path: '/about', priority: '0.8', changefreq: 'monthly' },
        { path: '/blog', priority: '0.8', changefreq: 'weekly' },
        { path: '/how-it-works', priority: '0.8', changefreq: 'monthly' },
        { path: '/gallery', priority: '0.9', changefreq: 'weekly' },
        { path: '/contact', priority: '0.9', changefreq: 'monthly' }
    ];
    res.type('application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(p => `  <url>
    <loc>${BASE_URL}${p.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${p.changefreq}</changefreq>
    <priority>${p.priority}</priority>
  </url>`).join('\n')}
</urlset>`);
});

// ----- SEO: Robots.txt
app.get('/robots.txt', (req, res) => {
    res.type('text/plain');
    res.send(`User-agent: *
Allow: /

Sitemap: ${BASE_URL}/sitemap.xml
`);
});

// Routes
app.get('/', (req, res) => {
    renderPage(res, 'index', {
        title: 'Mohaa Finest Curtains | Trusted Curtain Experts — All Types, Custom Designs & Free Site Visits | Nairobi & Eastleigh',
        description: 'Kenya\'s trusted curtain experts. All types: sheer, blackout, luxury & custom designs. Free expert measurement & site visits. Professional installation. Visit Moyale Mall, Eastleigh or WhatsApp for a quote.',
        keywords: 'trusted curtain experts, curtain experts Nairobi, curtain experts Eastleigh, all types curtains, custom curtain designs, free site visit curtains, curtain measurement, professional curtain installation, best curtains Kenya, Mohaa Finest Curtains'
    });
});

app.get('/services', (req, res) => {
    renderPage(res, 'services', {
        title: 'Curtain Experts — All Types, Custom Designs, Free Measurement & Site Visits | Mohaa Finest Curtains',
        description: 'Expert curtain services: all types (sheer, blackout, luxury), custom designs, free measurement & site visits, professional installation. Trusted by homes and businesses across Kenya.',
        keywords: 'curtain experts, all types curtains, custom curtain designs, free curtain measurement, site visit curtains, professional curtain installation, curtain sales Nairobi, office hotel curtains, wholesale curtains'
    });
});

app.get('/gallery', (req, res) => {
    renderPage(res, 'gallery', {
        title: 'Curtain Gallery — Our Work & Custom Designs | Mohaa Finest Curtains',
        description: 'See our curtain installations: homes, offices, hotels. Good designs and custom designs by trusted curtain experts. Nairobi & Eastleigh.',
        keywords: 'curtain gallery, curtain installations, custom curtain designs, curtain portfolio, luxury curtains Nairobi, curtain showroom Eastleigh'
    });
});

app.get('/how-it-works', (req, res) => {
    renderPage(res, 'how-it-works', {
        title: 'How It Works — Free Site Visit, Measurement & Installation | Mohaa Finest Curtains',
        description: 'Simple process: contact our experts, free site visit & measurement, choose from all types & custom designs, professional installation. Trusted curtain service across Kenya.',
        keywords: 'how curtain service works, free site visit curtains, curtain measurement, curtain installation process, trusted curtain experts'
    });
});

app.get('/about', (req, res) => {
    renderPage(res, 'about', {
        title: 'About Us — Trusted Curtain Experts with All Types & Custom Designs | Mohaa Finest Curtains',
        description: 'Mohaa Finest Curtains: Eastleigh\'s trusted curtain experts. We offer all types of curtains, good designs, custom designs, free site visits & professional installation.',
        keywords: 'about Mohaa curtains, trusted curtain experts, curtain specialists Nairobi, curtain experts Eastleigh'
    });
});

app.get('/blog', (req, res) => {
    renderPage(res, 'blog', {
        title: 'Curtain Tips & Expert Advice — From Trusted Curtain Experts | Mohaa Finest Curtains',
        description: 'Expert curtain tips, ideas and advice from Kenya\'s trusted curtain experts. All types, good designs and custom design ideas for your home or business.',
        keywords: 'curtain tips, curtain expert advice, curtain ideas, curtain styles, curtain care, Mohaa curtain blog'
    });
});

app.get('/contact', (req, res) => {
    renderPage(res, 'contact', {
        title: 'Contact — Visit Showroom or Book Free Site Visit | Mohaa Finest Curtains',
        description: 'Contact trusted curtain experts. Visit our showroom at Moyale Mall, Eastleigh, or book a free site visit. WhatsApp, call or drop in. Nairobi & nationwide.',
        keywords: 'contact curtain experts, curtain showroom Eastleigh, book site visit curtains, Mohaa contact'
    });
});

app.get('/collections', (req, res) => {
    renderPage(res, 'collections', {
        title: 'Curtain Collections — All Types, Good Designs & Custom Options | Mohaa Finest Curtains',
        description: 'Explore our curtain collections: all types from sheer to blackout, good designs and custom design options. Trusted quality at Moyale Mall, Eastleigh.',
        keywords: 'curtain collections, all types curtains, curtain designs, luxury curtains, sheer blackout velvet, custom curtains Nairobi'
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
    const whatsappUrl = `https://wa.me/${siteData.phoneIntl}?text=${encodeURIComponent(whatsappMessage)}`;

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
        phone: siteData.phone,
        phoneIntl: siteData.phoneIntl,
        baseUrl: BASE_URL,
        canonicalUrl: BASE_URL + req.path
    });
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).render('500', {
        title: 'Server Error - Mohaa Finest Curtains',
        currentPage: '',
        error: process.env.NODE_ENV === 'development' ? err : {},
        phone: siteData.phone,
        phoneIntl: siteData.phoneIntl,
        baseUrl: BASE_URL,
        canonicalUrl: BASE_URL
    });
});

// Start server
app.listen(PORT, () => {
    console.log(`🚀 Mohaa Finest Curtains website running on http://localhost:${PORT}`);
    console.log(`📱 Mobile-first design with conversion focus`);
    console.log(`💬 WhatsApp integration ready`);
});

module.exports = app;
