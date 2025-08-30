document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });

    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70; // Account for fixed navbar
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', function() {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(15, 23, 42, 0.98)';
        navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.background = 'rgba(15, 23, 42, 0.95)';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll reveal animation
function revealOnScroll() {
    const reveals = document.querySelectorAll('.scroll-reveal');
    
    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

window.addEventListener('scroll', revealOnScroll);

// Add scroll-reveal class to elements that should animate
document.addEventListener('DOMContentLoaded', function() {
    const animateElements = document.querySelectorAll('.project-card, .skill-category, .about-content, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('scroll-reveal');
    });
    
    // Initial check for elements in view
    revealOnScroll();
});

// GitHub Repositories Fetcher
async function fetchGitHubRepositories() {
    const username = 'cezarpedroso';
    const apiUrl = `https://api.github.com/users/${username}/repos`;
    
    const loadingElement = document.getElementById('repositories-loading');
    const gridElement = document.getElementById('repositories-grid');
    const errorElement = document.getElementById('repositories-error');
    
    try {
        loadingElement.style.display = 'flex';
        errorElement.style.display = 'none';
        gridElement.innerHTML = '';
        
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error(`GitHub API error: ${response.status}`);
        }
        
        const repositories = await response.json();
        
        // Filter out forked repositories and sort by creation date (newest first)
        const originalRepos = repositories
            .filter(repo => !repo.fork)
            .sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
        
        loadingElement.style.display = 'none';
        
        if (originalRepos.length === 0) {
            gridElement.innerHTML = '<p class="no-repos">No public repositories found.</p>';
            return;
        }
        
        // Display repositories
        originalRepos.forEach(repo => {
            const repoCard = createRepositoryCard(repo);
            gridElement.appendChild(repoCard);
        });
        
    } catch (error) {
        console.error('Error fetching repositories:', error);
        loadingElement.style.display = 'none';
        errorElement.style.display = 'block';
        
        // Still show error message but make it more user-friendly
        if (error.message.includes('403')) {
            errorElement.innerHTML = `
                <i class="fas fa-exclamation-triangle"></i>
                <p>GitHub API rate limit reached. Please visit my <a href="https://github.com/${username}" target="_blank">GitHub profile</a> directly to view repositories.</p>
            `;
        }
    }
}

// Create repository card element
function createRepositoryCard(repo) {
    const card = document.createElement('div');
    card.className = 'repo-card scroll-reveal';
    
    // Format the date
    const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
    
    // Create language badge if language exists
    const languageBadge = repo.language 
        ? `<span class="repo-language">${repo.language}</span>` 
        : '';
    
    // Create description with fallback
    const description = repo.description 
        ? `<p class="repo-description">${escapeHtml(repo.description)}</p>`
        : '<p class="repo-description">No description available</p>';
    
    card.innerHTML = `
        <div class="repo-header">
            <i class="fab fa-github repo-icon"></i>
            <a href="${repo.html_url}" target="_blank" class="repo-name">${escapeHtml(repo.name)}</a>
        </div>
        ${description}
        <div class="repo-stats">
            <div class="repo-stat">
                <i class="fas fa-star"></i>
                <span>${repo.stargazers_count}</span>
            </div>
            <div class="repo-stat">
                <i class="fas fa-code-branch"></i>
                <span>${repo.forks_count}</span>
            </div>
            <div class="repo-stat">
                <i class="fas fa-clock"></i>
                <span>${updatedDate}</span>
            </div>
            ${languageBadge}
        </div>
    `;
    
    return card;
}

// Utility function to escape HTML
function escapeHtml(unsafe) {
    return unsafe
         .replace(/&/g, "&amp;")
         .replace(/</g, "&lt;")
         .replace(/>/g, "&gt;")
         .replace(/"/g, "&quot;")
         .replace(/'/g, "&#039;");
}

// Initialize GitHub repositories when the page loads
document.addEventListener('DOMContentLoaded', function() {
    // Add a small delay to ensure the section is visible
    setTimeout(fetchGitHubRepositories, 500);
});

// Intersection Observer for better scroll animations
if ('IntersectionObserver' in window) {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe elements when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const elementsToObserve = document.querySelectorAll('.scroll-reveal');
        elementsToObserve.forEach(el => observer.observe(el));
    });
}

// Active navigation link highlighting
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', updateActiveNavLink);

// Add active class styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Typing animation for hero title (optional enhancement)
function typeWriter(element, text, speed = 100) {
    let i = 0;
    element.innerHTML = '';
    
    function type() {
        if (i < text.length) {
            element.innerHTML += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Performance optimization: Throttle scroll events
function throttle(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply throttling to scroll events
const throttledScroll = throttle(() => {
    updateActiveNavLink();
    revealOnScroll();
}, 16); // ~60fps

window.removeEventListener('scroll', updateActiveNavLink);
window.removeEventListener('scroll', revealOnScroll);
window.addEventListener('scroll', throttledScroll);

// Add loading states and error handling for better UX
window.addEventListener('load', function() {
    document.body.classList.add('loaded');
});

// Handle potential errors gracefully
window.addEventListener('error', function(e) {
    console.error('JavaScript error:', e.error);
});

// Add CSS for loaded state
const loadedStyle = document.createElement('style');
loadedStyle.textContent = `
    body:not(.loaded) .scroll-reveal {
        opacity: 0;
        transform: translateY(50px);
    }
    
    body.loaded .scroll-reveal {
        transition: opacity 0.6s ease-out, transform 0.6s ease-out;
    }
`;
document.head.appendChild(loadedStyle);
