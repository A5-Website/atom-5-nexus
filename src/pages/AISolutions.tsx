import Navigation from "@/components/Navigation";
import { NavLink } from "@/components/NavLink";
import heroBackground from "@/assets/hero-background.jpg";

const AISolutions = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-16 px-8">
        <div className="max-w-4xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-8">
            Custom AI Solutions
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mb-12 rounded-full" />
          
          <div className="space-y-6 text-lg text-foreground/90 leading-relaxed">
            <p>
              Atom 5 Engineering provides high-quality AI and software development services through a lean, focused team of experts. We work closely with clients to deliver cutting-edge systems—from intelligent applications to custom infrastructure—with speed, clarity, and deep technical expertise.
            </p>
            
            <p>
              Our philosophy is grounded in simplicity, transparency, and results. Every project begins with a clear requirements document that outlines what is being built, why, and how it will function. These documents are modular, traceable, and tied directly to project milestones and billing, giving clients full visibility and control without needing to manage technical details. We maintain a small team of experienced engineers who stay current with the latest developments in AI research and software practices. This enables us to produce robust, modern systems efficiently, delivering value and quality with precision.
            </p>
            
            <p>
              Clients can choose how they want to handle intellectual property and infrastructure. We offer flexible options—including client-owned deployments or A5-managed systems with ongoing maintenance and support—tailored to fit each team's needs. At Atom 5, we are committed to building systems that work, scale, and last. To submit an inquiry or discuss a project idea, please do not hesitate to contact us{" "}
              <NavLink 
                to="/contact" 
                className="text-primary hover:text-accent transition-colors font-semibold underline decoration-primary/50 hover:decoration-accent"
              >
                here
              </NavLink>.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AISolutions;
