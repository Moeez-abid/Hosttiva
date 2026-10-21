// Shared motion system for every page. Declarative hooks, no per-page JS:
//   .reveal               fade/rise/unblur when scrolled into view
//   [data-stagger]        children with .reveal enter in sequence (capped)
//   [data-split]          heading words rise in from a mask (on view, or immediately with data-split="now")
//   [data-tilt]           3D tilt toward the pointer with a soft glare (fine pointers only)
//   [data-count]          numbers count up once when in view (keeps prefix/suffix/decimals)
// Content is visible by default; html.motion (set in Base.astro only when motion is allowed) arms the effects.

type Cleanup = () => void;
let cleanups: Cleanup[] = [];

const STAGGER_MS = 70;
const STAGGER_CAP_MS = 560;

function onView(els: Element[], cb: (el: Element) => void, rootMargin = '0px 0px -12% 0px') {
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) { cb(e.target); io.unobserve(e.target); }
    });
  }, { rootMargin, threshold: 0.12 });
  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

function staggers() {
  document.querySelectorAll<HTMLElement>('[data-stagger]').forEach((group) => {
    group.querySelectorAll<HTMLElement>(':scope > .reveal, :scope > * > .reveal').forEach((el, i) => {
      el.style.setProperty('--delay', `${Math.min(i * STAGGER_MS, STAGGER_CAP_MS)}ms`);
    });
  });
}

function splitWords(el: HTMLElement) {
  if (el.dataset.splitDone) return;
  el.dataset.splitDone = '1';
  let i = 0;
  const walk = (node: Node) => {
    [...node.childNodes].forEach((child) => {
      if (child.nodeType === Node.TEXT_NODE) {
        const parts = (child.textContent ?? '').split(/(\s+)/);
        const frag = document.createDocumentFragment();
        parts.forEach((p) => {
          if (!p) return;
          if (/^\s+$/.test(p)) { frag.append(document.createTextNode(p)); return; }
          const outer = document.createElement('span');
          outer.className = 'w';
          const inner = document.createElement('span');
          inner.className = 'wi';
          inner.style.setProperty('--wi', String(i++));
          inner.textContent = p;
          outer.append(inner);
          frag.append(outer);
        });
        child.replaceWith(frag);
      } else if (child.nodeType === Node.ELEMENT_NODE && (child as Element).tagName !== 'BR') {
        walk(child);
      }
    });
  };
  walk(el);
}

function splits() {
  const now: HTMLElement[] = [];
  const later: HTMLElement[] = [];
  document.querySelectorAll<HTMLElement>('[data-split]').forEach((el) => {
    splitWords(el);
    (el.dataset.split === 'now' ? now : later).push(el);
  });
  requestAnimationFrame(() => now.forEach((el) => el.classList.add('in')));
  onView(later, (el) => el.classList.add('in'));
}

function reveals() {
  onView([...document.querySelectorAll('.reveal')], (el) => el.classList.add('in'));
}

function tilts() {
  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll<HTMLElement>('[data-tilt]').forEach((el) => {
    const max = Number(el.dataset.tilt || 6);
    let raf = 0;
    const move = (e: PointerEvent) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width;
      const y = (e.clientY - r.top) / r.height;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty('--rx', `${(0.5 - y) * max}deg`);
        el.style.setProperty('--ry', `${(x - 0.5) * max}deg`);
        el.style.setProperty('--gx', `${x * 100}%`);
        el.style.setProperty('--gy', `${y * 100}%`);
      });
    };
    const enter = () => el.classList.add('tilting');
    const leave = () => {
      cancelAnimationFrame(raf);
      el.classList.remove('tilting');
      el.style.setProperty('--rx', '0deg');
      el.style.setProperty('--ry', '0deg');
    };
    el.addEventListener('pointerenter', enter);
    el.addEventListener('pointermove', move);
    el.addEventListener('pointerleave', leave);
    cleanups.push(() => {
      el.removeEventListener('pointerenter', enter);
      el.removeEventListener('pointermove', move);
      el.removeEventListener('pointerleave', leave);
    });
  });
}

function counts() {
  const els = [...document.querySelectorAll<HTMLElement>('[data-count]')];
  onView(els, (node) => {
    const el = node as HTMLElement;
    const text = el.textContent ?? '';
    const m = /^(\D*)([\d,]+(?:\.\d+)?)(.*)$/s.exec(text);
    if (!m) return;
    const [, pre, num, post] = m;
    const target = parseFloat(num.replace(/,/g, ''));
    const decimals = (num.split('.')[1] ?? '').length;
    const dur = 1100;
    const t0 = performance.now();
    el.style.minWidth = `${el.getBoundingClientRect().width}px`; // no layout shift
    const step = (now: number) => {
      const p = Math.min(1, (now - t0) / dur);
      const e = 1 - Math.pow(2, -10 * p);
      el.textContent = `${pre}${(target * e).toFixed(decimals)}${post}`;
      if (p < 1) requestAnimationFrame(step);
      else el.textContent = text;
    };
    requestAnimationFrame(step);
  }, '0px 0px -8% 0px');
}

// Border spotlight that follows the cursor across any .tile / .tile-surface (one delegated listener).
let spotlightBound = false;
function spotlight() {
  if (spotlightBound || !matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  spotlightBound = true;
  document.addEventListener('pointermove', (e) => {
    const el = (e.target as Element | null)?.closest<HTMLElement>('.tile, .tile-surface') ?? null;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty('--mx', `${e.clientX - r.left}px`);
    el.style.setProperty('--my', `${e.clientY - r.top}px`);
  }, { passive: true });
}

// Pause decorative CSS loops (LEDs, packets, heartbeat) while their scene is off screen.
function pauseOffscreen() {
  const els = [...document.querySelectorAll<HTMLElement>('.pv, .status-card, .hero-stage')];
  if (!els.length) return;
  const io = new IntersectionObserver((entries) => {
    entries.forEach((e) => e.target.classList.toggle('is-offscreen', !e.isIntersecting));
  }, { rootMargin: '100px' });
  els.forEach((el) => io.observe(el));
  cleanups.push(() => io.disconnect());
}

export function initMotion() {
  cleanups.forEach((c) => c());
  cleanups = [];
  const html = document.documentElement;
  (window as unknown as { __motion: boolean }).__motion = true;
  spotlight();
  if (!html.classList.contains('motion')) return; // reduced motion: everything stays static and visible
  staggers();
  splits();
  reveals();
  pauseOffscreen();
  tilts();
  counts();
}
