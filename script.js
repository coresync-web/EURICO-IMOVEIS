(function () {
  'use strict';

  /* =============================================
     HEADER: scroll state
     ============================================= */
  const header = document.getElementById('header');

  function updateHeader() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  /* =============================================
     MOBILE NAV: hamburger + overlay
     ============================================= */
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const overlay = document.getElementById('nav-overlay');

  function openNav() {
    nav.classList.add('open');
    overlay.classList.add('visible');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    nav.classList.remove('open');
    overlay.classList.remove('visible');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  hamburger.addEventListener('click', function () {
    if (nav.classList.contains('open')) {
      closeNav();
    } else {
      openNav();
    }
  });

  overlay.addEventListener('click', closeNav);

  // Close nav when a link is clicked
  nav.querySelectorAll('.nav__link').forEach(function (link) {
    link.addEventListener('click', closeNav);
  });

  // Close nav on Escape key
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && nav.classList.contains('open')) {
      closeNav();
      hamburger.focus();
    }
  });

  /* =============================================
     FADE-IN UP: Intersection Observer
     ============================================= */
  var fadeEls = document.querySelectorAll('.fade-in-up');

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -48px 0px' }
    );

    fadeEls.forEach(function (el) {
      observer.observe(el);
    });
  } else {
    // Fallback: show all immediately
    fadeEls.forEach(function (el) {
      el.classList.add('visible');
    });
  }

  /* =============================================
     SMOOTH SCROLL for anchor links
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(this.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      var offset = parseInt(getComputedStyle(document.documentElement)
        .getPropertyValue('--header-h'), 10) || 80;
      var top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top: top, behavior: 'smooth' });
    });
  });

  /* =============================================
     ACTIVE NAV LINK: highlight on scroll
     ============================================= */
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.nav__link');

  function setActiveLink() {
    var offset = (parseInt(getComputedStyle(document.documentElement)
      .getPropertyValue('--header-h'), 10) || 80) + 40;
    var scrollY = window.scrollY;
    var current = '';

    sections.forEach(function (section) {
      if (scrollY >= section.offsetTop - offset) {
        current = '#' + section.id;
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      if (link.getAttribute('href') === current) {
        link.classList.add('active');
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* =============================================
     CONTACT FORM: client-side handling
     ============================================= */
  var form = document.getElementById('contact-form');
  var submitBtn = document.getElementById('submit-btn');
  var formSuccess = document.getElementById('form-success');

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var name = form.querySelector('#name').value.trim();
      var phone = form.querySelector('#phone').value.trim();
      var interest = form.querySelector('#interest').value;

      if (!name || !phone || !interest) {
        // Simple inline validation
        if (!name) form.querySelector('#name').focus();
        else if (!phone) form.querySelector('#phone').focus();
        else form.querySelector('#interest').focus();
        return;
      }

      // Show loading state
      submitBtn.querySelector('.btn__text').hidden = true;
      submitBtn.querySelector('.btn__loading').hidden = false;
      submitBtn.disabled = true;

      // Simulate async submission (replace with real endpoint)
      setTimeout(function () {
        submitBtn.querySelector('.btn__text').hidden = false;
        submitBtn.querySelector('.btn__loading').hidden = true;
        submitBtn.disabled = false;

        form.reset();
        formSuccess.hidden = false;

        setTimeout(function () {
          formSuccess.hidden = true;
        }, 6000);
      }, 1200);
    });
  }

  /* =============================================
     FOOTER: current year
     ============================================= */
  var yearEl = document.getElementById('year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* =============================================
     PHONE MASK
     ============================================= */
  var phoneInput = document.getElementById('phone');

  if (phoneInput) {
    phoneInput.addEventListener('input', function () {
      var val = this.value.replace(/\D/g, '').slice(0, 11);
      if (val.length <= 2) {
        this.value = val.length ? '(' + val : '';
      } else if (val.length <= 6) {
        this.value = '(' + val.slice(0, 2) + ') ' + val.slice(2);
      } else if (val.length <= 10) {
        this.value = '(' + val.slice(0, 2) + ') ' + val.slice(2, 6) + '-' + val.slice(6);
      } else {
        this.value = '(' + val.slice(0, 2) + ') ' + val.slice(2, 7) + '-' + val.slice(7);
      }
    });
  }

}());
