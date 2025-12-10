import { BlogItem } from '../components/BlogItem'
import { StarfieldBackground } from '../components/StarfieldBackground'
import '../App.css'
import './Blog.css'

const posts = [
  {
    title: 'Introducing Telescope 1.0',
    date: 'January 15, 2024',
    readTime: '4 min read',
    tag: 'Release',
    summary:
      "We're excited to announce Telescope 1.0, featuring improved file organization algorithms and a brand new user interface.",
  },
  {
    title: 'Best Practices for File Organization',
    date: 'December 20, 2023',
    readTime: '6 min read',
    tag: 'Guides',
    summary:
      'Learn how to get the most out of Telescope with these tips and best practices for organizing your files efficiently.',
  },
  {
    title: 'Behind the Scenes: How Telescope Works',
    date: 'November 10, 2023',
    readTime: '5 min read',
    tag: 'Engineering',
    summary:
      "A deep dive into the technology and algorithms that power Telescope's intelligent file organization system.",
  },
]

export function Blog() {
  return (
    <>
      <StarfieldBackground />
      <div className="main-content">
        <div className="content-left">
          <p className="eyebrow">Blog</p>
          <h1>Ideas, releases, and notes from the team</h1>
          <p className="subtitle">
            Stay updated with the latest news, updates, and insights about Telescope.
          </p>

          <section className="blog-list">
            {posts.map((post) => (
              <BlogItem key={post.title} {...post} />
            ))}
          </section>
        </div>
      </div>
    </>
  )
}

