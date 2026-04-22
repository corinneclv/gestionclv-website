/* ============================================================
   MON AMIE COMPTABLE — Gestion CLV
   JavaScript principal — V3
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  // -------------------- Navigation scroll --------------------
  const nav = document.getElementById('nav');

  // -------------------- Parallax --------------------
  const parallaxEls = document.querySelectorAll('[data-parallax]');
  const viewportH = window.innerHeight;

  const handleParallax = () => {
    parallaxEls.forEach(el => {
      const speed = parseFloat(el.dataset.parallax) || 0.1;
      const rect = el.getBoundingClientRect();
      const elMid = rect.top + rect.height / 2;
      const offset = (elMid - viewportH / 2) * speed;
      el.style.transform = `translateY(${offset}px)`;
    });
  };

  const handleScroll = () => {
    if (window.scrollY > 40) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
    handleParallax();
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleParallax();

  // -------------------- Mobile menu --------------------
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.getElementById('navMenu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navToggle.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // -------------------- Scroll animations --------------------
  const animatedEls = document.querySelectorAll('[data-animate]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = entry.target.parentElement.querySelectorAll('[data-animate]');
        let delay = 0;
        siblings.forEach((sibling, i) => {
          if (sibling === entry.target) delay = i * 120;
        });
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, delay);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -32px 0px',
  });

  animatedEls.forEach(el => observer.observe(el));

  // -------------------- Smooth scroll for anchor links --------------------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        const navHeight = nav.offsetHeight;
        const targetPos = target.getBoundingClientRect().top + window.scrollY - navHeight;
        window.scrollTo({ top: targetPos, behavior: 'smooth' });
      }
    });
  });

  // -------------------- Contact form --------------------
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.contact__form-submit');
      const success = document.getElementById('contactSuccess');
      const originalText = btn.textContent;

      btn.textContent = 'Envoi en cours\u2026';
      btn.disabled = true;

      try {
        const res = await fetch(contactForm.action, {
          method: 'POST',
          body: new FormData(contactForm),
          headers: { Accept: 'application/json' },
        });

        if (res.ok) {
          contactForm.reset();
          contactForm.style.display = 'none';
          success.classList.add('visible');
        } else {
          btn.textContent = originalText;
          btn.disabled = false;
          btn.textContent = 'Erreur \u2014 r\u00e9essaie ou \u00e9cris-moi directement';
        }
      } catch {
        btn.textContent = originalText;
        btn.disabled = false;
      }
    });
  }

  // -------------------- FAQ accordion --------------------
  document.querySelectorAll('.faq__question').forEach(btn => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      const answer = btn.nextElementSibling;
      btn.setAttribute('aria-expanded', String(!expanded));
      answer.hidden = expanded;
    });
  });

  // -------------------- Newsletter form --------------------
  const newsletterForm = document.querySelector('.newsletter__form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', e => {
      e.preventDefault();
      const input = newsletterForm.querySelector('.newsletter__input');
      if (input.value) {
        input.value = '';
        const btn = newsletterForm.querySelector('.btn');
        const original = btn.textContent;
        btn.textContent = 'Merci\u00a0!';
        btn.style.backgroundColor = '#5C7356';
        btn.style.borderColor = '#5C7356';
        setTimeout(() => {
          btn.textContent = original;
          btn.style.backgroundColor = '';
          btn.style.borderColor = '';
        }, 2800);
      }
    });
  }

});
