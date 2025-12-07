import { createRoot } from "react-dom/client";
import Home from "./pages/Home.tsx";  // point directly to Home
import "./index.css";

createRoot(document.getElementById("root")!).render(<Home />);