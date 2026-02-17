import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie } from "lucide-react";

const CookieConsent = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeOut" }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4"
        >
          <div className="max-w-4xl mx-auto bg-card border border-border rounded-2xl shadow-elevated p-5 sm:p-6 flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <Cookie className="h-8 w-8 text-warm shrink-0" />
            <div className="flex-1">
              <p className="text-foreground text-sm font-semibold mb-1">We value your privacy</p>
              <p className="text-muted-foreground text-xs leading-relaxed">
                We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept," you consent to our use of cookies.{" "}
                <Link to="/privacy-policy" className="text-primary underline hover:no-underline">
                  Read our Privacy Policy
                </Link>
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button
                variant="outline"
                size="sm"
                onClick={decline}
                className="rounded-lg text-xs"
              >
                Decline
              </Button>
              <Button
                size="sm"
                onClick={accept}
                className="gradient-primary text-primary-foreground border-0 rounded-lg text-xs"
              >
                Accept Cookies
              </Button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default CookieConsent;
