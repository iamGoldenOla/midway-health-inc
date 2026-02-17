import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { newsletterApi } from "@/services/api";

const NewsletterSubscribe = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    try {
      await newsletterApi.subscribe(email.trim());
      toast({
        title: "Subscribed!",
        description: "You'll receive our latest health tips and updates."
      });
      setEmail("");
    } catch (error: any) {
      console.error("Newsletter subscription failed:", error);

      // Handle duplicate email error
      if (error.message?.includes("duplicate") || error.code === "23505") {
        toast({
          title: "Already Subscribed",
          description: "This email is already on our newsletter list.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Subscription Failed",
          description: "Please try again or contact us directly.",
          variant: "destructive",
        });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="gradient-hero rounded-2xl p-6 text-secondary-foreground">
      <div className="flex items-center gap-2 mb-3">
        <Mail className="h-5 w-5" />
        <h3 className="font-display text-lg font-bold">Newsletter</h3>
      </div>
      <p className="text-sm text-secondary-foreground/80 mb-4">
        Get health tips and care insights delivered to your inbox.
      </p>
      <form onSubmit={handleSubmit} className="space-y-3">
        <Input
          type="email"
          placeholder="Your email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-xl bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
          maxLength={255}
        />
        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-primary-foreground text-secondary border-0 rounded-xl hover:bg-primary-foreground/90 font-semibold"
        >
          {loading ? "Subscribing..." : "Subscribe"}
        </Button>
      </form>
    </div>
  );
};

export default NewsletterSubscribe;
