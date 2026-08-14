import { lazy } from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";

// Lazy-loaded so each page ships as its own chunk instead of all of
// them (plus Home's Globe/d3-geo/topojson weight) bundling into one
// large file every visitor downloads regardless of which page they
// land on. Layout itself (Navbar/Footer) stays a normal import since
// it's needed on every page anyway. See the Suspense boundary in
// Layout.jsx for the loading-state handling.
const Home = lazy(() => import("./pages/Home.jsx"));
const Blog = lazy(() => import("./pages/Blog.jsx"));
const BlogPost = lazy(() => import("./pages/BlogPost.jsx"));
const FindAJob = lazy(() => import("./pages/FindAJob.jsx"));
const StartHiring = lazy(() => import("./pages/StartHiring.jsx"));
const Pricing = lazy(() => import("./pages/Pricing.jsx"));
const Terms = lazy(() => import("./pages/Terms.jsx"));
const Privacy = lazy(() => import("./pages/Privacy.jsx"));
const NotFound = lazy(() => import("./pages/NotFound.jsx"));

// Every route renders inside Layout (navbar + footer); only the middle
// changes. Home keeps the original ten-section document; the rest are
// the new pages (blog, legal, and the find-a-job/start-hiring split).
export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/find-a-job" element={<FindAJob />} />
        <Route path="/start-hiring" element={<StartHiring />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
