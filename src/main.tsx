// import { createRoot } from "react-dom/client";
// import App from "./App.tsx";
// import "./index.css";

// createRoot(document.getElementById("root")!).render(<App />);


import { createRoot } from "react-dom/client";
import "./index.css";

const rootElement = document.getElementById("root")!;

createRoot(rootElement).render(
  <h1 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
    main.tsx is working!
  </h1>
);
