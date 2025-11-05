import ProjectCard from './ProjectCard.jsx';

export default function GalleryGrid({ items }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6">
      {items.map((p) => (
        <ProjectCard key={p.slug} project={p} />
      ))}
    </div>
  );
}

