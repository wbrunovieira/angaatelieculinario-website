"use client";

import { useEffect, useRef, type RefObject } from "react";
import { Renderer, Program, Mesh, Triangle, Texture } from "ogl";
import { reducedMotion } from "@/lib/gsap";

const vertex = /* glsl */ `
  attribute vec2 uv;
  attribute vec2 position;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

// A foto parada ganha vida: fluxo lento, ondulação que segue o cursor,
// leve aberração cromática no rastro, zoom contínuo e escurecimento ao rolar.
const fragment = /* glsl */ `
  precision highp float;
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageRes;
  uniform vec2 uMouse;
  uniform float uVelocity;
  uniform float uTime;
  uniform float uZoom;
  uniform float uDim;
  uniform float uReveal;
  varying vec2 vUv;

  vec2 cover(vec2 uv) {
    float ra = uResolution.x / uResolution.y;
    float ia = uImageRes.x / uImageRes.y;
    vec2 s = ra > ia ? vec2(1.0, ia / ra) : vec2(ra / ia, 1.0);
    vec2 focus = vec2(0.5, 0.42);
    vec2 c = 0.5 + (focus - 0.5) * (1.0 - s);
    return (uv - 0.5) * s / uZoom + c;
  }

  void main() {
    vec2 uv = vUv;
    float aspect = uResolution.x / uResolution.y;
    vec2 d = (uv - uMouse) * vec2(aspect, 1.0);
    float dist = length(d);
    float influence = smoothstep(0.5, 0.0, dist) * uVelocity;
    vec2 dir = d / max(dist, 0.0001);
    float ripple = sin(dist * 26.0 - uTime * 3.0) * 0.5 + 0.5;
    uv -= dir * influence * (0.04 + ripple * 0.02);
    uv += vec2(sin(uv.y * 5.0 + uTime * 0.35), cos(uv.x * 4.0 + uTime * 0.28)) * 0.0016;

    float ca = influence * 0.008;
    float r = texture2D(uTexture, cover(uv + dir * ca)).r;
    float g = texture2D(uTexture, cover(uv)).g;
    float b = texture2D(uTexture, cover(uv - dir * ca)).b;
    vec3 col = vec3(r, g, b);

    float v = smoothstep(1.25, 0.3, length((vUv - 0.5) * vec2(1.0, 1.25)));
    col *= mix(0.8, 1.0, v);
    col *= 1.0 - uDim * 0.75;
    col = mix(vec3(0.133, 0.188, 0.122), col, uReveal);
    gl_FragColor = vec4(col, 1.0);
  }
`;

type Props = {
  src: string;
  // 0..1: progresso da rolagem sobre o hero, lido a cada frame.
  progressRef: RefObject<number>;
  // Chamado quando a textura está pronta: o canvas pode cobrir a imagem de fallback.
  onReady?: () => void;
};

export function HeroCanvas({ src, progressRef, onReady }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || reducedMotion()) return;

    let renderer: Renderer;
    try {
      renderer = new Renderer({ canvas, dpr: Math.min(window.devicePixelRatio, 1.5), alpha: false, antialias: false });
    } catch {
      return;
    }
    const gl = renderer.gl;
    if (gl.isContextLost()) return;
    const geometry = new Triangle(gl);
    const texture = new Texture(gl, { generateMipmaps: false, minFilter: gl.LINEAR, magFilter: gl.LINEAR });
    const program = new Program(gl, {
      vertex,
      fragment,
      uniforms: {
        uTexture: { value: texture },
        uResolution: { value: [1, 1] },
        uImageRes: { value: [1, 1] },
        uMouse: { value: [0.5, 0.5] },
        uVelocity: { value: 0 },
        uTime: { value: 0 },
        uZoom: { value: 1.18 },
        uDim: { value: 0 },
        uReveal: { value: 0 },
      },
    });
    // Shader não compilou (contexto perdido, GPU sem suporte): fica a foto de fallback.
    if (!gl.getProgramParameter(program.program, gl.LINK_STATUS)) return;
    const mesh = new Mesh(gl, { geometry, program });

    const resize = () => {
      const { clientWidth: w, clientHeight: h } = canvas.parentElement ?? canvas;
      renderer.setSize(w, h);
      program.uniforms.uResolution.value = [w, h];
    };
    resize();
    window.addEventListener("resize", resize);

    const target = { x: 0.5, y: 0.5 };
    const mouse = { x: 0.5, y: 0.5 };
    let velocity = 0;
    let last = { x: 0.5, y: 0.5 };
    const onMove = (e: PointerEvent) => {
      target.x = e.clientX / window.innerWidth;
      target.y = 1 - e.clientY / window.innerHeight;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    let ready = false;
    const img = new Image();
    img.decoding = "async";
    img.src = src;
    img.onload = () => {
      texture.image = img;
      program.uniforms.uImageRes.value = [img.naturalWidth, img.naturalHeight];
      ready = true;
      onReady?.();
    };

    // O loop só roda enquanto o hero está na tela; fora dela, para de verdade.
    let raf = 0;
    let running = false;
    const start = performance.now();
    let zoomStart: number | null = null;
    const loop = (now: number) => {
      raf = requestAnimationFrame(loop);
      if (!ready) return;
      const t = (now - start) / 1000;
      if (zoomStart === null) zoomStart = t;
      const zt = Math.min((t - zoomStart) / 7, 1);
      const eased = 1 - Math.pow(1 - zt, 3);

      mouse.x += (target.x - mouse.x) * 0.08;
      mouse.y += (target.y - mouse.y) * 0.08;
      const dx = mouse.x - last.x;
      const dy = mouse.y - last.y;
      last = { ...mouse };
      velocity = Math.min(1, velocity * 0.92 + Math.hypot(dx, dy) * 9);

      const p = progressRef.current ?? 0;
      program.uniforms.uTime.value = t;
      program.uniforms.uMouse.value = [mouse.x, mouse.y];
      program.uniforms.uVelocity.value = velocity;
      program.uniforms.uZoom.value = 1.18 - 0.14 * eased + p * 0.18;
      program.uniforms.uDim.value = p;
      program.uniforms.uReveal.value = Math.min(1, program.uniforms.uReveal.value + 0.03);
      renderer.render({ scene: mesh });
    };
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting && !running) {
          running = true;
          raf = requestAnimationFrame(loop);
        } else if (!e.isIntersecting && running) {
          running = false;
          cancelAnimationFrame(raf);
        }
      },
      { threshold: 0 },
    );
    io.observe(canvas);

    // Não perde o contexto aqui: no StrictMode o efeito roda duas vezes no mesmo canvas
    // e um contexto perdido não volta. Só para o loop e solta os recursos.
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onMove);
      program.remove();
      geometry.remove();
      gl.deleteTexture(texture.texture);
    };
  }, [src, progressRef, onReady]);

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" aria-hidden />;
}
