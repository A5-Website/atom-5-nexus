import { Routes, Route } from "react-router-dom";
import Navigation from "@/components/Navigation";

import Home from "@/pages/Home";
import Research from "@/pages/Research";
import AISolutions from "@/pages/AISolutions";
import Contact from "@/pages/Contact";
import Simulation from "@/pages/Simulation";

export default function App() {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/research" element={<Research />} />
        <Route path="/ai-solutions" element={<AISolutions />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/simulation" element={<Simulation />} />
      </Routes>
    </>
  );
}
