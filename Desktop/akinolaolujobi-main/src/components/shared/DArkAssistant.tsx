import { useState, useRef, useEffect } from 'react';
import { X, Send } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import akinPortrait from '@/assets/akinola-portrait.jpg';

interface Message {
  id: number;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const responses: Record<string, string[]> = {
  greeting: [
    "Hello! I'm D'ARK, Akinola's virtual assistant. How can I help you today?",
    "Welcome! I'm here to assist you with inquiries about Akinola's services. What would you like to know?",
  ],
  services: [
    "Akinola offers a range of services including: Content Writing, Digital Marketing, Spoken Word performances, Training & Coaching, Brand Strategy, and Social Media Management. Which one interests you?",
  ],
  speaking: [
    "Akinola is an experienced speaker available for conferences, corporate events, workshops, and special occasions. For booking inquiries, please visit the Contact page or email connect@akinolaolujobi.com",
  ],
  writing: [
    "As a skilled content writer, Akinola creates compelling blog posts, website copy, brand stories, and more. Check out the Portfolio page for samples of his work!",
  ],
  digital: [
    "Through TrendTactics Digital, Akinola provides comprehensive digital marketing services including SEO, social media marketing, content strategy, and brand development.",
  ],
  teaching: [
    "Akinola offers training programs and courses through TrendTactics Academy. Topics include content creation, digital marketing, and personal branding. Visit the I Teach page for more details!",
  ],
  singing: [
    "Akinola is also a talented musician available for live performances, studio sessions, and special events. Visit the I Sing page to learn more about his musical journey.",
  ],
  contact: [
    "You can reach Akinola via email at connect@akinolaolujobi.com or through the Contact page. For urgent inquiries, feel free to schedule a call!",
  ],
  schedule: [
    "To schedule a consultation or book Akinola for an event, please visit the Contact page and fill out the form with your preferred dates and details. Someone will get back to you within 24-48 hours.",
  ],
  pricing: [
    "Pricing varies based on the service and project scope. For a custom quote, please reach out through the Contact page with details about your project.",
  ],
  about: [
    "Akinola Olujobi is a multi-talented creative professional - a writer, speaker, digital marketer, and musician passionate about helping individuals and brands tell their stories. Visit the About page to learn more!",
  ],
  default: [
    "I'd be happy to help with that! For detailed inquiries, please visit the Contact page or email connect@akinolaolujobi.com. Is there anything else I can help you with?",
    "That's a great question! For more specific information, I recommend reaching out directly through the Contact page. Can I help you with anything else?",
  ],
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  const match = (keywords: string[]) => keywords.some(k => lower.includes(k));

  if (match(['hello', 'hi', 'hey', 'good'])) return responses.greeting[Math.floor(Math.random() * responses.greeting.length)];
  if (match(['service', 'offer', 'what do you do'])) return responses.services[0];
  if (match(['speak', 'event', 'conference'])) return responses.speaking[0];
  if (match(['writ', 'content', 'blog'])) return responses.writing[0];
  if (match(['digital', 'marketing', 'seo'])) return responses.digital[0];
  if (match(['teach', 'course', 'training', 'academy'])) return responses.teaching[0];
  if (match(['sing', 'music', 'perform'])) return responses.singing[0];
  if (match(['contact', 'reach', 'email'])) return responses.contact[0];
  if (match(['schedule', 'book', 'appointment', 'meeting'])) return responses.schedule[0];
  if (match(['price', 'cost', 'rate', 'quote'])) return responses.pricing[0];
  if (match(['about', 'who', 'akinola'])) return responses.about[0];
  return responses.default[Math.floor(Math.random() * responses.default.length)];
};

export default function DArkAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, text: "Hi, this is D'ARK. I'm Akinola's AI-powered virtual assistant. How can I help you today?", isBot: true, timestamp: new Date() },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const userMsg: Message = { id: Date.now(), text: inputValue, isBot: false, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    const input = inputValue;
    setInputValue('');
    setIsTyping(true);
    setTimeout(() => {
      setMessages(prev => [...prev, { id: Date.now() + 1, text: getResponse(input), isBot: true, timestamp: new Date() }]);
      setIsTyping(false);
    }, 800 + Math.random() * 800);
  };

  return (
    <>
      {/* Toggle button - avatar style like reference */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-24 right-6 z-50 group"
          aria-label="Open chat assistant"
        >
          <div className="relative">
            <span className="absolute inset-0 rounded-full bg-primary animate-ping opacity-20" />
            <div className="relative w-14 h-14 rounded-full overflow-hidden border-2 border-primary shadow-lg hover:scale-110 transition-transform duration-300">
              <img src={akinPortrait} alt="D'ARK Assistant" className="w-full h-full object-cover" />
            </div>
            {/* Online dot */}
            <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-[#25D366] rounded-full border-2 border-background" />
          </div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 z-50 w-[370px] max-w-[calc(100vw-48px)] rounded-2xl shadow-2xl border border-border overflow-hidden animate-in slide-in-from-bottom-5 duration-300 flex flex-col"
          style={{ maxHeight: 'min(520px, calc(100vh - 48px))' }}
        >
          {/* Header - dark with avatar like reference */}
          <div className="bg-gradient-to-r from-[hsl(220,65%,12%)] to-[hsl(220,60%,18%)] p-4 flex items-center gap-3 relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
              aria-label="Close chat"
            >
              <X className="w-4 h-4 text-white" />
            </button>
            
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[hsl(42,85%,55%)] flex-shrink-0">
              <img src={akinPortrait} alt="D'ARK" className="w-full h-full object-cover" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-heading font-bold text-white text-base">D'ARK</h3>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-bold bg-[hsl(42,85%,55%)] text-[hsl(220,65%,12%)]">AI</span>
              </div>
              <p className="text-xs text-white/70">Virtual Assistant</p>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background" style={{ minHeight: '250px', maxHeight: '320px' }}>
            {messages.map((message) => (
              <div key={message.id} className={`flex ${message.isBot ? 'justify-start' : 'justify-end'} gap-2`}>
                {message.isBot && (
                  <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1">
                    <img src={akinPortrait} alt="" className="w-full h-full object-cover" />
                  </div>
                )}
                <div className={`max-w-[78%] p-3 rounded-2xl ${
                  message.isBot
                    ? 'bg-muted text-foreground rounded-tl-sm'
                    : 'bg-primary text-primary-foreground rounded-tr-sm'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start gap-2">
                <div className="w-7 h-7 rounded-full overflow-hidden flex-shrink-0 mt-1">
                  <img src={akinPortrait} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="bg-muted p-3 rounded-2xl rounded-tl-sm">
                  <div className="flex gap-1">
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-foreground/40 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* AI disclaimer */}
          <div className="px-4 py-1.5 bg-muted/50 border-t border-border">
            <p className="text-[10px] text-muted-foreground text-center flex items-center justify-center gap-1">
              <span>✨</span> This conversation is handled by an AI Agent.
            </p>
          </div>

          {/* Input */}
          <div className="p-3 border-t border-border bg-card">
            <div className="flex gap-2">
              <Input
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                placeholder="Type here"
                className="flex-1 bg-muted/50 border-0"
              />
              <Button onClick={handleSend} size="icon" className="shrink-0 bg-coral hover:bg-coral/90">
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
