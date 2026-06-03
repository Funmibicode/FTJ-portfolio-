// AOS
    AOS.init({ duration: 700, easing: 'ease-out-cubic', once: true, offset: 60 });

    // ── DOM refs ──
    const navbar       = document.getElementById('navbar');
    const heroScrollEl = document.querySelector('.hero-scroll');

    // Prevent navbar transition flash on initial page load
    navbar.classList.add('no-transition');
    window.addEventListener('load', () => {
      setTimeout(() => navbar.classList.remove('no-transition'), 100);
    });

    // ── Throttled scroll handler ──
    let ticking = false;

    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const y = window.scrollY;
          navbar.classList.toggle('scrolled', y > 30);
          if (heroScrollEl) heroScrollEl.classList.toggle('hidden', y > 80);
          ticking = false;
        });
        ticking = true;
      }
    });

    // ── Back to Top ──
    const backToTopBtn = document.getElementById('backToTop');
    backToTopBtn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
    window.addEventListener('scroll', () => {
      backToTopBtn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    // ── Active nav link on scroll ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
          });
        }
      });
    }, { rootMargin: '-40% 0px -55% 0px' });
    sections.forEach(s => sectionObserver.observe(s));

    // ── Hamburger + blur overlay + close on outside click ──
    const hamburger  = document.getElementById('hamburger');
    const navMobile  = document.getElementById('navMobile');
    const navOverlay = document.getElementById('navOverlay');

    function openMenu() {
      hamburger.classList.add('open');
      navMobile.classList.add('open');
      navOverlay.classList.add('open');
      document.body.style.overflow = 'hidden'; // prevent scroll behind
    }

    function closeMenu() {
      hamburger.classList.remove('open');
      navMobile.classList.remove('open');
      navOverlay.classList.remove('open');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      hamburger.classList.contains('open') ? closeMenu() : openMenu();
    });

    // Close on any nav link click
    document.querySelectorAll('.mobile-link').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on overlay click
    navOverlay.addEventListener('click', closeMenu);

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!navMobile.contains(e.target) && !hamburger.contains(e.target)) {
        closeMenu();
      }
    });

    // ── Typewriter ──
    const phrases = [
      'Building websites for small businesses.',
      'Helping brands grow online.',
      'Clean code. Sharp design. Real results.',
      'Sharing tech tips every week.',
      'Open to freelance & collaborations.',
    ];
    let pi = 0, ci = 0, deleting = false;
    const tw = document.getElementById('typewriter-text');
    function type() {
      const cur = phrases[pi];
      tw.textContent = deleting ? cur.substring(0, ci--) : cur.substring(0, ci++);
      let d = deleting ? 40 : 75;
      if (!deleting && ci === cur.length + 1) { d = 1800; deleting = true; }
      else if (deleting && ci === 0) { deleting = false; pi = (pi + 1) % phrases.length; d = 400; }
      setTimeout(type, d);
    }
    type();

    // ── Toast helper ──
    function showToast(msg, type = 'success') {
      const toast     = document.getElementById('toast');
      const toastMsg  = document.getElementById('toastMsg');
      const toastIcon = document.getElementById('toastIcon');
      toastMsg.textContent = msg;
      toast.className = `toast ${type} show`;
      toastIcon.className = type === 'success'
        ? 'fa-solid fa-circle-check'
        : 'fa-solid fa-circle-exclamation';
      setTimeout(() => { toast.className = 'toast'; }, 4500);
    }

    // ── EmailJS — Contact Form ──
    // Replace the three values below after setting up emailjs.com:
    const EMAILJS_PUBLIC_KEY  = '8z1xtvJxqHO9MEyL6';
    const EMAILJS_SERVICE_ID  = 'service_zzo0hu7';
    const EMAILJS_TEMPLATE_ID = 'template_8tj1vi5';

    // Only init if keys are set
    if (EMAILJS_PUBLIC_KEY !== 'YOUR_PUBLIC_KEY') {
      emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
    }

    const formBtn     = document.getElementById('formSubmitBtn');
    const formBtnText = formBtn.querySelector('.btn-text');

    formBtn.addEventListener('click', async function () {
      const name    = document.getElementById('cf-name').value.trim();
      const email   = document.getElementById('cf-email').value.trim();
      const service = document.getElementById('cf-service');
      const message = document.getElementById('cf-message').value.trim();

      // Validation
      if (!name || !email || !message) {
        showToast('Please fill in your name, email, and message.', 'error');
        return;
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
        showToast('Please enter a valid email address.', 'error');
        return;
      }
      if (EMAILJS_PUBLIC_KEY === 'YOUR_PUBLIC_KEY') {
        showToast('EmailJS not configured yet — try WhatsApp for now.', 'error');
        return;
      }

      // Loading state
      formBtn.disabled = true;
      formBtnText.textContent = 'Sending…';
      formBtn.style.opacity = '0.8';

      try {
        await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          from_name: name,
          reply_to:  email,
          subject:   service.value || 'New message from portfolio',
          service:   service.value || 'Not specified',
          message:   message,
        });

        showToast("Message sent! I'll reply within 24 hours 🎉", 'success');

        // Reset form fields
        document.getElementById('cf-name').value  = '';
        document.getElementById('cf-email').value = '';
        service.selectedIndex = 0;
        document.getElementById('cf-message').value = '';

      } catch (err) {
        console.error('EmailJS error:', err);
        showToast('Oops! Something went wrong. Try WhatsApp instead.', 'error');
      } finally {
        formBtn.disabled = false;
        formBtnText.textContent = 'Send Message';
        formBtn.style.opacity = '1';
      }
    });

    // ── Hashnode Blog — GraphQL ──
    (async function loadBlogPosts() {
      const HASHNODE_API = 'https://gql.hashnode.com';
      const body = JSON.stringify({
        query: `
          query GetPosts {
            publication(host: "funmibitech.hashnode.dev") {
              posts(first: 6) {
                edges {
                  node {
                    title
                    brief
                    publishedAt
                    readTimeInMinutes
                    coverImage { url }
                    tags { name }
                    url
                  }
                }
              }
            }
          }
        `
      });

      const skeleton = document.getElementById('blogSkeleton');
      const grid     = document.getElementById('blogGrid');
      const headers  = { 'Content-Type': 'application/json' };

      // Three fallback strategies
      const strategies = [
        () => fetch(HASHNODE_API, { method: 'POST', headers, body }),
        () => fetch('https://corsproxy.io/?' + encodeURIComponent(HASHNODE_API), { method: 'POST', headers, body }),
        () => fetch('https://api.allorigins.win/raw?url=' + encodeURIComponent(HASHNODE_API), { method: 'POST', headers, body }),
      ];

      let lastErr = null;

      for (const attempt of strategies) {
        try {
          const res  = await attempt();
          if (!res.ok) { lastErr = `HTTP ${res.status}`; continue; }
          const json = await res.json();
          if (json.errors) { lastErr = json.errors[0]?.message; continue; }
          if (!json.data?.publication) { lastErr = 'no publication found'; continue; }

          const posts = json.data.publication.posts.edges.map(e => e.node);
          if (!posts.length) { lastErr = 'no posts'; continue; }

          grid.innerHTML = posts.map((post, i) => {
            const date  = new Date(post.publishedAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            const tag   = post.tags?.[0]?.name || 'Article';
            const thumb = post.coverImage?.url;
            return `
              <a href="${post.url}" target="_blank" rel="noopener"
                 class="blog-card" data-aos="fade-up" data-aos-delay="${i * 80}">
                ${thumb
                  ? `<img class="blog-card-thumb" src="${thumb}" alt="${post.title}" loading="lazy" />`
                  : `<div class="blog-card-thumb-placeholder"><i class="fa-solid fa-newspaper"></i></div>`}
                <div class="blog-card-body">
                  <span class="blog-card-tag">${tag}</span>
                  <div class="blog-card-meta">
                    <span><i class="fa-regular fa-calendar"></i> ${date}</span>
                    <span><i class="fa-regular fa-clock"></i> ${post.readTimeInMinutes} min read</span>
                  </div>
                  <h3 class="blog-card-title">${post.title}</h3>
                  <p class="blog-card-excerpt">${post.brief || ''}</p>
                  <span class="blog-card-read">Read article <i class="fa-solid fa-arrow-right"></i></span>
                </div>
              </a>`;
          }).join('');

          skeleton.style.display = 'none';
          grid.style.display = 'grid';
          AOS.refreshHard();
          return; // success — stop trying

        } catch (e) {
          lastErr = e.message;
        }
      }

      // All strategies failed
      console.warn('Blog load failed after all attempts. Last error:', lastErr);
      skeleton.style.display = 'none';
      grid.style.display = 'grid';
      grid.innerHTML = `
        <div class="blog-error">
          <i class="fa-solid fa-circle-exclamation"></i>
          <p>Couldn't load posts right now.</p>
          <a href="https://funmibitech.hashnode.dev" target="_blank" rel="noopener"
             class="btn btn-outline btn-sm">
            Visit Blog Directly <i class="fa-solid fa-arrow-up-right-from-square"></i>
          </a>
        </div>`;
    })();