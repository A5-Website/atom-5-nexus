import Navigation from "@/components/Navigation";
import heroBackground from "@/assets/hero-background.jpg";

const Home = () => {
  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat relative"
      style={{ backgroundImage: `url(${heroBackground})` }}
    >
      <div className="absolute inset-0 bg-background/60 backdrop-blur-sm" />
      
      <Navigation />
      
      {/* Animated circuit lights */}
      <div className="absolute inset-0 z-5 pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white rounded-full animate-circuit-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
              animationDuration: `${3 + Math.random() * 2}s`,
              boxShadow: '0 0 10px rgba(255, 255, 255, 0.8), 0 0 20px rgba(255, 255, 255, 0.5)',
            }}
          />
        ))}
      </div>

      <main className="relative z-10 flex items-start justify-start min-h-screen px-8 pt-32">
        <div className="text-left max-w-xl animate-fade-in-slow">
          <h1 className="text-3xl md:text-4xl font-display text-foreground mb-4 leading-tight">
            Bridging Carbon and Silicon Intelligence
          </h1>
        </div>
      </main>
    </div>
  );
};

export default Home;
