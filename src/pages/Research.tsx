import Navigation from "@/components/Navigation";
import { NavLink } from "@/components/NavLink";
import heroBackground from "@/assets/hero-background.jpg";

const Research = () => {
  return (
    <div className="min-h-screen bg-black relative">
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-8">
            Research & Development
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mb-12 rounded-full" />
          
          <div className="space-y-6 text-lg text-foreground/90 leading-relaxed text-justify">
            <p>
              At Atom 5, we are developing a novel cognitive architecture at the intersection of symbolic AI, knowledge graphs, and computational models of cognition. Our long-term ambition is to contribute to software-based Whole-Brain Emulation (WBE) by developing cognitive architectures that model how capabilities such as perception, memory, and reasoning can arise from interacting processes.
            </p>
            
            <p>
              Our architecture extends knowledge graph theory through two primary structures: <strong>Maps</strong>, which represent evolving mental and environmental states across multiple layers, and <strong>Thought objects</strong>, which traverse and modify Maps to perform inference, form associations, and guide decision-making. Rather than treating the graph as a static store of information, our approach makes its structure and contents part of the computational process itself.
            </p>
            
            <p>
              We are investigating how this design can support capabilities such as generalization from sparse data, episodic memory, and learning through experience.
            </p>

            <p>
              We have developed a working simulation of the architecture, available to explore{" "}
              <NavLink 
                to="/simulation" 
                className="text-primary hover:text-accent transition-colors font-semibold underline decoration-primary/50 hover:decoration-accent"
              >
                here
              </NavLink>, that demonstrates how these components interact in real time. Our current research focuses on testing foundational cognitive capabilities within this framework. Over the longer term, we aim to develop a more comprehensive computational model of cognitive processes, helping bridge research in neuroscience and machine intelligence.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Research;
