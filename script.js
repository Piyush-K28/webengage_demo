const DEMO_EMAIL    = 'user@lumina.com';
const DEMO_PASS     = 'lumina123';
const SPECIAL_EMAIL = 'piyush.khopade@webengage.com';
const SPECIAL_PASS  = 'web';
let isLoggedIn      = false;

function navigate(page) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-' + page).classList.add('active');

  document.getElementById('nav-guest').style.display = isLoggedIn ? 'none' : 'flex';
  document.getElementById('nav-user').style.display  = isLoggedIn ? 'flex' : 'none';

  document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
  const map = { about: 'About us', contact: 'Contact', dashboard: 'Dashboard' };
  if (map[page]) {
    document.querySelectorAll('.nav-links a').forEach(a => {
      if (a.textContent.trim() === map[page]) a.classList.add('active');
    });
  }
  window.scrollTo(0, 0);
}

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

  // Special credentials bypass the minimum-length check
  const isSpecialUser = email === SPECIAL_EMAIL && pass === SPECIAL_PASS;

  if (!isSpecialUser && (!pass || pass.length < 6)) {
    errP.classList.add('show');
    document.getElementById('login-pass').classList.add('err');
    valid = false;
  }
  if (!valid) return;

  if (isSpecialUser) {
    isLoggedIn = true;
    alert('User has logged in!');
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    document.getElementById('dash-name').textContent = greeting + ', Piyush';
    document.getElementById('profile-email').textContent = email;
    navigate('dashboard');
  } else if (email === DEMO_EMAIL && pass === DEMO_PASS) {
    isLoggedIn = true;
    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    document.getElementById('dash-name').textContent = greeting + ', Alex';
    document.getElementById('profile-email').textContent = email;
    navigate('dashboard');
  } else {
    msg.classList.add('show');
  }
}

function socialLogin(provider) {
  isLoggedIn = true;
  document.getElementById('dash-name').textContent = 'Welcome, ' + provider + ' user';
  navigate('dashboard');
}

function showLogout()    { document.getElementById('logout-modal').classList.add('show'); }
function hideLogout()    { document.getElementById('logout-modal').classList.remove('show'); }
function confirmLogout() {
  hideLogout();
  isLoggedIn = false;
  document.getElementById('login-email').value = '';
  document.getElementById('login-pass').value  = '';
  document.getElementById('login-msg').classList.remove('show');
  navigate('login');
}

function submitContact() {
  document.getElementById('contact-success').classList.add('show');
  setTimeout(() => document.getElementById('contact-success').classList.remove('show'), 5000);
}

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('login-pass').addEventListener('keydown', e => {
    if (e.key === 'Enter') handleLogin();
  });
});