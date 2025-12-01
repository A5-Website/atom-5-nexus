import { useState } from "react";
import Navigation from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const Contact = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !message) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (message.length > 5000) {
      toast({
        title: "Error",
        description: "Message is too long (max 5000 characters)",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);
    
    try {
      const { data, error } = await supabase.functions.invoke('send-contact-email', {
        body: { email, message }
      });

      if (error) {
        throw error;
      }

      toast({
        title: "Message Sent!",
        description: "We'll get back to you as soon as possible.",
      });
      setEmail("");
      setMessage("");
    } catch (error: any) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-black relative">
      <Navigation />
      
      <main className="relative z-10 pt-32 pb-16 px-8">
        <div className="max-w-2xl mx-auto animate-fade-in">
          <h1 className="text-5xl md:text-6xl font-display font-bold text-foreground mb-8">
            Contact Us
          </h1>
          <div className="h-1 w-24 bg-gradient-to-r from-primary to-accent mb-12 rounded-full" />
          
          <div className="bg-card/50 backdrop-blur-sm rounded-lg p-8 border border-border">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-foreground mb-2">
                  Email Address
                </label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="your.email@example.com"
                  className="bg-background/50 border-border focus:border-primary"
                  required
                />
              </div>
              
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-foreground mb-2">
                  Message
                </label>
                <Textarea
                  id="message"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us about your project or inquiry..."
                  className="bg-background/50 border-border focus:border-primary min-h-[200px]"
                  required
                />
              </div>
              
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary text-primary-foreground hover:shadow-[var(--glow-primary)] transition-all"
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Contact;
