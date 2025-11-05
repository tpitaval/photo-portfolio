import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({ smoothWheel: true, lerp: 0.1 });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    ScrollTrigger.defaults({ markers: false });

    // Note: removed pinning to avoid overlap issues when sections scroll under fixed content

    // Header compact after 60px
    const header = document.getElementById('site-header');
    const onScroll = () => {
      const y = window.scrollY || 0;
      if (!header) return;
      if (y > 60) header.classList.add('is-compact');
      else header.classList.remove('is-compact');
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    return () => {
      lenis.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return null;
}

