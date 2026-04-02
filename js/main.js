/* ============================================================
   MON AMIE CPA — Gestion CLV
   JavaScript principal
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------- Navigation scroll effect --------------------
  const nav = document.getElementById('nav');

  // -------------------- Parallax scroll effect --------------------
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const viewportH = window.innerHeight;

  const handleParallax = () => {
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.12;
      const rect = el.getBoundingClientRect();
      const elMid = rect.top + rect.height / 2;
      const offset = (elMid - viewportH / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    handleParallax();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleParallax();

  // -------------------- Mobile menu toggle --------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  // Close mobile menu on link click
  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // -------------------- Scroll animations --------------------
  const animatedElements = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger animation for sibling elements
        const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
        let delay = 0;
        siblings.forEach((sibling, i) => {
          if (sibling === entry.target) {
            delay = i * 100;
          }
        });

        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);

        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -40px 0px'
  });

  animatedElements.forEach(el => observer.observe(el));

  // -------------------- Smooth scroll for anchor links --------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // -------------------- Newsletter form (placeholder) --------------------
  const newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter__input');
      if (input.value) {
        input.value = '';
        const btn = newsletterForm.querySelector('.btn');
        const originalText = btn.textContent;
        btn.textContent = 'Merci!';
        btn.style.backgroundColor = '#6B8264';
        setTimeout(() => {
          btn.textContent = originalText;
          btn.style.backgroundColor = '';
        }, 2500);
      }
    });
  }

});
