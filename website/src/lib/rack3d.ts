// Hero 3D scene: server units slide into a rack and boot, then idle with pointer parallax.
// Loaded on demand from the homepage; the SVG rack stays as the no-WebGL / reduced-motion fallback.
import {
  ACESFilmicToneMapping,
  AmbientLight,
  BoxGeometry,
  CircleGeometry,
  Color,
  DirectionalLight,
  Group,
  Mesh,
  MeshBasicMaterial,
  MeshStandardMaterial,
  PerspectiveCamera,
  PMREMGenerator,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';

const UNITS = 7;
const UNIT_H = 0.42;
const GAP = 0.06;
const W = 4.2;
const D = 2.4;

const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

export function mountRack(canvas: HTMLCanvasElement, opts: { reducedMotion: boolean; onReady?: () => void }) {
  const renderer = new WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.outputColorSpace = SRGBColorSpace;
  renderer.toneMapping = ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.05;

  const scene = new Scene();
  const pmrem = new PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  const camera = new PerspectiveCamera(30, 2, 0.1, 100);
  camera.position.set(0, 0.5, 10);
  camera.lookAt(0, 0, 0);

  scene.add(new AmbientLight(0xffffff, 0.25));
  const key = new DirectionalLight(0xffffff, 1.4);
  key.position.set(4, 6, 8);
  scene.add(key);
  const rim = new DirectionalLight(new Color('#2997ff'), 2.2);
  rim.position.set(-6, 2, -4);
  scene.add(rim);

  // ── Rack frame ──────────────────────────────────────────────
  const rack = new Group();
  scene.add(rack);
  const frameMat = new MeshStandardMaterial({ color: '#141416', metalness: 0.85, roughness: 0.35 });
  const innerH = UNITS * (UNIT_H + GAP) + GAP;
  const sideGeo = new RoundedBoxGeometry(0.18, innerH + 0.36, D + 0.2, 3, 0.05);
  for (const x of [-(W / 2 + 0.09), W / 2 + 0.09]) {
    const side = new Mesh(sideGeo, frameMat);
    side.position.x = x;
    rack.add(side);
  }
  const capGeo = new RoundedBoxGeometry(W + 0.36, 0.18, D + 0.2, 3, 0.05);
  for (const y of [innerH / 2 + 0.09, -(innerH / 2 + 0.09)]) {
    const cap = new Mesh(capGeo, frameMat);
    cap.position.y = y;
    rack.add(cap);
  }
  const back = new Mesh(new BoxGeometry(W, innerH, 0.06), new MeshStandardMaterial({ color: '#0b0b0c', roughness: 0.9 }));
  back.position.z = -D / 2;
  rack.add(back);

  // ── Server units ────────────────────────────────────────────
  const bodyMat = new MeshStandardMaterial({ color: '#232326', metalness: 0.9, roughness: 0.28 });
  const faceMat = new MeshStandardMaterial({ color: '#1a1a1c', metalness: 0.6, roughness: 0.45 });
  const bayMat = new MeshStandardMaterial({ color: '#0c0c0d', metalness: 0.3, roughness: 0.7 });
  const ventMat = new MeshStandardMaterial({ color: '#2e2e32', metalness: 0.7, roughness: 0.4 });
  const bodyGeo = new RoundedBoxGeometry(W - 0.08, UNIT_H, D - 0.1, 3, 0.03);
  const bayGeo = new RoundedBoxGeometry(0.22, UNIT_H * 0.62, 0.04, 2, 0.015);
  const ventGeo = new BoxGeometry(0.62, 0.025, 0.02);
  const ledGeo = new CircleGeometry(0.035, 16);

  type Unit = { group: Group; leds: { mat: MeshBasicMaterial; color: Color; phase: number; speed: number }[]; y: number };
  const units: Unit[] = [];
  for (let i = 0; i < UNITS; i++) {
    const g = new Group();
    const y = innerH / 2 - GAP - UNIT_H / 2 - i * (UNIT_H + GAP);
    g.position.y = y;
    g.add(new Mesh(bodyGeo, bodyMat));
    const face = new Mesh(new BoxGeometry(W - 0.12, UNIT_H - 0.06, 0.02), faceMat);
    face.position.z = D / 2 - 0.04;
    g.add(face);
    for (let b = 0; b < 10; b++) {
      const bay = new Mesh(bayGeo, bayMat);
      bay.position.set(-W / 2 + 0.32 + b * 0.27, 0, D / 2 - 0.02);
      g.add(bay);
    }
    for (let v = 0; v < 3; v++) {
      const vent = new Mesh(ventGeo, ventMat);
      vent.position.set(W / 2 - 0.85, 0.08 - v * 0.08, D / 2 - 0.02);
      g.add(vent);
    }
    const leds: Unit['leds'] = [];
    [['#30d158', 0], ['#0a84ff', 1]].forEach(([c, k]) => {
      const color = new Color(c as string);
      const mat = new MeshBasicMaterial({ color: new Color('#101012') });
      const led = new Mesh(ledGeo, mat);
      led.position.set(W / 2 - 0.36 + (k as number) * 0.13, 0.06, D / 2 + 0.001);
      g.add(led);
      leds.push({ mat, color, phase: Math.random() * Math.PI * 2, speed: 0.8 + Math.random() * 2.2 });
    });
    rack.add(g);
    units.push({ group: g, leds, y });
  }

  // ── Interaction state ───────────────────────────────────────
  const BASE_Y = -0.5;
  const BASE_X = 0.12;
  let pointerX = 0, pointerY = 0, curX = 0, curY = 0, scrollT = 0;
  const onPointer = (e: PointerEvent) => {
    pointerX = (e.clientX / window.innerWidth) * 2 - 1;
    pointerY = (e.clientY / window.innerHeight) * 2 - 1;
  };
  const onScroll = () => {
    const r = canvas.getBoundingClientRect();
    scrollT = Math.min(1, Math.max(0, 1 - (r.bottom / (window.innerHeight + r.height))));
  };
  window.addEventListener('pointermove', onPointer, { passive: true });
  window.addEventListener('scroll', onScroll, { passive: true });

  const resize = () => {
    const { clientWidth: w, clientHeight: h } = canvas;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    // Keep the rack framed on narrow screens.
    camera.position.z = w / h < 1.2 ? 14 : 10;
    camera.updateProjectionMatrix();
  };
  const ro = new ResizeObserver(resize);
  ro.observe(canvas);
  resize();

  // ── Timeline ────────────────────────────────────────────────
  const INTRO_START = 0.15, STAGGER = 0.14, SLIDE = 1.0, BOOT = 0.35;
  const introEnd = INTRO_START + STAGGER * (UNITS - 1) + SLIDE + BOOT;
  const start = performance.now();
  let raf = 0, running = false, visible = true, readyFired = false;

  function frame(now: number) {
    const t = opts.reducedMotion ? introEnd + 1 : (now - start) / 1000;

    // Units slide in from the front, one after another, then their LEDs boot.
    units.forEach((u, i) => {
      const local = Math.min(1, Math.max(0, (t - INTRO_START - i * STAGGER) / SLIDE));
      const e = easeOutExpo(local);
      u.group.position.z = (1 - e) * 4.2;
      u.group.position.x = (1 - e) * 0.35 * (i % 2 ? 1 : -1);
      u.group.rotation.y = (1 - e) * 0.25 * (i % 2 ? -1 : 1);
      const bootT = t - INTRO_START - i * STAGGER - SLIDE * 0.75;
      u.leds.forEach((l, k) => {
        let on = 0;
        if (bootT > k * 0.12) {
          const flicker = bootT < BOOT + 0.2 ? (Math.sin(bootT * 40 + k) > 0 ? 1 : 0.2) : 1;
          const idle = 0.55 + 0.45 * Math.sin(t * l.speed + l.phase);
          on = flicker * (k === 0 ? 0.85 + 0.15 * idle : idle);
        }
        l.mat.color.setRGB(0.06 + (l.color.r - 0.06) * on, 0.06 + (l.color.g - 0.06) * on, 0.07 + (l.color.b - 0.07) * on);
      });
    });

    // Camera-relative rack pose: intro swing, then pointer parallax and scroll rotation.
    const swing = easeInOutCubic(Math.min(1, t / (introEnd * 0.9)));
    curX += (pointerX - curX) * 0.05;
    curY += (pointerY - curY) * 0.05;
    rack.rotation.y = BASE_Y - (1 - swing) * 0.5 + curX * 0.22 + scrollT * 0.7;
    rack.rotation.x = BASE_X + curY * 0.06;
    rack.position.y = Math.sin(t * 0.6) * 0.04;

    renderer.render(scene, camera);
    if (!readyFired) { readyFired = true; opts.onReady?.(); }
    if (opts.reducedMotion) { running = false; return; }
    raf = requestAnimationFrame(frame);
  }

  const play = () => { if (!running && visible && !document.hidden) { running = true; raf = requestAnimationFrame(frame); } };
  const pause = () => { running = false; cancelAnimationFrame(raf); };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? play() : pause(); });
  io.observe(canvas);
  const onVis = () => (document.hidden ? pause() : play());
  document.addEventListener('visibilitychange', onVis);
  play();

  return () => {
    pause();
    io.disconnect();
    ro.disconnect();
    document.removeEventListener('visibilitychange', onVis);
    window.removeEventListener('pointermove', onPointer);
    window.removeEventListener('scroll', onScroll);
    renderer.dispose();
    pmrem.dispose();
  };
}
