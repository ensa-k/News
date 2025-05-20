// Sample news data
const newsData = [
    {
        id: 1,
        title: 'ENSAK : Le club mécatronique au service des défis d’aujourd’hui et des solutions de demain',
        excerpt: 'Le club mécatronique au service des défis d’aujourd’hui et des solutions de demain.',
        content: 'À l’heure où les technologies évoluent à grande vitesse, la mécatronique se positionne comme un levier incontournable pour relever les défis du monde moderne. C’est cette vision que l’ENSA Kénitra a portée haut lors de la 5éme Journée Nationale de la Mécatronique, placée sous le signe de l’innovation, du partage et de l’ambition.',
        category: 'events',
        image: 'https://www.uit.ac.ma/wp-content/uploads/2023/06/11-600x400.webp',
        date: 'Mai 14, 2025',
        author: 'lopinion.ma',
		URL: 'https://www.lopinion.ma/ENSAK-Le-club-mecatronique-au-service-des-defis-d-aujourd-hui-et-des-solutions-de-demain_a67506.html'
    },
  ];

// DOM Elements
const newsContainer = document.getElementById('news-container');
const filterButtons = document.querySelectorAll('.filter-btn');
const searchInput = document.getElementById('search-news');
const searchBtn = document.getElementById('search-btn');
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const newsletterForm = document.getElementById('newsletter-form');

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    // Display all news initially
    displayNews(newsData);
    
    // Setup event listeners
    setupEventListeners();
    
    // Add back to top button
    createBackToTopButton();
});

// Display news function
function displayNews(news) {
    // Clear the container first
    newsContainer.innerHTML = '';
    
    if (news.length === 0) {
        // Show no results message
        newsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-search"></i>
                <h3>Aucun résultat trouvé</h3>
                <p>Essayez de modifier votre recherche ou votre filtre pour trouver ce que vous cherchez.</p>
            </div>
        `;
        return;
    }
    
    // Loop through news and create cards
    news.forEach((item, index) => {
        // Add delay for animation
        const delay = index * 0.1;
        
        const newsCard = document.createElement('div');
        newsCard.className = 'news-card';
        newsCard.style.animationDelay = `${delay}s`;
        
        newsCard.innerHTML = `
            <div class="news-image">
                <img src="${item.image}" alt="${item.title}">
            </div>
            <div class="news-content">
                <span class="news-category ${item.category}">${capitalizeFirstLetter(item.category)}</span>
                <h3 class="news-title">${item.title}</h3>
                <p class="news-excerpt">${item.excerpt}</p>
                <div class="news-meta">
                    <span>${item.date}</span>
                    <a href="#" class="read-more" data-id="${item.id}">Lire la suite <i class="fas fa-arrow-right"></i></a>
                </div>
            </div>
        `;
        
        newsContainer.appendChild(newsCard);
        
        // Add click event to read more button
        const readMoreBtn = newsCard.querySelector('.read-more');
        readMoreBtn.addEventListener('click', (e) => {
            e.preventDefault();
            openNewsModal(item);
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Filter buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            button.classList.add('active');
            
            const category = button.getAttribute('data-category');
            filterNews(category);
        });
    });
    
    // Search functionality
    searchBtn.addEventListener('click', () => {
        searchNews(searchInput.value);
    });
    
    searchInput.addEventListener('keyup', (e) => {
        if (e.key === 'Enter') {
            searchNews(searchInput.value);
        }
    });
    
    // Mobile menu toggle
    mobileMenuBtn.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.mobile-menu-btn') && !e.target.closest('.nav-links')) {
            navLinks.classList.remove('active');
        }
    });
    
    // Newsletter form submission
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const emailInput = newsletterForm.querySelector('input[type="email"]');
        
        if (emailInput.value.trim() !== '') {
            // Show success message (in real app, would send to server)
            alert('Thank you for subscribing to our newsletter!');
            emailInput.value = '';
        }
    });
}

// Filter news by category
function filterNews(category) {
    if (category === 'all') {
        displayNews(newsData);
    } else {
        const filteredNews = newsData.filter(item => item.category === category);
        displayNews(filteredNews);
    }
}

// Search news
function searchNews(query) {
    query = query.toLowerCase().trim();
    
    if (query === '') {
        displayNews(newsData);
        return;
    }
    
    const searchResults = newsData.filter(item => 
        item.title.toLowerCase().includes(query) || 
        item.excerpt.toLowerCase().includes(query) || 
        item.content.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query)
    );
    
    displayNews(searchResults);
}

// Open news modal
function openNewsModal(newsItem) {
    // Create modal element
    const modal = document.createElement('div');
    modal.className = 'modal';
    
    modal.innerHTML = `
        <div class="modal-content">
            <span class="modal-close"><i class="fas fa-times"></i></span>
            <div class="modal-image">
                <img src="${newsItem.image}" alt="${newsItem.title}">
            </div>
            <span class="modal-category news-category ${newsItem.category}">${capitalizeFirstLetter(newsItem.category)}</span>
            <h2 class="modal-title">${newsItem.title}</h2>
            <div class="modal-meta">
                <span><i class="far fa-calendar"></i> ${newsItem.date}</span>
                <span><i class="far fa-user"></i> ${newsItem.author}</span>
            </div>
            <p>${newsItem.content}</p>
			<p>
  <a href="${newsItem.URL}" target="_blank" rel="noopener noreferrer">
    Lire la suite
  </a>
</p>
            <div class="modal-share">
                <h4>Share this article</h4>
                <div class="share-buttons">
                    <a href="#" class="share-btn facebook"><i class="fab fa-facebook-f"></i></a>
                    <a href="#" class="share-btn twitter"><i class="fab fa-twitter"></i></a>
                    <a href="#" class="share-btn linkedin"><i class="fab fa-linkedin-in"></i></a>
                    <a href="#" class="share-btn email"><i class="fas fa-envelope"></i></a>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Prevent body scrolling when modal is open
    document.body.style.overflow = 'hidden';
    
    // Show modal with animation
    setTimeout(() => {
        modal.classList.add('active');
    }, 10);
    
    // Close modal when clicking on close button or outside the modal
    const closeBtn = modal.querySelector('.modal-close');
    closeBtn.addEventListener('click', () => closeModal(modal));
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(modal);
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeModal(modal);
        }
    });
}

// Close modal function
function closeModal(modal) {
    modal.classList.remove('active');
    
    // Remove modal after animation completes
    setTimeout(() => {
        document.body.removeChild(modal);
        document.body.style.overflow = 'auto';
    }, 300);
}

// Create back to top button
function createBackToTopButton() {
    const backToTopBtn = document.createElement('div');
    backToTopBtn.className = 'back-to-top';
    backToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    
    document.body.appendChild(backToTopBtn);
    
    // Show/hide button based on scroll position
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    });
    
    // Scroll to top when clicked
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

// Helper function to capitalize first letter
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}