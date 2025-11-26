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
      
      <main className="relative z-10 flex items-center justify-center min-h-screen px-8">
        <div className="text-center max-w-4xl animate-fade-in">
          <h1 className="text-6xl md:text-7xl font-display font-bold text-foreground mb-6 leading-tight">
            Bridging Carbon and Silicon Intelligence
          </h1>
          <div className="h-1 w-32 bg-gradient-to-r from-primary to-accent mx-auto rounded-full" />
        </div>
      </main>
    </div>
  );
};

export default Home;
