// Blog filtering functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryFilters = document.querySelectorAll('.category-filter');
    const blogCards = document.querySelectorAll('.blog-card');
    const featuredCards = document.querySelectorAll('.featured-card');

    // Filter functionality
    categoryFilters.forEach(filter => {
        filter.addEventListener('click', function() {
            const category = this.getAttribute('data-category');

            // Update active filter button
            categoryFilters.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            // Filter blog cards
            blogCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });

            // Filter featured cards
            featuredCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (category === 'all' || cardCategory === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease-out';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Smooth scrolling for read more links
    document.querySelectorAll('.read-more-link, .read-more-btn').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            // For now, just show an alert - in production, this would link to individual blog posts
            alert('Blog post detail page coming soon! Contact us for personalized advice instead.');
        });
    });

    // Add fade-in animation for filtered items
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeInUp {
            from {
                opacity: 0;
                transform: translateY(20px);
            }
            to {
                opacity: 1;
                transform: translateY(0);
            }
        }
    `;
    document.head.appendChild(style);
});
