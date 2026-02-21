import React from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home.jsx";

import Blog from "./pages/Blog.jsx";
import AdoptableDogPage from "./pages/Coco.jsx";


export default function App() {
  return (
    <Routes>
      {/* Main site pages */}
      <Route path="/" element={<Home />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/adopt/coco" element={<AdoptableDogPage />} />
      <Route path="*" element={<div style={{ padding: 24 }}>Not found</div>} />
      
    </Routes>
  );
}