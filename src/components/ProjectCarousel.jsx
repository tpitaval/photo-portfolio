import { useEffect, useRef } from 'react';

export default function ProjectCarousel({ projects = [] }) {
  const containerRef = useRef(null);
  const animationFrameRef = useRef(null);
  const rotationRef = useRef(0);
  const isVisibleRef = useRef(true);

  useEffect(() => {
    if (!projects.length || !containerRef.current) return;

    const container = containerRef.current;
    const items = container.querySelectorAll('.carousel-item');
    const totalItems = items.length;
    const angleStep = 360 / totalItems;
    const radius = 350; // Distance from center

    // Intersection Observer to optimize performance
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisibleRef.current = entry.isIntersecting;
        });
      },
      { threshold: 0.1 }
    );

    if (container.parentElement) {
      observer.observe(container.parentElement);
    }

    function rotate() {
      if (!isVisibleRef.current) {
        animationFrameRef.current = requestAnimationFrame(rotate);
        return;
      }

      rotationRef.current += 0.4; // Rotation speed (degrees per frame)
      
      items.forEach((item, index) => {
        const angle = (angleStep * index + rotationRef.current) * (Math.PI / 180);
        const x = Math.sin(angle) * radius;
        const z = Math.cos(angle) * radius;
        
        // Calculate opacity based on z position (items closer to viewer are more visible)
        // z ranges from -radius to +radius
        const normalizedZ = (z + radius) / (radius * 2); // Normalize to 0-1
        const opacity = Math.max(0.15, Math.min(1, normalizedZ));
        const scale = 0.4 + (normalizedZ * 0.6); // Scale from 0.4 to 1.0
        
        // Apply 3D transforms
        item.style.transform = `
          translateZ(${z}px) 
          translateX(${x}px) 
          scale(${scale})
          rotateY(${-angle * (180 / Math.PI)}deg)
        `;
        item.style.opacity = opacity;
      });

      animationFrameRef.current = requestAnimationFrame(rotate);
    }

    // Start animation
    rotate();

    return () => {
      observer.disconnect();
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [projects]);

  if (!projects.length) return null;

  return (
    <div 
      className="project-carousel-wrapper"
      style={{
        perspective: '1400px',
        perspectiveOrigin: 'center center',
        width: '100%',
        height: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        ref={containerRef}
        className="carousel-container"
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          transformStyle: 'preserve-3d',
          width: '100%',
          height: '100%',
          willChange: 'transform',
        }}
      >
        {projects.map((project, index) => {
          const initialAngle = (360 / projects.length) * index * (Math.PI / 180);
          const initialX = Math.sin(initialAngle) * 350;
          const initialZ = Math.cos(initialAngle) * 350;
          const initialOpacity = Math.max(0.15, Math.min(1, (initialZ + 350) / 700));
          
          return (
            <div
              key={project.slug || index}
              className="carousel-item"
              style={{
                position: 'absolute',
                width: '220px',
                height: '320px',
                left: '50%',
                top: '50%',
                marginLeft: '-110px',
                marginTop: '-160px',
                transform: `translateZ(${initialZ}px) translateX(${initialX}px) scale(${0.4 + initialOpacity * 0.6})`,
                transformStyle: 'preserve-3d',
                transition: 'none',
                willChange: 'transform, opacity',
              }}
            >
              <a
                href={`/work/${project.slug}`}
                className="block w-full h-full rounded-2xl overflow-hidden shadow-2xl group"
                style={{
                  display: 'block',
                  width: '100%',
                  height: '100%',
                  backdropFilter: 'blur(10px)',
                }}
              >
                <img
                  src={project.cover}
                  alt={project.title || `Project ${index + 1}`}
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  loading="lazy"
                  style={{
                    filter: 'brightness(0.95) contrast(1.05)',
                  }}
                />
              </a>
            </div>
          );
        })}
      </div>
    </div>
  );
}

