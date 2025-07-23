// GitHub API configuration
const GITHUB_USERNAME = 'cezarpedroso';
const GITHUB_API_URL = `https://api.github.com/users/${GITHUB_USERNAME}/repos`;

// DOM Elements
const cursor = document.querySelector('.cursor');
const cursorFollower = document.querySelector('.cursor-follower');
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');

// Custom Cursor
let mouseX = 0;
let mouseY = 0;
let cursorX = 0;
let cursorY = 0;

// Update mouse position
document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

// Animate cursor
function animateCursor() {
    // Smooth cursor movement
    cursorX += (mouseX - cursorX) * 0.1;
    cursorY += (mouseY - cursorY) * 0.1;
    
    if (cursor) {
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
    }
    
    requestAnimationFrame(animateCursor);
}

// Start cursor animation if not on mobile
if (window.innerWidth > 768) {
    animateCursor();
}

// Cursor hover effects
document.addEventListener('mouseover', (e) => {
    if (e.target.closest('a, button, .btn, .project-card, .repo-card, .contact-item')) {
        cursor?.classList.add('cursor-hover');
    }
});

document.addEventListener('mouseout', (e) => {
    if (e.target.closest('a, button, .btn, .project-card, .repo-card, .contact-item')) {
        cursor?.classList.remove('cursor-hover');
    }
});

// Mobile Navigation
hamburger?.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu?.classList.toggle('active');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger?.classList.remove('active');
        navMenu?.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Active navigation link on scroll
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionBottom = sectionTop + section.offsetHeight;
        const sectionId = section.getAttribute('id');
        const navLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
        
        if (scrollPos >= sectionTop && scrollPos <= sectionBottom) {
            navLinks.forEach(link => link.classList.remove('active'));
            navLink?.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Project filtering
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.getAttribute('data-filter');
        
        // Update active filter button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        // Filter project cards
        projectCards.forEach(card => {
            const category = card.getAttribute('data-category');
            
            if (filter === 'all' || category === filter) {
                card.style.display = 'block';
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, 50);
            } else {
                card.style.opacity = '0';
                card.style.transform = 'translateY(20px)';
                setTimeout(() => {
                    card.style.display = 'none';
                }, 300);
            }
        });
    });
});

// GitHub Repositories Fetching
async function fetchGitHubRepos() {
    const reposContainer = document.getElementById('github-repos');
    
    try {
        // Show loading state
        reposContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Loading repositories...</p>
            </div>
        `;
        
        const response = await fetch(GITHUB_API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const repos = await response.json();
        
        // Filter out forked repositories and sort by updated date
        const filteredRepos = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 6); // Show only the 6 most recent repos
        
        if (filteredRepos.length === 0) {
            reposContainer.innerHTML = `
                <div class="no-repos">
                    <p>No repositories found.</p>
                </div>
            `;
            return;
        }
        
        // Generate repo cards
        const repoCards = filteredRepos.map(repo => createRepoCard(repo)).join('');
        reposContainer.innerHTML = repoCards;
        
        // Add animation to repo cards
        const cards = reposContainer.querySelectorAll('.repo-card');
        cards.forEach((card, index) => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            setTimeout(() => {
                card.style.transition = 'all 0.5s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 100);
        });
        
    } catch (error) {
        console.error('Error fetching GitHub repositories:', error);
        reposContainer.innerHTML = `
            <div class="error-state">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Unable to load repositories. Please check your internet connection or try again later.</p>
                <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" class="btn btn-outline">
                    <i class="fab fa-github"></i>
                    View on GitHub
                </a>
            </div>
        `;
    }
}

// Create repository card HTML
function createRepoCard(repo) {
    const languageColor = getLanguageColor(repo.language);
    const description = repo.description || 'No description available';
    const stars = repo.stargazers_count || 0;
    const forks = repo.forks_count || 0;
    const updatedDate = new Date(repo.updated_at).toLocaleDateString();
    
    return `
        <div class="repo-card">
            <div class="repo-header">
                <i class="fab fa-github"></i>
                <a href="${repo.html_url}" target="_blank" class="repo-name">${repo.name}</a>
            </div>
            <p class="repo-description">${description}</p>
            <div class="repo-stats">
                ${repo.language ? `
                    <div class="repo-language">
                        <span class="language-color" style="background-color: ${languageColor}"></span>
                        ${repo.language}
                    </div>
                ` : ''}
                <div class="repo-stars">
                    <i class="fas fa-star"></i>
                    ${stars}
                </div>
                <div class="repo-forks">
                    <i class="fas fa-code-branch"></i>
                    ${forks}
                </div>
                <div class="repo-updated">
                    Updated ${updatedDate}
                </div>
            </div>
        </div>
    `;
}

// Get language color for GitHub languages
function getLanguageColor(language) {
    const colors = {
        'JavaScript': '#f1e05a',
        'Python': '#3572A5',
        'Java': '#b07219',
        'C#': '#239120',
        'C++': '#f34b7d',
        'C': '#555555',
        'PHP': '#4F5D95',
        'Ruby': '#701516',
        'Go': '#00ADD8',
        'Rust': '#dea584',
        'TypeScript': '#2b7489',
        'HTML': '#e34c26',
        'CSS': '#1572B6',
        'Shell': '#89e051',
        'PowerShell': '#012456',
        'Dockerfile': '#384d54'
    };
    
    return colors[language] || '#586069';
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.timeline-item, .project-card, .contact-item, .skill-category');
    animateElements.forEach(el => observer.observe(el));
});

// Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar?.classList.add('scrolled');
    } else {
        navbar?.classList.remove('scrolled');
    }
});

// Scroll to top functionality
function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Add scroll to top button if needed
function createScrollToTopButton() {
    const scrollBtn = document.createElement('button');
    scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollBtn.className = 'scroll-to-top';
    scrollBtn.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        background: var(--gradient-primary);
        border: none;
        border-radius: 50%;
        color: white;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: var(--shadow-light);
    `;
    
    scrollBtn.addEventListener('click', scrollToTop);
    document.body.appendChild(scrollBtn);
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            scrollBtn.style.opacity = '1';
            scrollBtn.style.visibility = 'visible';
        } else {
            scrollBtn.style.opacity = '0';
            scrollBtn.style.visibility = 'hidden';
        }
    });
}

// Initialize scroll to top button
createScrollToTopButton();

// Form submission handling (if contact form is added later)
function handleFormSubmission(formElement) {
    formElement.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(formElement);
        const data = Object.fromEntries(formData);
        
        // Here you would typically send the data to a server
        console.log('Form submitted:', data);
        
        // Show success message
        showNotification('Message sent successfully!', 'success');
        
        // Reset form
        formElement.reset();
    });
}

// Notification system
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 1rem 2rem;
        background: var(--card-bg);
        border: 1px solid var(--accent-color);
        border-radius: 10px;
        color: var(--text-primary);
        z-index: 10000;
        opacity: 0;
        transform: translateX(100%);
        transition: all 0.3s ease;
    `;
    
    notification.textContent = message;
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.opacity = '1';
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after delay
    setTimeout(() => {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 5000);
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Fetch GitHub repositories
    fetchGitHubRepos();
    
    // Initialize active nav link
    updateActiveNavLink();
    
    // Add loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', () => {
            img.style.opacity = '1';
        });
    });
    
    // Add typewriter effect to hero title (optional enhancement)
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle && window.innerWidth > 768) {
        // Typewriter effect could be added here
    }
    
    console.log('Portfolio website initialized successfully!');
});

// Error handling
window.addEventListener('error', (e) => {
    console.error('JavaScript error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', () => {
        const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
        console.log(`Page loaded in ${loadTime}ms`);
    });
}

// Export functions for potential testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        fetchGitHubRepos,
        createRepoCard,
        getLanguageColor,
        showNotification
    };
}
