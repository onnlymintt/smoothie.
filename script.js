// Basic interactivity for the Alice-themed portfolio (enhanced with data.json + GSAP)
document.addEventListener('DOMContentLoaded', () => {
  const enterBtn = document.getElementById('enterBtn');
  const site = document.getElementById('site');
  const rabbit = document.getElementById('rabbit-hole');
  const body = document.body;

  // Load user data (profile photo, projects) from data.json
  async function loadData() {
    try {
      const res = await fetch('data.json', {cache: 'no-store'});
      const data = await res.json();
      // Update profile photo and texts
      const profilePhoto = document.getElementById('profilePhoto');
      if (data.profilePhoto) profilePhoto.src = data.profilePhoto;
      if (data.name) {
        document.getElementById('brandName').textContent = data.name;
        document.getElementById('footerName').textContent = data.name;
        document.getElementById('introTitle').textContent = data.title || 'Come with me...';
        document.getElementById('introText').textContent = data.subtitle || "I'm " + data.name + ' — a designer & developer who wandered into Wonderland.';
        document.getElementById('leadText').textContent = data.lead || document.getElementById('leadText').textContent;
      }

      // populate projects
      const slides = document.getElementById('projectSlides');
      slides.innerHTML = '';
      (data.projects || []).forEach((p, i) => {
        const li = document.createElement('li');
        li.className = 'slide' + (i === 0 ? ' active' : '');
        li.tabIndex = 0;
        li.innerHTML = `
          <img src="${p.image || 'https://placehold.co/320x200?text=Project'}" alt="${escapeHtml(p.title)} thumbnail" />
          <div>
            <h3>${escapeHtml(p.title)}</h3>
            <p>${escapeHtml(p.description)}</p>
            ${p.link ? `<p><a href="${p.link}" target="_blank" rel="noopener">View project</a></p>` : ''}
          </div>
        `;
        slides.appendChild(li);
      });
      initCarousel();
    } catch (err) {
      console.warn('Could not load data.json:', err);
    }
  }

  function escapeHtml(s) {
    if (!s) return '';
    return s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
  }

  // Transition from rabbit hole to site (with GSAP)
  enterBtn?.addEventListener('click', async () => {
    // small animation with GSAP if available
    if (window.gsap) {
      const tl = gsap.timeline();
      tl.to('#rabbit-hole .intro-card', {y: -30, opacity: 0, duration: 0.7, ease: 'power2.in'});
      tl.to('#rabbit-hole .rabbit-hole', {scale: 0.98, opacity: 0, duration: 0.9}, '-=.5');
      tl.call(() => {
        rabbit.hidden = true;
        site.hidden = false;
        site.scrollIntoView({behavior: 'smooth'});
        gsap.from('#site', {opacity: 0, duration: 0.6});
      });
    } else {
      rabbit.style.transition = 'opacity .7s ease, transform 1s ease';
      rabbit.style.opacity = '0';
      rabbit.style.transform = 'translateY(-20px) scale(.98)';
      setTimeout(() => {
        rabbit.hidden = true;
        site.hidden = false;
        site.scrollIntoView({behavior:'smooth'});
      }, 750);
    }
  });

  // Navigation buttons
  document.querySelectorAll('nav button').forEach(btn => {
    btn.addEventListener('click', () => {
      const t = document.getElementById(btn.dataset.target);
      t?.scrollIntoView({behavior:'smooth', block:'start'});
    });
  });

  // Parallax background subtle effect
  window.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 10;
    const y = (e.clientY / window.innerHeight - 0.5) * 6;
    document.documentElement.style.setProperty('--bg-offset-x', x + 'px');
    document.documentElement.style.setProperty('--bg-offset-y', y + 'px');
  });

  // Keyboard / pointer accessibility for cards
  document.addEventListener('click', (ev) => {
    // delegated clicks for cards that might be dynamically added (projects)
    const card = ev.target.closest('.card, .tale-card');
    if (!card) return;
    const inner = card.querySelector('.card-inner');
    if (inner) {
      const flipped = inner.style.transform === 'rotateY(180deg)';
      inner.style.transform = flipped ? 'rotateY(0deg)' : 'rotateY(180deg)';
    } else {
      const front = card.querySelector('.front');
      const back = card.querySelector('.back');
      if (front && back) {
        const isFlipped = front.style.transform && front.style.transform.includes('rotateY(180deg)');
        front.style.transform = isFlipped ? '' : 'rotateY(180deg)';
        back.style.transform = isFlipped ? 'rotateY(180deg)' : 'rotateY(360deg)';
      }
    }
  });

  document.addEventListener('keydown', (ev) => {
    if (ev.target && (ev.key === 'Enter' || ev.key === ' ')) {
      const el = ev.target.closest('.card, .tale-card');
      if (!el) return;
      ev.preventDefault();
      el.classList.toggle('flipped');
      const inner = el.querySelector('.card-inner');
      if (inner) inner.style.transform = el.classList.contains('flipped') ? 'rotateY(180deg)' : 'rotateY(0deg)';
    }
  });

  // Simple carousel controls
  let slides = [];
  let idx = 0;
  function initCarousel() {
    slides = Array.from(document.querySelectorAll('.slide'));
    idx = slides.findIndex(s => s.classList.contains('active'));
    if (idx === -1) idx = 0;
    function updateSlides() {
      slides.forEach((s,i) => s.classList.toggle('active', i === idx));
      // Scroll visible slides container a bit for UX
      const container = document.querySelector('.slides');
      const active = slides[idx];
      if (active && container) {
        const left = active.offsetLeft - container.offsetLeft;
        container.scrollTo({ left, behavior: 'smooth' });
      }
    }
    document.querySelector('.prev')?.addEventListener('click', () => {
      idx = (idx - 1 + slides.length) % slides.length;
      updateSlides();
    });
    document.querySelector('.next')?.addEventListener('click', () => {
      idx = (idx + 1) % slides.length;
      updateSlides();
    });
    updateSlides();
  }

  // Contact form stub (simulate submit)
  const form = document.getElementById('contactForm');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const msg = document.getElementById('formMessage');
    msg.textContent = 'Sending...';
    setTimeout(() => {
      msg.textContent = 'Message delivered to the White Rabbit. I will reply soon!';
      form.reset();
    }, 900);
  });

  // Initial animations with GSAP for decorative elements (if loaded)
  function introDecorations() {
    if (!window.gsap) return;
    gsap.from('.floating-smoke', {y: 10, opacity: 0, duration: 1.2, ease: 'sine.out'});
    gsap.to('.floating-smoke', {y: -8, duration: 4, repeat: -1, yoyo: true, ease: 'sine.inOut', opacity: 0.7});
    gsap.from('.intro-card', {y: 20, opacity: 0, duration: 0.9});
  }

  // load data and start
  loadData().then(() => {
    introDecorations();
  });
});
