// Mobile Nav
function toggleMobileNav() {
  const nav = document.getElementById('mobileNav');
  nav.style.display = 'flex';
  setTimeout(() => nav.classList.toggle('open'), 10);
}
function closeMobileNav(e) {
  if (e.target === document.getElementById('mobileNav')) toggleMobileNav();
}

// FAQ Accordion
function toggleFaq(btn) {
  const item = btn.parentElement;
  const isOpen = item.classList.contains('open');
  document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
  if (!isOpen) item.classList.add('open');
}

// AOS (Animate on Scroll)
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.12 });
document.querySelectorAll('.aos').forEach(el => observer.observe(el));

// Timed Popup – 10 seconds
let timedShown = false;
setTimeout(() => {
  if (!timedShown && !sessionStorage.getItem('timedPopupShown')) {
    document.getElementById('timedPopup').classList.add('active');
    timedShown = true;
    sessionStorage.setItem('timedPopupShown', '1');
  }
}, 10000);

// Exit Intent Popup
let exitShown = false;
document.addEventListener('mouseleave', e => {
  if (e.clientY < 5 && !exitShown && !sessionStorage.getItem('exitPopupShown')) {
    document.getElementById('exitPopup').classList.add('active');
    exitShown = true;
    sessionStorage.setItem('exitPopupShown', '1');
  }
});

// Close Popup
function closePopup(id) {
  document.getElementById(id).classList.remove('active');
}
// Close on overlay click
document.querySelectorAll('.popup-overlay').forEach(overlay => {
  overlay.addEventListener('click', function(e) {
    if (e.target === this) this.classList.remove('active');
  });
});

// Popup Form Submit
function popupFormSubmit(e) {
  e.preventDefault();
  closePopup('timedPopup');
  const form = e.target;
  const phone = form.querySelector('[name="phone"]').value;
  setTimeout(() => alert('✅ Thank you! We will call you back within 15 minutes.\n\nFor faster response, call us at: 9990283890'), 300);
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', function(e) {
  // Allow formsubmit to handle it — show success after redirect if needed
  // For SPA-like experience, we can optionally intercept:
  // e.preventDefault(); // Uncomment for AJAX-style
});

// Sticky header scroll effect
window.addEventListener('scroll', () => {
  const header = document.getElementById('header');
  if (window.scrollY > 50) {
    header.style.boxShadow = '0 4px 24px rgba(0,0,0,0.12)';
  } else {
    header.style.boxShadow = '0 2px 20px rgba(0,0,0,0.08)';
  }
});

// Keyboard ESC to close popups
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.popup-overlay').forEach(p => p.classList.remove('active'));
    const nav = document.getElementById('mobileNav');
    if (nav.classList.contains('open')) toggleMobileNav();
  }
});
