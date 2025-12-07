import { createRoot } from "react-dom/client";
import { Home } from "./pages/Home.tsx"; // notice the curly braces
import "./index.css";

createRoot(document.getElementById("root")!).render(<Home />);
