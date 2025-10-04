const typedTextElement = document.getElementById('typed-text');
const textToType = 'Cybersecurity & Software Development';
let charIndex = 0;

function typeText() {
    if (charIndex < textToType.length) {
        typedTextElement.textContent += textToType.charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 80);
    }
}

setTimeout(typeText, 500);

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});


const resumeBtn = document.querySelector('.resume-btn');
resumeBtn.addEventListener('click', function(e) {
    this.style.transform = 'scale(0.95)';
    setTimeout(() => {
        this.style.transform = 'translateY(-3px)';
    }, 100);
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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
