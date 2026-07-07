import { Link, useParams, Navigate } from "react-router-dom";
import SEO from "../components/SEO.jsx";
import Reveal from "../components/motion/Reveal.jsx";
import { getPostBySlug } from "../data/blogPosts.js";
import { ArrowRight } from "../components/icons.jsx";

const dateFormatter = new Intl.DateTimeFormat("en-US", { month: "long", day: "numeric", year: "numeric" });

export default function BlogPost() {
  const { slug } = useParams();
  const post = getPostBySlug(slug);

  if (!post) return <Navigate to="/blog" replace />;

  return (
    <>
      <SEO title={post.title} path={`/blog/${post.slug}`} description={post.excerpt} image={post.photo} />

      <article className="section blog-post">
        <div className="container blog-post-inner">
          <Reveal>
            <Link to="/blog" className="btn-link blog-post-back">
              <span style={{ transform: "scaleX(-1)", display: "inline-flex" }}>
                <ArrowRight />
              </span>
              Back to blog
            </Link>
            <span className="blog-card-date">{dateFormatter.format(new Date(post.date))}</span>
            <h1>{post.title}</h1>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="blog-post-photo">
              <img src={post.photo} alt="" />
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="prose blog-post-body">
              {post.body.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>
          </Reveal>
        </div>
      </article>
    </>
  );
}
