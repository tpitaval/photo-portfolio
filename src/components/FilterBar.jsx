import { useEffect, useRef } from 'react';

export default function FilterBar({ categories, active, onChange }) {
  const listRef = useRef(null);

  useEffect(() => {
    const el = listRef.current;
    if (!el) return;
    const onKey = (e) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
      e.preventDefault();
      const idx = categories.indexOf(active);
      const next = e.key === 'ArrowRight' ? (idx + 1) % categories.length : (idx - 1 + categories.length) % categories.length;
      onChange(categories[next]);
    };
    el.addEventListener('keydown', onKey);
    return () => el.removeEventListener('keydown', onKey);
  }, [categories, active, onChange]);

  return (
    <div ref={listRef} role="radiogroup" aria-label="Filter projects" className="flex flex-wrap gap-2">
      {categories.map((c) => (
        <button
          key={c}
          role="radio"
          aria-checked={active === c}
          aria-pressed={active === c}
          className={`btn ${active === c ? 'btn-primary' : 'btn-ghost'}`}
          onClick={() => onChange(c)}
        >
          {c}
        </button>
      ))}
    </div>
  );
}

