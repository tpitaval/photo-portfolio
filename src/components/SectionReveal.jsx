import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionReveal({ children, delay = 0, stagger = 0.08, once = true }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ctx = gsap.context(() => {
      gsap.set(el, { opacity: 0, y: 24 });
      gsap.to(el, {
        opacity: 1,
        y: 0,
        duration: 0.6,
        delay,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: once ? 'play none none none' : 'play none none reset',
        },
        stagger,
      });
    }, el);

    return () => ctx.revert();
  }, [delay, stagger, once]);

  return <div ref={ref}>{children}</div>;
}

