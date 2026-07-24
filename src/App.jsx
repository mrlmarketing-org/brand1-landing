import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Home from "./pages/Home.jsx";
import Blog from "./pages/Blog.jsx";
import BlogPost from "./pages/BlogPost.jsx";
import FindAJob from "./pages/FindAJob.jsx";
import StartHiring from "./pages/StartHiring.jsx";
import Terms from "./pages/Terms.jsx";
import Privacy from "./pages/Privacy.jsx";
import NotFound from "./pages/NotFound.jsx";

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
        <Route path="/terms" element={<Terms />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
