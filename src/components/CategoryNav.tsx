export default function CategoryNav({
  categories,
  labels,
}: {
  categories: string[]
  labels: Record<string, string>
}) {
  return (
    <nav className="category-nav-bar" aria-label="Menu categories">
      <div className="category-nav-inner">
        {categories.map(cat => (
          <a key={cat} className="cat-nav-btn" href={`#cat-${cat}`}>
            {labels[cat] ?? cat.toUpperCase()}
          </a>
        ))}
      </div>
    </nav>
  )
}