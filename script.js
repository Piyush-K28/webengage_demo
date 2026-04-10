const DEMO_EMAIL    = 'user@lumina.com';
const DEMO_PASS     = 'lumina123';
const SPECIAL_EMAIL = 'piyush.khopade@webengage.com';
const SPECIAL_PASS  = '123456';

webengage.user.login('9SBOkLVMWvPX'); //9SBOkLVMWvPX is the unique user identifier being used here
webengage.user.setAttribute('we_email', 'john@doe.com');
webengage.user.setAttribute('we_birth_date', '1986-08-19');
/* ── LOGIN ── */
function handleLogin() {
  const email = document.getElementById('login-email').value.trim();
  const pass  = document.getElementById('login-pass').value;
  const errE  = document.getElementById('err-email');
  const errP  = document.getElementById('err-pass');
  const msg   = document.getElementById('login-msg');

  let valid = true;
  errE.classList.remove('show');
  errP.classList.remove('show');
  msg.classList.remove('show');
  document.getElementById('login-email').classList.remove('err');
  document.getElementById('login-pass').classList.remove('err');

  if (!email || !/\S+@\S+\.\S+/.test(email)) {
    errE.classList.add('show');
    document.getElementById('login-email').classList.add('err');
    valid = false;
  }

  const isSpecialUser = email === SPECIAL_EMAIL && pass === SPECIAL_PASS;

  if (!pass || pass.length < 6) {
    errP.classList.add('show');
    document.getElementById('login-pass').classList.add('err');
    valid = false;
  }
  if (!valid) return;

  if (isSpecialUser) {
    sessionStorage.setItem('lumina_user', JSON.stringify({ name: 'Piyush', email }));
    alert('User has logged in!');
    window.location.href = 'dashboard.html';
  } else if (email === DEMO_EMAIL && pass === DEMO_PASS) {
    sessionStorage.setItem('lumina_user', JSON.stringify({ name: 'Alex', email }));
    window.location.href = 'dashboard.html';
  } else {
    msg.classList.add('show');
  }
}

function socialLogin(provider) {
  sessionStorage.setItem('lumina_user', JSON.stringify({ name: provider + ' User', email: provider.toLowerCase() + '@social.com' }));
  window.location.href = 'dashboard.html';
}

/* ── LOGOUT MODAL ── */
function showLogout() {
  const m = document.getElementById('logout-modal');
  if (m) m.classList.add('show');
}
function hideLogout() {
  const m = document.getElementById('logout-modal');
  if (m) m.classList.remove('show');
}
function confirmLogout() {
  sessionStorage.removeItem('lumina_user');
  window.location.href = 'index.html';
}

/* ── CONTACT FORM ── */
function submitContact() {
  const el = document.getElementById('contact-success');
  if (el) {
    el.classList.add('show');
    setTimeout(() => el.classList.remove('show'), 5000);
  }
}

/* ── AUTH GUARD (dashboard only) ── */
function requireAuth() {
  const user = sessionStorage.getItem('lumina_user');
  if (!user) { window.location.href = 'index.html'; return null; }
  return JSON.parse(user);
}

/* ── INIT ── */
document.addEventListener('DOMContentLoaded', () => {
  // Highlight active nav link based on current page
  const page = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && href === page) a.classList.add('active');
  });

  // Enter key on login password
  const passInput = document.getElementById('login-pass');
  if (passInput) passInput.addEventListener('keydown', e => { if (e.key === 'Enter') handleLogin(); });

  // Dashboard: populate user info
  const dashName = document.getElementById('dash-name');
  if (dashName) {
    const user = requireAuth();
    if (!user) return;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    dashName.textContent = greeting + ', ' + user.name;
    const emailEl = document.getElementById('profile-email');
    if (emailEl) emailEl.textContent = user.email;
    const nameEl = document.getElementById('profile-name');
    if (nameEl) nameEl.textContent = user.name + ' (Lumina User)';
  }
});
