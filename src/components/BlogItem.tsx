type BlogItemProps = {
  title: string
  date: string
  readTime: string
  tag: string
  summary: string
}

export function BlogItem({ title, date, readTime, tag, summary }: BlogItemProps) {
  return (
    <article className="blog-card">
      <div className="card-meta">
        <span className="pill">{tag}</span>
        <span className="meta-text">{date}</span>
        <span className="dot" />
        <span className="meta-text">{readTime}</span>
      </div>
      <h3>{title}</h3>
      <p className="card-summary">{summary}</p>
      <button className="ghost-link" type="button">
        Read article
        <span aria-hidden>→</span>
      </button>
    </article>
  )
}
