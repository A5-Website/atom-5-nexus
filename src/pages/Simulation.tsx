import Navigation from "@/components/Navigation";
import heroBackground from "@/assets/hero-background.jpg";

const Simulation = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-background/90 backdrop-blur-md" />
      
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-8">
            WBE Simulation
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mb-12 rounded-full" />
          
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border">
            <p className="text-foreground/80 mb-6">
              The simulation will be embedded here. Please provide the simulation URL to complete this page.
            </p>
            
            {/* Placeholder for embedded simulation */}
            <div className="aspect-video bg-secondary/50 rounded-lg flex items-center justify-center border border-border">
              <p className="text-muted-foreground">Simulation Embed Placeholder</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Simulation;
