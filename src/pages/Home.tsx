import Navigation from "@/components/Navigation";
import { BackgroundPaths } from "@/components/ui/background-paths";

const Home = () => {
  return (
    <div className="relative min-h-screen">
      <Navigation />
      <BackgroundPaths title="Bridging Carbon and Silicon Intelligence" />
    </div>
  );
};

export default Home;



// import { createRoot } from "react-dom/client";
// // import "./index.css";

// const rootElement = document.getElementById("root")!;

// createRoot(rootElement).render(
//   <h1 style={{ color: "red", textAlign: "center", marginTop: "50px" }}>
//     Home.tsx is working!
//   </h1>
// );


// export default Home;
