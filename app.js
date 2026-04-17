const form = document.getElementById('form');
const previewPane = document.getElementById('previewPane');
const markdownPane = document.getElementById('markdownPane');
const stackGroupsEl = document.getElementById('stackGroups');

const DEFAULTS = {
  name: '',
  tagline: '',
  username: '',
  location: '',
  bio: '',
  working: '',
  learning: '',
  open: '',
  website: '',
  email: '',
  twitter: '',
  linkedin: '',
  mastodon: '',
  bluesky: '',
  stack: [],
  showStats: false,
  showLangs: false,
  showStreak: false,
  hideBorder: false,
  theme: 'default',
  useEmoji: false,
  centerHeader: false,
  badgeStyle: false
};

const PRESETS = {
  minimal: {
    name: 'Ada Lovelace',
    tagline: 'Mathematician who writes code',
    username: 'adalovelace',
    location: 'London, UK',
    bio: 'I build tools for symbolic computation and write about the overlap between maths and software.',
    website: 'https://example.com',
    stack: ['TypeScript', 'Python', 'Rust'],
    showStats: false,
    useEmoji: false,
    centerHeader: false,
    badgeStyle: true,
    theme: 'default'
  },
  developer: {
    name: 'Ada Lovelace',
    tagline: 'Full-stack developer',
    username: 'adalovelace',
    bio: 'Building web apps and small developer tools. Open to interesting problems.',
    working: 'a better way to write SQL migrations',
    learning: 'Rust, distributed systems',
    website: 'https://example.com',
    email: 'hello@example.com',
    stack: ['TypeScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    showStats: true,
    showLangs: true,
    theme: 'github_dark',
    badgeStyle: true
  },
  classic: {
    name: 'Ada Lovelace',
    tagline: 'Software engineer',
    username: 'adalovelace',
    bio: 'I write code.',
    working: 'a side project',
    learning: 'something new',
    stack: ['JavaScript', 'Python', 'Git'],
    showStats: true,
    showLangs: true,
    showStreak: true,
    useEmoji: true,
    centerHeader: true,
    theme: 'dark'
  },
  blank: {}
};

let state = { ...DEFAULTS };

function renderStackGroups() {
  stackGroupsEl.innerHTML = '';
  for (const group of window.STACK) {
    const details = document.createElement('details');
    details.className = 'stack-group';
    const summary = document.createElement('summary');
    summary.textContent = group.group;
    details.appendChild(summary);
    const grid = document.createElement('div');
    grid.className = 'stack-grid';
    for (const item of group.items) {
      const id = 'stack-' + item.name.replace(/\W/g, '');
      const wrap = document.createElement('label');
      wrap.className = 'stack-item';
      wrap.innerHTML = `<input type="checkbox" id="${id}" value="${item.name}"> <span>${item.name}</span>`;
      grid.appendChild(wrap);
    }
    details.appendChild(grid);
    stackGroupsEl.appendChild(details);
  }
}

function readForm() {
  const data = new FormData(form);
  const next = { ...DEFAULTS };
  for (const key of Object.keys(DEFAULTS)) {
    if (key === 'stack') continue;
    if (typeof DEFAULTS[key] === 'boolean') {
      next[key] = form.elements[key]?.checked || false;
    } else {
      next[key] = (data.get(key) || '').toString().trim();
    }
  }
  next.stack = Array.from(stackGroupsEl.querySelectorAll('input[type=checkbox]:checked')).map(el => el.value);
  return next;
}

function writeForm(s) {
  for (const key of Object.keys(DEFAULTS)) {
    const el = form.elements[key];
    if (!el) continue;
    if (typeof DEFAULTS[key] === 'boolean') {
      el.checked = !!s[key];
    } else if (key !== 'stack') {
      el.value = s[key] || '';
    }
  }
  const picked = new Set(s.stack || []);
  stackGroupsEl.querySelectorAll('input[type=checkbox]').forEach(el => {
    el.checked = picked.has(el.value);
  });
}

function badge(item, flat) {
  const style = flat ? 'flat-square' : 'for-the-badge';
  const label = encodeURIComponent(item.name);
  return `![${item.name}](https://img.shields.io/badge/${label}-${item.color}?style=${style}&logo=${item.slug}&logoColor=${item.fg})`;
}

function findStackItem(name) {
  for (const group of window.STACK) {
    for (const item of group.items) {
      if (item.name === name) return item;
    }
  }
  return null;
}

function statsUrl(s, endpoint, extra = '') {
  const params = new URLSearchParams();
  params.set('username', s.username);
  if (s.theme && s.theme !== 'default') params.set('theme', s.theme);
  if (s.hideBorder) params.set('hide_border', 'true');
  if (endpoint === 'top-langs') params.set('layout', 'compact');
  const base = endpoint === 'streak'
    ? 'https://streak-stats.demolab.com/?user=' + encodeURIComponent(s.username)
    : 'https://github-readme-stats.vercel.app/api' + (endpoint === 'top-langs' ? '/top-langs/' : '');
  if (endpoint === 'streak') {
    const p = new URLSearchParams();
    if (s.theme && s.theme !== 'default') p.set('theme', s.theme);
    if (s.hideBorder) p.set('hide_border', 'true');
    const qs = p.toString();
    return base + (qs ? '&' + qs : '');
  }
  return base + '?' + params.toString() + extra;
}

function buildMarkdown(s) {
  const e = s.useEmoji;
  const lines = [];
  const center = s.centerHeader;

  if (s.name || s.tagline) {
    if (center) lines.push('<div align="center">', '');
    const heading = e && s.name ? `# Hi, I'm ${s.name} 👋` : (s.name ? `# ${s.name}` : '');
    if (heading) lines.push(heading);
    if (s.tagline) lines.push('', s.tagline);
    if (s.location) lines.push('', `${e ? '📍 ' : ''}${s.location}`);
    if (center) lines.push('', '</div>');
    lines.push('');
  }

  if (s.bio) {
    lines.push(s.bio, '');
  }

  const about = [];
  if (s.working) about.push(`${e ? '🔭 ' : ''}Currently working on **${s.working}**`);
  if (s.learning) about.push(`${e ? '🌱 ' : ''}Learning **${s.learning}**`);
  if (s.open) about.push(`${e ? '👯 ' : ''}Open to **${s.open}**`);
  if (about.length) {
    for (const a of about) lines.push('- ' + a);
    lines.push('');
  }

  if (s.stack.length) {
    lines.push('## Stack', '');
    const flat = !!s.badgeStyle;
    const badges = s.stack
      .map(findStackItem)
      .filter(Boolean)
      .map(it => badge(it, flat));
    lines.push(badges.join(' '));
    lines.push('');
  }

  const contact = [];
  if (s.website) contact.push(`[Website](${s.website})`);
  if (s.email) contact.push(`[Email](mailto:${s.email})`);
  if (s.twitter) contact.push(`[X](https://x.com/${s.twitter.replace(/^@/, '')})`);
  if (s.linkedin) contact.push(`[LinkedIn](https://linkedin.com/${s.linkedin.replace(/^\//, '')})`);
  if (s.mastodon) contact.push(`[Mastodon](${s.mastodon})`);
  if (s.bluesky) contact.push(`[Bluesky](https://bsky.app/profile/${s.bluesky.replace(/^@/, '')})`);
  if (contact.length) {
    lines.push('## Elsewhere', '');
    lines.push(contact.join(' · '));
    lines.push('');
  }

  const cards = [];
  if (s.username) {
    if (s.showStats) cards.push(`![stats](${statsUrl(s, 'stats')})`);
    if (s.showLangs) cards.push(`![top langs](${statsUrl(s, 'top-langs')})`);
    if (s.showStreak) cards.push(`![streak](${statsUrl(s, 'streak')})`);
  }
  if (cards.length) {
    lines.push('## GitHub', '');
    lines.push(cards.join('\n'));
    lines.push('');
  }

  return lines.join('\n').replace(/\n{3,}/g, '\n\n').trim() + '\n';
}

function escapeHtml(s) {
  return s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
}

function renderPreview(s) {
  // Render from state directly - this mirrors the markdown but with proper HTML.
  const e = s.useEmoji;
  const parts = [];
  const center = s.centerHeader;

  const openCenter = center ? '<div class="center">' : '';
  const closeCenter = center ? '</div>' : '';

  if (s.name) {
    parts.push(openCenter + `<h1>${escapeHtml(e ? `Hi, I'm ${s.name} 👋` : s.name)}</h1>` + closeCenter);
  }
  if (s.tagline || s.location) {
    const bits = [];
    if (s.tagline) bits.push(escapeHtml(s.tagline));
    if (s.location) bits.push(`${e ? '📍 ' : ''}${escapeHtml(s.location)}`);
    parts.push(`${openCenter}<p>${bits.join('<br>')}</p>${closeCenter}`);
  }
  if (s.bio) parts.push(`<p>${escapeHtml(s.bio)}</p>`);

  const about = [];
  if (s.working) about.push(`${e ? '🔭 ' : ''}Currently working on <strong>${escapeHtml(s.working)}</strong>`);
  if (s.learning) about.push(`${e ? '🌱 ' : ''}Learning <strong>${escapeHtml(s.learning)}</strong>`);
  if (s.open) about.push(`${e ? '👯 ' : ''}Open to <strong>${escapeHtml(s.open)}</strong>`);
  if (about.length) parts.push('<ul>' + about.map(a => `<li>${a}</li>`).join('') + '</ul>');

  if (s.stack.length) {
    const flat = !!s.badgeStyle;
    const badges = s.stack.map(findStackItem).filter(Boolean)
      .map(it => `<img src="https://img.shields.io/badge/${encodeURIComponent(it.name)}-${it.color}?style=${flat ? 'flat-square' : 'for-the-badge'}&logo=${it.slug}&logoColor=${it.fg}" alt="${escapeHtml(it.name)}">`);
    parts.push('<h2>Stack</h2><p class="badges">' + badges.join(' ') + '</p>');
  }

  const contact = [];
  if (s.website) contact.push(`<a href="${escapeHtml(s.website)}">Website</a>`);
  if (s.email) contact.push(`<a href="mailto:${escapeHtml(s.email)}">Email</a>`);
  if (s.twitter) contact.push(`<a href="https://x.com/${escapeHtml(s.twitter.replace(/^@/, ''))}">X</a>`);
  if (s.linkedin) contact.push(`<a href="https://linkedin.com/${escapeHtml(s.linkedin.replace(/^\//, ''))}">LinkedIn</a>`);
  if (s.mastodon) contact.push(`<a href="${escapeHtml(s.mastodon)}">Mastodon</a>`);
  if (s.bluesky) contact.push(`<a href="https://bsky.app/profile/${escapeHtml(s.bluesky.replace(/^@/, ''))}">Bluesky</a>`);
  if (contact.length) parts.push('<h2>Elsewhere</h2><p>' + contact.join(' · ') + '</p>');

  if (s.username) {
    const cards = [];
    if (s.showStats) cards.push(`<img src="${statsUrl(s, 'stats')}" alt="stats">`);
    if (s.showLangs) cards.push(`<img src="${statsUrl(s, 'top-langs')}" alt="top langs">`);
    if (s.showStreak) cards.push(`<img src="${statsUrl(s, 'streak')}" alt="streak">`);
    if (cards.length) parts.push('<h2>GitHub</h2><div class="cards">' + cards.join('') + '</div>');
  }

  if (!parts.length) {
    return '<p class="empty">Start filling in the form on the left. The preview updates as you type.</p>';
  }
  return parts.join('\n');
}

function update() {
  state = readForm();
  markdownPane.textContent = buildMarkdown(state);
  previewPane.innerHTML = renderPreview(state);
  persist();
}

function persist() {
  try {
    localStorage.setItem('profile-readme', JSON.stringify(state));
  } catch {}
}

function loadSaved() {
  try {
    const raw = localStorage.getItem('profile-readme');
    if (!raw) return null;
    return JSON.parse(raw);
  } catch { return null; }
}

function decodeHash() {
  if (!location.hash.startsWith('#s=')) return null;
  try {
    const b64 = location.hash.slice(3);
    const json = decodeURIComponent(escape(atob(b64.replace(/-/g, '+').replace(/_/g, '/'))));
    return JSON.parse(json);
  } catch { return null; }
}

function encodeShare(s) {
  const json = JSON.stringify(s);
  const b64 = btoa(unescape(encodeURIComponent(json)))
    .replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
  return location.origin + location.pathname + '#s=' + b64;
}

function apply(s) {
  const merged = { ...DEFAULTS, ...(s || {}) };
  writeForm(merged);
  update();
}

form.addEventListener('input', update);
form.addEventListener('change', update);

document.querySelectorAll('[data-preset]').forEach(btn => {
  btn.addEventListener('click', () => apply(PRESETS[btn.dataset.preset]));
});

document.querySelectorAll('.tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    tab.classList.add('active');
    const which = tab.dataset.tab;
    previewPane.classList.toggle('hidden', which !== 'preview');
    markdownPane.classList.toggle('hidden', which !== 'markdown');
  });
});

function flash(btn, msg) {
  const original = btn.textContent;
  btn.textContent = msg;
  setTimeout(() => { btn.textContent = original; }, 1200);
}

document.getElementById('copyBtn').addEventListener('click', e => {
  navigator.clipboard.writeText(markdownPane.textContent).then(() => flash(e.target, 'Copied'));
});

document.getElementById('shareBtn').addEventListener('click', e => {
  const url = encodeShare(state);
  history.replaceState(null, '', url);
  navigator.clipboard.writeText(url).then(() => flash(e.target, 'Link copied'));
});

document.getElementById('resetBtn').addEventListener('click', () => {
  if (!confirm('Clear everything?')) return;
  localStorage.removeItem('profile-readme');
  apply(DEFAULTS);
  history.replaceState(null, '', location.pathname);
});

renderStackGroups();
const fromHash = decodeHash();
const saved = loadSaved();
if (fromHash) apply(fromHash);
else if (saved) apply(saved);
else apply(PRESETS.developer);
