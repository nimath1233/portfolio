/* ============================================================
   R.N.T Jayawardana Portfolio — JavaScript
   ============================================================ */

'use strict';

// ===== LOADER =====
window.addEventListener('load', () => {
  const loader = document.getElementById('loader');
  setTimeout(() => {
    loader.classList.add('hidden');
    document.body.style.overflow = '';
    // Trigger hero animations after loader
    initHeroAnimations();
  }, 2000);
});

// ===== THEME SWITCHER (DARK/LIGHT MODE) =====
const themeToggle = document.getElementById('themeToggle');
if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const isLight = document.body.classList.toggle('light-theme');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}

document.body.style.overflow = 'hidden'; // prevent scroll during load

// ===== CUSTOM CURSOR =====
const cursor = document.getElementById('cursor');
const cursorFollower = document.getElementById('cursorFollower');

let mouseX = 0, mouseY = 0;
let followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.transform = `translate(${mouseX - 5}px, ${mouseY - 5}px)`;
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.1;
  followerY += (mouseY - followerY) * 0.1;
  cursorFollower.style.transform = `translate(${followerX - 18}px, ${followerY - 18}px)`;
  requestAnimationFrame(animateFollower);
}
animateFollower();

// Cursor effects on interactive elements
document.querySelectorAll('a, button, .btn, .project-link, .tech-pill, .portfolio-module').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform += ' scale(1.8)';
    cursorFollower.style.transform += ' scale(1.4)';
    cursorFollower.style.borderColor = 'rgba(201,168,76,0.8)';
  });
  el.addEventListener('mouseleave', () => {
    cursorFollower.style.borderColor = 'rgba(201,168,76,0.4)';
  });
});

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
  updateActiveNav();
});

// ===== MOBILE NAV =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});

// Close nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// ===== ACTIVE NAV LINK =====
function updateActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const scrollPos = window.scrollY + 120;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${id}`) {
          link.classList.add('active');
        }
      });
    }
  });
}

// ===== TYPED TEXT EFFECT =====
const typedTexts = [
  'Full-Stack Apps',
  'MERN Solutions',
  'Cloud Systems',
  'Network Infra',
  'Secure APIs',
  'Scalable Products'
];

let typeIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeEffect() {
  if (!typedEl) return;
  const currentText = typedTexts[typeIndex];

  if (!isDeleting) {
    typedEl.textContent = currentText.substring(0, charIndex + 1);
    charIndex++;
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 2000);
      return;
    }
  } else {
    typedEl.textContent = currentText.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      typeIndex = (typeIndex + 1) % typedTexts.length;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

// ===== STAT COUNTER ANIMATION =====
function animateCounters() {
  document.querySelectorAll('.stat-number').forEach(el => {
    const target = parseInt(el.getAttribute('data-target'));
    let current = 0;
    const step = target / 40;
    const timer = setInterval(() => {
      current += step;
      if (current >= target) {
        el.textContent = target + '+';
        clearInterval(timer);
      } else {
        el.textContent = Math.floor(current);
      }
    }, 40);
  });
}

function initHeroAnimations() {
  typeEffect();
  animateCounters();
}

// ===== PARTICLE FIELD =====
function createParticles() {
  const field = document.getElementById('particleField');
  if (!field) return;
  const count = 55;

  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: absolute;
      border-radius: 50%;
      pointer-events: none;
      background: rgba(201,168,76,${Math.random() * 0.15 + 0.03});
      width: ${Math.random() * 3 + 1}px;
      height: ${Math.random() * 3 + 1}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation: particleFloat ${Math.random() * 15 + 10}s ease-in-out ${Math.random() * 8}s infinite alternate;
    `;
    field.appendChild(particle);
  }
}

// Inject particle animation keyframes
const particleStyle = document.createElement('style');
particleStyle.textContent = `
  @keyframes particleFloat {
    0% { transform: translate(0,0) scale(1); opacity: 0.3; }
    25% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * 60 - 30}px) scale(1.2); }
    50% { opacity: 0.8; }
    75% { transform: translate(${Math.random() * 80 - 40}px, ${Math.random() * 80 - 40}px) scale(0.8); }
    100% { transform: translate(${Math.random() * 60 - 30}px, ${Math.random() * -80}px) scale(1); opacity: 0.2; }
  }
`;
document.head.appendChild(particleStyle);
createParticles();

// ===== INTERSECTION OBSERVER (scroll animations) =====
const observerOptions = {
  threshold: 0.12,
  rootMargin: '0px 0px -40px 0px'
};

const animObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      const delay = entry.target.dataset.delay || 0;
      setTimeout(() => {
        entry.target.classList.add('animate-in');

        // Animate skill bars when skill categories appear
        if (entry.target.classList.contains('skill-category')) {
          entry.target.querySelectorAll('.skill-fill').forEach(fill => {
            fill.style.width = fill.getAttribute('data-width') + '%';
          });
        }
      }, parseInt(delay));
      animObserver.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe elements
document.querySelectorAll('.skill-category').forEach((el, i) => {
  el.dataset.delay = i * 100;
  animObserver.observe(el);
});

document.querySelectorAll('.project-card').forEach((el, i) => {
  el.dataset.delay = i * 120;
  animObserver.observe(el);
});

document.querySelectorAll('.portfolio-module').forEach((el, i) => {
  el.dataset.delay = i * 80;
  animObserver.observe(el);
});

// (Contact form removed)

// ===== BACK TO TOP =====
const backToTop = document.getElementById('backToTop');
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Show/hide based on scroll
window.addEventListener('scroll', () => {
  if (window.scrollY > 400) {
    backToTop.style.opacity = '1';
    backToTop.style.pointerEvents = 'auto';
  } else {
    backToTop.style.opacity = '0';
    backToTop.style.pointerEvents = 'none';
  }
});
backToTop.style.opacity = '0';
backToTop.style.pointerEvents = 'none';
backToTop.style.transition = 'opacity 0.3s ease, transform 0.3s ease';

// ===== SMOOTH SCROLL for nav links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ===== TILT EFFECT on hero image =====
const heroImageWrapper = document.querySelector('.hero-image-wrapper');
if (heroImageWrapper) {
  heroImageWrapper.addEventListener('mousemove', (e) => {
    const rect = heroImageWrapper.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
    const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
    heroImageWrapper.style.transform = `perspective(800px) rotateY(${x * 8}deg) rotateX(${-y * 8}deg)`;
  });
  heroImageWrapper.addEventListener('mouseleave', () => {
    heroImageWrapper.style.transform = 'perspective(800px) rotateY(0deg) rotateX(0deg)';
  });
}

// ===== RIPPLE EFFECT on buttons =====
document.querySelectorAll('.btn').forEach(btn => {
  btn.addEventListener('click', function(e) {
    const ripple = document.createElement('span');
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      background: rgba(255,255,255,0.15);
      border-radius: 50%;
      transform: scale(0);
      animation: rippleEffect 0.6s ease-out;
      pointer-events: none;
    `;
    this.appendChild(ripple);
    ripple.addEventListener('animationend', () => ripple.remove());
  });
});

const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
  @keyframes rippleEffect {
    to { transform: scale(2.5); opacity: 0; }
  }
`;
document.head.appendChild(rippleStyle);

console.log('%c R.N.T Jayawardana Portfolio', 'color: #c9a84c; font-size: 18px; font-weight: bold;');
console.log('%c Built with passion & code 🚀', 'color: #9a9a9a; font-size: 12px;');
