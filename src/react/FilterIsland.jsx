import { useMemo, useState } from 'react';
import FilterBar from '../components/FilterBar.jsx';
import GalleryGrid from '../components/GalleryGrid.jsx';

export default function FilterIsland({ categories, items }) {
  const [active, setActive] = useState('All');
  const filtered = useMemo(() => (
    active === 'All' ? items : items.filter((i) => i.category === active)
  ), [active, items]);

  return (
    <div className="space-y-6">
      <FilterBar categories={categories} active={active} onChange={setActive} />
      <GalleryGrid items={filtered} />
    </div>
  );
}

