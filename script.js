// Shopping Cart Functionality
let cart = [];
let cartCount = 0;

// Add to Cart Function
function addToCart(productName, price) {
    cart.push({ name: productName, price: price });
    cartCount++;
    updateCartDisplay();
    showNotification(`${productName} added to bag!`);
}

// Update Cart Display
function updateCartDisplay() {
    const cartCountElement = document.querySelector('.cart-count');
    cartCountElement.textContent = cartCount;
    
    // Animate cart icon
    const cartIcon = document.querySelector('.cart-icon');
    cartIcon.style.transform = 'scale(1.2)';
    setTimeout(() => {
        cartIcon.style.transform = 'scale(1)';
    }, 200);
}

// Show Notification
function showNotification(message) {
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        background: #c9a55c;
        color: #0a0a0a;
        padding: 1rem 2rem;
        border-radius: 8px;
        font-weight: 600;
        z-index: 2000;
        animation: slideIn 0.3s ease forwards;
        box-shadow: 0 10px 30px rgba(0,0,0,0.2);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 2000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Language Switcher
const languageSelect = document.getElementById('language');
if (languageSelect) {
    languageSelect.addEventListener('change', function() {
        const selectedLang = this.value;
        changeLanguage(selectedLang);
    });
}

// Language translations
const translations = {
    en: {
        home: 'Home',
        collection: 'Collection',
        about: 'About',
        contact: 'Contact',
        shopNow: 'Shop Now',
        discoverMore: 'Discover More',
        addToBag: 'Add to Bag',
        bestSeller: 'Best Seller',
        new: 'New'
    },
    ar: {
        home: 'الرئيسية',
        collection: 'المجموعة',
        about: 'عن العطر',
        contact: 'اتصل بنا',
        shopNow: 'تسوق الآن',
        discoverMore: 'اكتشف المزيد',
        addToBag: 'أضف إلى الحقيبة',
        bestSeller: 'الأكثر مبيعاً',
        new: 'جديد'
    },
    fr: {
        home: 'Accueil',
        collection: 'Collection',
        about: 'À propos',
        contact: 'Contact',
        shopNow: 'Acheter',
        discoverMore: 'Découvrir',
        addToBag: 'Ajouter au panier',
        bestSeller: 'Meilleure vente',
        new: 'Nouveau'
    },
    es: {
        home: 'Inicio',
        collection: 'Colección',
        about: 'Acerca de',
        contact: 'Contacto',
        shopNow: 'Comprar',
        discoverMore: 'Descubrir más',
        addToBag: 'Añadir a la bolsa',
        bestSeller: 'Más vendido',
        new: 'Nuevo'
    }
};

function changeLanguage(lang) {
    // Set text direction for Arabic
    if (lang === 'ar') {
        document.documentElement.dir = 'rtl';
        document.documentElement.lang = 'ar';
    } else {
        document.documentElement.dir = 'ltr';
        document.documentElement.lang = lang;
    }
    
    // Here you would implement full translation logic
    console.log(`Language changed to ${lang}`);
}

// Smooth Scrolling
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(10, 10, 10, 0.98)';
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.3)';
    } else {
        navbar.style.background = 'rgba(10, 10, 10, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Contact Form Submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const formData = new FormData(this);
        
        // Show success message
        showNotification('Message sent successfully! We will contact you soon.');
        
        // Reset form
        this.reset();
    });
}

// Newsletter Form Submission
const newsletterForm = document.querySelector('.newsletter-form');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        showNotification('Thank you for subscribing!');
        this.reset();
    });
}

// Intersection Observer for Animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.product-card, .feature-item, .note-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});

// Product Image Hover Effect
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const img = this.querySelector('.product-image img');
        img.style.transform = 'scale(1.1) rotate(2deg)';
    });
    
    card.addEventListener('mouseleave', function() {
        const img = this.querySelector('.product-image img');
        img.style.transform = 'scale(1) rotate(0)';
    });
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sauvage Store Loaded Successfully');
    
    // Add loading animation
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function() {
    const heroImage = document.querySelector('.hero-image');
    if (heroImage) {
        const scrolled = window.scrollY;
        heroImage.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// Add to wishlist functionality (optional feature)
function addToWishlist(productName) {
    showNotification(`${productName} added to wishlist!`);
}

// Quick view modal (optional feature)
function quickView(productId) {
    console.log('Quick view for product:', productId);
    // Implement modal logic here
}

// Share functionality
function shareProduct(productName, url) {
    if (navigator.share) {
        navigator.share({
            title: productName,
            text: `Check out ${productName} from Sauvage Collection`,
            url: url
        });
    } else {
        showNotification('Link copied to clipboard!');
    }
}

console.log('🌟 SAUVAGE by DIOR - Official Store');
console.log('Worldwide Shipping Available 🌍');
