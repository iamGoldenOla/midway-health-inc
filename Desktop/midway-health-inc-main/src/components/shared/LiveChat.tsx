import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessage {
  id: number;
  text: string;
  isBot: boolean;
}

// Middy's Knowledge Base
const knowledgeBase = {
  greeting: {
    keywords: ["hi", "hello", "hey", "good morning", "good afternoon"],
    response: "Hello! I'm Middy, your virtual assistant at Midway Health Inc. 👋 How can I help you today? You can ask me about our services, booking appointments, pricing, or anything else!"
  },
  services: {
    keywords: ["service", "offer", "provide", "do you have", "what do you do", "help with"],
    response: "We offer comprehensive home healthcare services:\n\n✅ Skilled Nursing Care\n✅ Physical Therapy (PT)\n✅ Occupational Therapy (OT)\n✅ Speech Therapy\n✅ Personal Care & Companionship\n✅ Post-Surgical Care\n\nWhich service would you like to know more about?"
  },
  booking: {
    keywords: ["book", "appointment", "schedule", "consultation", "visit", "when can"],
    response: "📅 You can book an appointment in 3 easy ways:\n\n1. Click 'GET APPOINTMENT' button at the top\n2. Call us at (312) 298-9124\n3. Visit our Appointment page\n\nWould you like me to direct you to the booking page?"
  },
  pricing: {
    keywords: ["cost", "price", "insurance", "payment", "afford", "expensive", "how much", "medicare", "medicaid"],
    response: "💰 We accept most major insurance plans including:\n\n✅ Medicare\n✅ Medicaid\n✅ Private Insurance\n\nFor specific pricing and coverage details, please call us at (312) 298-9124 or request a free consultation. Our team will work with you to find an affordable care plan!"
  },
  contact: {
    keywords: ["phone", "call", "address", "location", "hours", "email", "reach", "contact"],
    response: "📞 Contact Information:\n\nPhone: (312) 298-9124 or (312) 216-7241\n📧 Email: info@midwayhealthinc.com\n📍 Address: 1434 W 76th Street, Chicago, IL 60620\n🕐 Hours: Monday-Friday, 8 AM - 6 PM\n\nHow else can I assist you?"
  },
  area: {
    keywords: ["area", "serve", "location", "chicago", "where", "coverage", "region"],
    response: "🏙️ We proudly serve Chicago and surrounding areas! If you're unsure whether we cover your location, please call us at (312) 298-9124 and we'll be happy to confirm."
  },
  emergency: {
    keywords: ["emergency", "urgent", "immediate", "asap", "right now", "help now"],
    response: "🚨 For immediate medical emergencies, please call 911.\n\nFor urgent care needs, please call us directly at:\n📞 (312) 298-9124\n\nOur team is available Monday-Friday, 8 AM - 6 PM."
  },
  about: {
    keywords: ["about", "who are you", "company", "midway", "tell me"],
    response: "🏥 Midway Health Inc. is a trusted home healthcare provider in Chicago. We deliver compassionate, high-quality care to help you and your loved ones thrive in the comfort of home.\n\nOur experienced team provides skilled nursing, therapy services, and personal care tailored to your needs."
  }
};

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: 1, text: "Hi, I'm Middy! 👋 Welcome to Midway Health Inc.\n\nHow can I help you today? Feel free to ask about our services, booking appointments, pricing, or anything else!", isBot: true },
  ]);
  const [input, setInput] = useState("");

  const getResponse = (userMessage: string): string => {
    const lowerMsg = userMessage.toLowerCase();

    // Check each knowledge category
    for (const [key, data] of Object.entries(knowledgeBase)) {
      if (data.keywords.some(keyword => lowerMsg.includes(keyword))) {
        return data.response;
      }
    }

    // Default response if no match
    return "I'm here to help! You can ask me about:\n\n• Our healthcare services\n• Booking appointments\n• Pricing and insurance\n• Contact information\n• Service areas\n\nOr call us directly at (312) 298-9124 for immediate assistance!";
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMsg: ChatMessage = { id: Date.now(), text: input.trim(), isBot: false };
    setMessages((prev) => [...prev, userMsg]);
    const userInput = input.trim();
    setInput("");

    setTimeout(() => {
      const botMsg: ChatMessage = {
        id: Date.now() + 1,
        text: getResponse(userInput),
        isBot: true,
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 800);
  };

  return (
    <>
      {/* Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-warm shadow-elevated flex items-center justify-center text-warm-foreground hover:opacity-90 transition-opacity"
          >
            <MessageCircle className="h-6 w-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-2rem)] bg-card rounded-2xl shadow-elevated border border-border overflow-hidden flex flex-col"
            style={{ height: "480px" }}
          >
            {/* Header */}
            <div className="gradient-hero p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary-foreground/20 flex items-center justify-center">
                  <MessageCircle className="h-5 w-5 text-secondary-foreground" />
                </div>
                <div>
                  <h4 className="font-bold text-secondary-foreground text-sm">Middy - Your Health Assistant</h4>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-xs text-secondary-foreground/70">Online</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-secondary-foreground/70 hover:text-secondary-foreground">
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.isBot ? "justify-start" : "justify-end"}`}>
                  <div
                    className={`max-w-[80%] px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${msg.isBot
                      ? "bg-muted text-foreground rounded-bl-sm"
                      : "gradient-primary text-primary-foreground rounded-br-sm"
                      }`}
                  >
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} className="p-3 border-t border-border flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="rounded-xl flex-1 text-sm"
                maxLength={500}
              />
              <Button type="submit" size="icon" className="rounded-xl gradient-primary text-primary-foreground border-0 shrink-0">
                <Send className="h-4 w-4" />
              </Button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default LiveChat;
