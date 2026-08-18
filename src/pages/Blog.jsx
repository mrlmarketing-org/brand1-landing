import { Link } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import { blogPosts } from "../data/blogPosts.js";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function Blog() {
  return (
    <>
      <SEO
        title="Blog"
        path="/blog"
        description="Notes on hiring remote talent well — vetting, pricing, and what actually goes wrong."
      />

      <header className="page-hero">
        <div className="container">
          <Reveal>
            <span className="eyebrow eyebrow-shine">Blog</span>
            <h1>Notes on hiring remote talent well</h1>
            <p className="subhead">
              What we've learned vetting, placing, and managing remote hires —
              for our own companies and yours.
            </p>
          </Reveal>
        </div>
      </header>

      <section className="section">
        <div className="container">
          <div className="blog-grid">
            {blogPosts.map((post, i) => (
              <Reveal key={post.slug} delay={i * 0.06}>
                <Link to={`/blog/${post.slug}`} className="blog-card">
                  <div className="blog-card-photo">
                    <img src={post.photo} alt="" />
                  </div>
                  <div className="blog-card-body">
                    <span className="blog-card-date">{dateFormatter.format(new Date(post.date))}</span>
                    <h3>{post.title}</h3>
                    <p>{post.excerpt}</p>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
