export default function ProjectCard({ project }) {
  const { title, category, cover, slug } = project;
  return (
    <a href={`/work/${slug}`} className="group block overflow-hidden rounded-2xl shadow-soft bg-white focus:outline-none focus-visible:ring-2 focus-visible:ring-accent/60">
      <div className="relative">
        <picture className="block">
          <source srcSet={`${cover.replace('.avif','.avif')}`} type="image/avif" />
          <source srcSet={`${cover.replace('.avif','.webp')}`} type="image/webp" />
          <img loading="lazy" decoding="async" src={cover} alt={title} className="w-full h-auto block transition-transform duration-300 group-hover:scale-[1.01]" />
        </picture>
        <div className="absolute inset-0 card-overlay opacity-90" aria-hidden="true"></div>
        <div className="absolute inset-0 flex flex-col justify-end p-4 text-white">
          <div className="mb-1 inline-flex px-2 py-0.5 text-xs rounded-full bg-white/10 backdrop-blur border border-white/20">{category}</div>
          <h3 className="text-lg font-medium">{title}</h3>
          <span className="mt-2 inline-flex items-center gap-2 opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all">View Project →</span>
        </div>
      </div>
    </a>
  );
}

