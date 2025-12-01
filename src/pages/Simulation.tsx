import { useState } from "react";
import Navigation from "@/components/Navigation";
// import heroBackground from "@/assets/hero-background.jpg";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Simulation = () => {
  const [isFullscreen, setIsFullscreen] = useState(false);

  return (
    <>
      {!isFullscreen && <Navigation />}
      
      <div 
        className={`${isFullscreen ? 'fixed inset-0 z-50' : 'min-h-screen'} bg-black relative`}
      >
        
        <main className={`relative z-10 ${isFullscreen ? 'h-screen' : 'pt-32 pb-16 px-8'}`}>
          <div className={`${isFullscreen ? 'h-full' : 'max-w-6xl mx-auto'} animate-fade-in`}>
            <div className="relative h-full">
              {/* Placeholder for embedded simulation */}
              <div className={`${isFullscreen ? 'h-full' : 'aspect-video'} bg-secondary/50 rounded-lg flex items-center justify-center border border-border relative`}>
                <iframe
                  className="w-full h-full rounded-lg"
                  title="WBE Simulation"
                  // Add your simulation URL here: src="YOUR_SIMULATION_URL"
                />
                
                {/* Fullscreen Toggle Button */}
                <Button
                  variant="secondary"
                  size="icon"
                  className="absolute top-4 right-4 z-10"
                  onClick={() => setIsFullscreen(!isFullscreen)}
                >
                  {isFullscreen ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                </Button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Simulation;
