import { useState } from "react";
import Navigation from "@/components/Navigation";
import { FullScreen, useFullScreenHandle } from "react-full-screen";
import { Maximize2, Minimize2 } from "lucide-react";
import { Button } from "@/components/ui/button";

const Simulation = () => {
  const fullscreenHandle = useFullScreenHandle();
  const [mounted, setMounted] = useState(true);

  return (
    <>
      {!fullscreenHandle.active && <Navigation />}

      <main className="min-h-screen bg-black pt-32 pb-16 px-8">
        <div className="max-w-6xl mx-auto">
          <FullScreen handle={fullscreenHandle}>
            <div
              className={`relative bg-secondary/50 border border-border rounded-lg overflow-hidden ${
                fullscreenHandle.active ? "w-screen h-screen" : "aspect-video"
              }`}
            >
              <iframe
                src="https://a5-rd.github.io/remas_ui/"
                title="WBE Simulation"
                className="w-full h-full"
                loading="eager"
              />

              <Button
                variant="secondary"
                size="icon"
                className="absolute top-4 right-4 z-10"
                onClick={() =>
                  fullscreenHandle.active
                    ? fullscreenHandle.exit()
                    : fullscreenHandle.enter()
                }
              >
                {fullscreenHandle.active ? (
                  <Minimize2 className="h-4 w-4" />
                ) : (
                  <Maximize2 className="h-4 w-4" />
                )}
              </Button>
            </div>
          </FullScreen>
        </div>
      </main>
    </>
  );
};

export default Simulation;
