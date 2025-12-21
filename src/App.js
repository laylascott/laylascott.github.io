import React from "react";
import { Routes, Route } from "react-router-dom";

// Pages (you'll create these next)
import Home from "./pages/Home.jsx";

import Blog from "./pages/Blog.jsx";

// Existing route you already had
import GiftCardPage from "./components/Gift.jsx"

export default function App() {
  return (
    <Routes>
      {/* Main site pages */}
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />

      <Route path="/:slug" element={<GiftCardPage />} />

      <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
    </Routes>
  );
}
