/**
 * Yash Singh - Mechanical Engineering Portfolio
 * Interactive Script: Canvas Mechanical Drafting, Mobile Nav, ScrollSpy, Toast, Clipboard
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavbar();
  initMobileDrawer();
  initScrollSpy();
  initClipboardAndToasts();
  initContactForm();
  initMechanicalCanvas();
  initPdfDownloadFeedback();
});

/* --------------------------------------------------------------------------
   1. NAVBAR STICKY & ACTIVE STATES
   -------------------------------------------------------------------------- */
function initNavbar() {
  const header = document.getElementById('header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. MOBILE DRAWER NAVIGATION
   -------------------------------------------------------------------------- */
function initMobileDrawer() {
  const toggleBtn = document.getElementById('mobile-toggle');
  const drawer = document.getElementById('mobile-drawer');
  if (!toggleBtn || !drawer) return;

  const toggleMenu = () => {
    const isOpen = drawer.classList.contains('open');
    if (isOpen) {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    } else {
      drawer.classList.add('open');
      toggleBtn.classList.add('active');
      toggleBtn.setAttribute('aria-expanded', 'true');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);

  // Close drawer on link click
  const drawerLinks = drawer.querySelectorAll('a');
  drawerLinks.forEach(link => {
    link.addEventListener('click', () => {
      drawer.classList.remove('open');
      toggleBtn.classList.remove('active');
      toggleBtn.setAttribute('aria-expanded', 'false');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });
  });
}

/* --------------------------------------------------------------------------
   3. SCROLLSPY ACTIVE LINK HIGHLIGHTING
   -------------------------------------------------------------------------- */
function initScrollSpy() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.desktop-nav .nav-link');
  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(sec => observer.observe(sec));
}

/* --------------------------------------------------------------------------
   4. TOAST NOTIFICATIONS & CLIPBOARD
   -------------------------------------------------------------------------- */
let toastTimeout;

function showToast(message) {
  const toast = document.getElementById('toast');
  if (!toast) return;

  toast.textContent = message;
  toast.classList.add('show');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => {
    toast.classList.remove('show');
  }, 3200);
}

function initClipboardAndToasts() {
  // Copyable contact fields
  const copyables = document.querySelectorAll('.copyable-text');
  copyables.forEach(elem => {
    elem.addEventListener('click', () => {
      const copyVal = elem.getAttribute('data-copy') || elem.textContent.trim();
      navigator.clipboard.writeText(copyVal).then(() => {
        showToast(`Copied to clipboard: "${copyVal}"`);
      }).catch(() => {
        showToast('Selection copied to clipboard.');
      });
    });
  });

  // Project template copy buttons
  const copyTemplateBtns = document.querySelectorAll('.copy-template-btn');
  copyTemplateBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-target');
      const templateText = 
`[PROJECT ENTRY TEMPLATE]
Title: [Add Project Title Here]
Problem Statement: [Define engineering challenge or task objective]
Design & Approach: [CAD model, mechanics calculations, workshop fabrication]
Tools Used: [e.g. AutoCAD, SolidWorks, Lathe, 3D Printer]
Results & Learnings: [Observations, efficiency, takeaways]`;

      navigator.clipboard.writeText(templateText).then(() => {
        showToast('Project template copied! Paste into index.html to update.');
      }).catch(() => {
        showToast('Template copied to clipboard.');
      });
    });
  });
}

/* --------------------------------------------------------------------------
   5. CONTACT FORM SIMULATION
   -------------------------------------------------------------------------- */
function initContactForm() {
  const form = document.getElementById('portfolio-contact-form');
  const feedback = document.getElementById('form-feedback');
  if (!form || !feedback) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('contact-name').value.trim();
    const email = document.getElementById('contact-email').value.trim();
    const subject = document.getElementById('contact-subject').value.trim();
    const message = document.getElementById('contact-message').value.trim();

    if (!name || !email || !message) {
      feedback.className = 'form-feedback error';
      feedback.textContent = 'Please fill out all required fields marked with *.';
      return;
    }

    // Friendly local simulation for first-year portfolio
    feedback.className = 'form-feedback success';
    feedback.textContent = `Thank you, ${name}! Your transmission has been queued for Yash Singh. (To make this live, link to Formspree or your college email in script.js)`;
    showToast('Message formatted successfully!');

    form.reset();

    setTimeout(() => {
      feedback.textContent = '';
      feedback.className = 'form-feedback';
    }, 6000);
  });
}

/* --------------------------------------------------------------------------
   6. PDF DOWNLOAD CONFIRMATION
   -------------------------------------------------------------------------- */
function initPdfDownloadFeedback() {
  const downloadBtns = document.querySelectorAll('a[download]');
  downloadBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      showToast('Downloading Yash_Singh_Mechanical_Engineering_Portfolio.pdf...');
    });
  });
}

/* --------------------------------------------------------------------------
   7. SUBTLE MECHANICAL BLUEPRINT CANVAS ANIMATION
   -------------------------------------------------------------------------- */
function initMechanicalCanvas() {
  const canvas = document.getElementById('mechanical-canvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Check if reduced motion is preferred
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) return;

  let width = (canvas.width = window.innerWidth);
  let height = (canvas.height = window.innerHeight);

  window.addEventListener('resize', () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }, { passive: true });

  // Rotating mechanical gears setup
  let angle = 0;

  function drawGear(x, y, radius, teeth, toothDepth, currentAngle, color) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(currentAngle);
    ctx.strokeStyle = color;
    ctx.lineWidth = 1;
    ctx.beginPath();

    const step = (Math.PI * 2) / teeth;
    for (let i = 0; i < teeth; i++) {
      const a1 = i * step;
      const a2 = a1 + step * 0.25;
      const a3 = a1 + step * 0.75;
      const a4 = (i + 1) * step;

      const rOuter = radius + toothDepth;
      const rInner = radius;

      // Inner base to outer tooth
      if (i === 0) {
        ctx.moveTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);
      } else {
        ctx.lineTo(Math.cos(a1) * rInner, Math.sin(a1) * rInner);
      }
      ctx.lineTo(Math.cos(a2) * rOuter, Math.sin(a2) * rOuter);
      ctx.lineTo(Math.cos(a3) * rOuter, Math.sin(a3) * rOuter);
      ctx.lineTo(Math.cos(a4) * rInner, Math.sin(a4) * rInner);
    }
    ctx.closePath();
    ctx.stroke();

    // Center pitch circle
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.45, 0, Math.PI * 2);
    ctx.stroke();

    // Center bore
    ctx.beginPath();
    ctx.arc(0, 0, radius * 0.15, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(56, 189, 248, 0.05)';
    ctx.fill();
    ctx.stroke();

    // Spokes
    ctx.beginPath();
    for (let s = 0; s < 4; s++) {
      const sa = (s * Math.PI) / 2;
      ctx.moveTo(Math.cos(sa) * radius * 0.15, Math.sin(sa) * radius * 0.15);
      ctx.lineTo(Math.cos(sa) * radius * 0.45, Math.sin(sa) * radius * 0.45);
    }
    ctx.stroke();

    ctx.restore();
  }

  function render() {
    ctx.clearRect(0, 0, width, height);

    angle += 0.0035;

    // Draw subtle mechanical elements positioned in corner/background
    // Gear 1: Upper Right
    const g1X = width - 120;
    const g1Y = 180;
    const g1R = 90;
    drawGear(g1X, g1Y, g1R, 18, 12, angle, 'rgba(56, 189, 248, 0.12)');

    // Gear 2: Meshed with Gear 1
    const g2R = 50;
    const g2Dist = g1R + g2R + 8;
    const g2AngleOffset = Math.PI * 0.75;
    const g2X = g1X - Math.cos(g2AngleOffset) * g2Dist;
    const g2Y = g1Y + Math.sin(g2AngleOffset) * g2Dist;
    // Counter-rotation proportional to gear ratio
    const g2Angle = -angle * (g1R / g2R);
    drawGear(g2X, g2Y, g2R, 10, 8, g2Angle, 'rgba(148, 163, 184, 0.09)');

    // Gear 3: Lower Left
    const g3X = 80;
    const g3Y = height - 160;
    const g3R = 110;
    drawGear(g3X, g3Y, g3R, 22, 14, -angle * 0.7, 'rgba(56, 189, 248, 0.08)');

    requestAnimationFrame(render);
  }

  requestAnimationFrame(render);
}
