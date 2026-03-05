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
    // lastmod is generated from today's date, so search engines see it update automatically (no manual change needed)
    const lastmod = new Date().toISOString().split('T')[0];
    const pages = [
        { path: '', priority: '1.0', changefreq: 'weekly' },
        { path: '/faq', priority: '0.95', changefreq: 'monthly' },
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

// ----- Nairobi-based SEO: page meta (titles, descriptions, keywords)
// Target: "curtains Nairobi", "curtain shop Eastleigh", "best curtains Nairobi Kenya", local intent

// Routes
app.get('/', (req, res) => {
    renderPage(res, 'index', {
        title: 'Quality Curtains Nairobi | Eastleigh Curtain Dealer — Mohaa Finest Curtains | Free Measurement',
        description: 'Mohaa Finest Curtains is the curtain dealer in Eastleigh, Nairobi — quality curtains, free measurement & professional installation. Sheer, blackout & custom. Visit Moyale Mall or WhatsApp.',
        keywords: 'curtains Nairobi, curtain dealer Eastleigh, quality curtains Nairobi, curtain shop Eastleigh, best curtains Nairobi Kenya, Mohaa Finest Curtains, curtain measurement Nairobi, curtain installation Nairobi, Moyale Mall curtains'
    });
});

app.get('/services', (req, res) => {
    renderPage(res, 'services', {
        title: 'Curtain Services Nairobi — Sales, Measurement & Installation | Mohaa Finest Curtains Eastleigh',
        description: 'Curtain services in Nairobi & Eastleigh: sheer, blackout & luxury curtains, free measurement & site visits, professional installation. Trusted by homes and businesses across Nairobi and Kenya.',
        keywords: 'curtain services Nairobi, curtain measurement Nairobi, curtain installation Nairobi, curtain sales Eastleigh, office curtains Nairobi, hotel curtains Kenya, wholesale curtains Nairobi, free curtain measurement Eastleigh'
    });
});

app.get('/gallery', (req, res) => {
    renderPage(res, 'gallery', {
        title: 'Curtain Gallery Nairobi — Our Work & Installations | Mohaa Finest Curtains Eastleigh',
        description: 'See curtain installations by Nairobi\'s trusted experts. Homes, offices & hotels. Custom designs and quality work from Mohaa Finest Curtains, Eastleigh.',
        keywords: 'curtain gallery Nairobi, curtain installations Nairobi, curtain portfolio Eastleigh, luxury curtains Nairobi, curtain showroom Eastleigh, curtain designs Kenya'
    });
});

app.get('/how-it-works', (req, res) => {
    renderPage(res, 'how-it-works', {
        title: 'How It Works — Free Measurement & Curtain Installation Nairobi | Mohaa Finest Curtains',
        description: 'How we deliver curtains in Nairobi: contact us, free site visit & measurement, choose designs, professional installation. Trusted process from Eastleigh to all Nairobi.',
        keywords: 'how curtain service works Nairobi, free curtain measurement Eastleigh, curtain installation process Nairobi, curtain order process Kenya'
    });
});

app.get('/about', (req, res) => {
    renderPage(res, 'about', {
        title: 'About Mohaa Finest Curtains — Eastleigh & Nairobi\'s Curtain Dealer | Quality Curtains',
        description: 'Mohaa Finest Curtains is the curtain dealer in Eastleigh, Nairobi, known for quality curtains, free measurement and professional installation. Think Curtains. Think Mohaa.',
        keywords: 'about Mohaa curtains, curtain dealer Eastleigh, curtain dealer Nairobi, quality curtains Nairobi, Mohaa Finest Curtains Kenya'
    });
});

app.get('/blog', (req, res) => {
    renderPage(res, 'blog', {
        title: 'Curtain Tips & Ideas Nairobi — Expert Advice | Mohaa Finest Curtains',
        description: 'Curtain tips, ideas and expert advice from Nairobi\'s trusted curtain experts. Styles, care and design ideas for your home or business in Kenya.',
        keywords: 'curtain tips Nairobi, curtain ideas Kenya, curtain styles Eastleigh, curtain care, curtain expert advice Nairobi, Mohaa curtain blog'
    });
});

app.get('/contact', (req, res) => {
    renderPage(res, 'contact', {
        title: 'Contact — Curtain Showroom Eastleigh, Nairobi | Mohaa Finest Curtains',
        description: 'Visit our curtain showroom at Moyale Mall, Eastleigh, Nairobi. Book a free measurement, WhatsApp or call. Serving Nairobi and Kenya.',
        keywords: 'contact Mohaa curtains, curtain showroom Eastleigh Nairobi, Moyale Mall curtains, book curtain measurement Nairobi, WhatsApp curtains Kenya'
    });
});

app.get('/collections', (req, res) => {
    renderPage(res, 'collections', {
        title: 'Quality Curtain Collections Nairobi — Sheer, Blackout & Custom | Mohaa Finest Curtains Eastleigh',
        description: 'Quality curtain collections at Moyale Mall, Eastleigh: sheer, blackout, luxury & custom. Nairobi\'s curtain dealer for quality fabrics and styles.',
        keywords: 'quality curtains Nairobi, curtain collections Eastleigh, sheer blackout curtains Nairobi, custom curtains Kenya, Mohaa Finest Curtains'
    });
});

app.get('/faq', (req, res) => {
    renderPage(res, 'faq', {
        title: 'FAQ — Curtains Nairobi, Eastleigh | Quality Curtains & Installation | Mohaa Finest Curtains',
        description: 'Frequently asked questions about quality curtains, measurement, installation and pricing. Mohaa Finest Curtains — the curtain dealer in Eastleigh, Nairobi.',
        keywords: 'curtains Nairobi FAQ, curtain shop Eastleigh, quality curtains Kenya, curtain installation Nairobi, Mohaa Finest Curtains'
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
