// Basic UI interactions: menu toggle, scroll header, active nav link, year update
document.addEventListener('DOMContentLoaded', function(){
  const header = document.getElementById('header');
  const menuBtn = document.getElementById('menuBtn');
  const navList = document.getElementById('navList');
  const navLinks = document.querySelectorAll('.nav-link');
  const cards = document.querySelectorAll('.card, .project');
  const heroElements = document.querySelectorAll('.hero-text, .hero-card');

  // Year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Menu toggle for mobile
  menuBtn.addEventListener('click', () => {
    const expanded = menuBtn.getAttribute('aria-expanded') === 'true';
    menuBtn.setAttribute('aria-expanded', String(!expanded));
    document.body.classList.toggle('menu-open');
  });

  // Close menu on link click (mobile)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      document.body.classList.remove('menu-open');
      menuBtn.setAttribute('aria-expanded', 'false');
    });
  });

  // Header style on scroll
  function onScroll() {
    if(window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    // scrollspy: highlight active nav link
    let fromTop = window.scrollY + 80;
    navLinks.forEach(link => {
      let section = document.querySelector(link.hash);
      if(!section) return;
      if(section.offsetTop <= fromTop && section.offsetTop + section.offsetHeight > fromTop){
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    // Reveal animations on scroll
    revealOnScroll();
  }
  
  window.addEventListener('scroll', onScroll, {passive:true});
  onScroll();

  // Smooth scroll behavior for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e){
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if(target){
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Reveal elements on scroll with animation
  function revealOnScroll() {
    cards.forEach(card => {
      const cardPosition = card.getBoundingClientRect().top;
      const screenPosition = window.innerHeight / 1.3;
      
      if(cardPosition < screenPosition) {
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }
    });
  }

  // Initialize card styles for animation
  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  // Trigger initial reveal
  setTimeout(revealOnScroll, 300);

  // Add hover effect to buttons
  const buttons = document.querySelectorAll('.btn');
  buttons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      this.style.transform = this.style.transform.replace('translateY(0px)', '') + ' translateY(-3px)';
    });
    
    button.addEventListener('mouseleave', function() {
      this.style.transform = this.style.transform.replace('translateY(-3px)', '') + ' translateY(0px)';
    });
  });

  // Add typing effect to hero title
  const heroTitle = document.querySelector('.hero-text h1');
  const text = heroTitle.textContent;
  heroTitle.innerHTML = '';
  
  let i = 0;
  const typingEffect = setInterval(() => {
    if(i < text.length) {
      heroTitle.innerHTML += text.charAt(i);
      i++;
    } else {
      clearInterval(typingEffect);
    }
  }, 50);

  // Add particle effect to hero section
  createParticles();

  // Add parallax effect to hero card
  window.addEventListener('mousemove', (e) => {
    const card = document.querySelector('.hero-card');
    if (!card) return;
    
    const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
    const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
    card.style.transform = `perspective(1000px) rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
  });

  // Reset card position when mouse leaves
  document.querySelector('.hero').addEventListener('mouseleave', () => {
    const card = document.querySelector('.hero-card');
    if (card) {
      card.style.transform = 'perspective(1000px) rotateY(0deg) rotateX(0deg)';
    }
  });
});

// Create floating particles for background effect
function createParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;
  
  const particleCount = 30;
  
  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Random properties
    const size = Math.random() * 10 + 2;
    const posX = Math.random() * 100;
    const posY = Math.random() * 100;
    const delay = Math.random() * 5;
    const duration = Math.random() * 10 + 10;
    
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.left = `${posX}%`;
    particle.style.top = `${posY}%`;
    particle.style.animationDelay = `${delay}s`;
    particle.style.animationDuration = `${duration}s`;
    
    // Add to hero section
    hero.appendChild(particle);
  }
  
  // Add CSS for particles
  const style = document.createElement('style');
  style.textContent = `
    .particle {
      position: absolute;
      background: rgba(108, 92, 231, 0.3);
      border-radius: 50%;
      z-index: 1;
      animation: floatParticle linear infinite;
      pointer-events: none;
    }
    
    @keyframes floatParticle {
      0% {
        transform: translate(0, 0) rotate(0deg);
        opacity: 0;
      }
      10% {
        opacity: 1;
      }
      90% {
        opacity: 0.5;
      }
      100% {
        transform: translate(calc((100vw - 100%) * -1), calc((100vh - 100%) * -1)) rotate(360deg);
        opacity: 0;
      }
    }
  `;
  
  document.head.appendChild(style);
}