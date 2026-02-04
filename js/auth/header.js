(function () {
  function renderNav() {
    const nav = document.querySelector('.nav-links');
    const headerInner = document.querySelector('.header-inner');
    if (!nav || !headerInner) return;

    const current = localStorage.getItem('currentUser');
    if (current) {
      const user = JSON.parse(current);
      nav.innerHTML = `
        <a href="marketplace.html">Marketplace</a>
        <span class="user-pill">Hi, ${user.email}</span>
        ${user.role === 'admin' ? '<a href="admin.html" class="btn btn-ghost">Dashboard</a>' : ''}
        <button id="logoutBtn" class="btn btn-ghost">Logout</button>
      `;

      document.getElementById('logoutBtn').addEventListener('click', function () {
        localStorage.removeItem('currentUser');
        // reload so header and other pages update
        window.location.reload();
      });
    } else {
      nav.innerHTML = `
        <a href="marketplace.html">Marketplace</a>
        <a href="login.html" class="btn btn-ghost">Login</a>
        <a href="register.html" class="btn">Register</a>
      `;
    }

    // ensure hamburger toggle exists and works on small screens
    ensureNavToggle(nav, headerInner);

    // close menu when a link is clicked (mobile)
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A' && nav.classList.contains('open')) {
        nav.classList.remove('open');
        const t = document.getElementById('navToggle'); if (t) t.setAttribute('aria-expanded', 'false');
      }
    });
  }

  function ensureNavToggle(nav, headerInner) {
    // If a CSS checkbox exists, hook it up for accessibility
    const chk = document.getElementById('nav-toggle-control');
    const lbl = headerInner.querySelector('.nav-toggle');
    if (chk && lbl) {
      // keep aria-expanded in sync
      chk.addEventListener('change', function () {
        const expanded = chk.checked;
        lbl.setAttribute('aria-expanded', expanded);
        if (expanded) nav.classList.add('open'); else nav.classList.remove('open');
      });

      // close when a nav link is clicked on mobile
      nav.addEventListener('click', function (e) {
        if (e.target.tagName === 'A' && chk.checked) { chk.checked = false; chk.dispatchEvent(new Event('change')); }
      });

      // ensure closed on resize when becoming large
      window.addEventListener('resize', function () { if (window.innerWidth > 800 && chk.checked) { chk.checked = false; chk.dispatchEvent(new Event('change')); } });

      return; // checkbox approach provides toggling, skip JS button creation
    }

    // Fallback: create a JS button toggle if checkbox isn't present
    if (headerInner.querySelector('#navToggle')) return;
    const btn = document.createElement('button');
    btn.id = 'navToggle';
    btn.className = 'nav-toggle';
    btn.setAttribute('aria-expanded', 'false');
    btn.setAttribute('aria-label', 'Menu');
    btn.innerHTML = `<svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
    headerInner.appendChild(btn);

    btn.addEventListener('click', function () {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      btn.setAttribute('aria-expanded', expanded);
    });

    // close on resize if getting larger
    window.addEventListener('resize', function () {
      if (window.innerWidth > 800 && nav.classList.contains('open')) {
        nav.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
      }
    });
  }

  // run on load
  document.addEventListener('DOMContentLoaded', renderNav);
})();
