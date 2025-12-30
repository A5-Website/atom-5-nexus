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
              At Atom 5 Engineering, we are pioneering a new frontier in neuro-symbolic artificial intelligence through software-based Whole-Brain Emulation (WBE). Unlike traditional AI systems that rely on statistical inference and large-scale training data, WBE seeks to replicate the actual structure and function of the human mind—capturing how perception, memory, and reasoning emerge from underlying computational processes.
            </p>
            
            <p>
              Our cognitive architecture is grounded in and extends knowledge graph theory, using two primary structures: Maps, which encode evolving mental and environmental states across multiple layers, and Thought objects, which traverse and modify these Maps to perform inference, create associations, and drive decision-making. This design enables key features of cognition—including generalization from sparse data, memory consolidation, and logical learning—to emerge naturally within the system.
            </p>
            
            <p>
              We've developed a working simulation of this architecture, available to explore{" "}
              <NavLink 
                to="/simulation" 
                className="text-primary hover:text-accent transition-colors font-semibold underline decoration-primary/50 hover:decoration-accent"
              >
                here
              </NavLink>, demonstrating how these components interact in real time. By moving beyond behavior-level mimicry and toward a functional reconstruction of mental processes, our goal is to lay the groundwork for artificial minds that can adapt, reason, and evolve—bridging the gap between neuroscience and machine intelligence.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Research;
