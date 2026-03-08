import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import ScrollToTop from "@/components/shared/ScrollToTop";
import BackToTop from "@/components/shared/BackToTop";
import DArkAssistant from "@/components/shared/DArkAssistant";

import Preloader from "@/components/shared/Preloader";
import SmoothScroll from "@/components/shared/SmoothScroll";
import CustomCursor from "@/components/shared/CustomCursor";
import CookieConsent from "@/components/shared/CookieConsent";
import ErrorBoundary from "@/components/shared/ErrorBoundary";
import { CartProvider } from "@/contexts/CartContext";
import CartDrawer from "@/components/cart/CartDrawer";
import Index from "./pages/Index";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import About from "./pages/About";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Ebooks from "./pages/Ebooks";
import Checkout from "./pages/Checkout";
import Portfolio from "./pages/Portfolio";
import DynamicPage from "./pages/DynamicPage";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import FAQ from "./pages/FAQ";
import CookiePolicy from "./pages/CookiePolicy";
import Disclaimer from "./pages/Disclaimer";
import RefundPolicy from "./pages/RefundPolicy";
import ConsentPreferences from "./pages/ConsentPreferences";
import ISpeak from "./pages/services/ISpeak";
import ITeach from "./pages/services/ITeach";
import IWrite from "./pages/services/IWrite";
import ISing from "./pages/services/ISing";
import IDigital from "./pages/services/IDigital";
import IInspire from "./pages/services/IInspire";
import ImageCompressor from "./pages/ImageCompressor";
import EbookReader from "./pages/EbookReader";
import Booking from "./pages/Booking";

const queryClient = new QueryClient();

import AdminLayout from '@/pages/admin/AdminLayout';
import AdminLogin from '@/pages/admin/AdminLogin';
import AdminDashboard from '@/pages/admin/AdminDashboard';
import AdminSubmissions from '@/pages/admin/AdminSubmissions';
import AdminPosts from '@/pages/admin/AdminPosts';
import AdminPostEditor from '@/pages/admin/AdminPostEditor';
import AdminPortfolio from '@/pages/admin/AdminPortfolio';
import AdminPortfolioEditor from '@/pages/admin/AdminPortfolioEditor';
import { AuthProvider } from '@/contexts/AuthContext';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        {/* Admin Routes */}
        <Route path="/secure-portal/login" element={<AdminLogin />} />
        <Route path="/secure-portal" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="posts" element={<AdminPosts />} />
          <Route path="posts/:id" element={<AdminPostEditor />} />
          <Route path="portfolio" element={<AdminPortfolio />} />
          <Route path="portfolio/:id" element={<AdminPortfolioEditor />} />
          <Route path="submissions" element={<AdminSubmissions />} />
        </Route>

        <Route path="/" element={<Index />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/our-services" element={<Services />} />
        <Route path="/services/i-speak" element={<ISpeak />} />
        <Route path="/services/i-teach" element={<ITeach />} />
        <Route path="/services/i-write" element={<IWrite />} />
        <Route path="/services/i-sing" element={<ISing />} />
        <Route path="/services/i-digital" element={<IDigital />} />
        <Route path="/services/i-inspire" element={<IInspire />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/e-books" element={<Ebooks />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/faq" element={<FAQ />} />
        <Route path="/cookie-policy" element={<CookiePolicy />} />
        <Route path="/disclaimer" element={<Disclaimer />} />
        <Route path="/refund-policy" element={<RefundPolicy />} />
        <Route path="/consent-preferences" element={<ConsentPreferences />} />
        <Route path="/image-compressor" element={<ImageCompressor />} />
        <Route path="/ebook-reader" element={<EbookReader />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/:slug" element={<DynamicPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AnimatePresence>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <AuthProvider>
          <ErrorBoundary>
            <Preloader />
            <SmoothScroll />
            <CustomCursor />
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <ScrollToTop />
              <CartDrawer />
              <AnimatedRoutes />
              <BackToTop />

              <DArkAssistant />
              <CookieConsent />
            </BrowserRouter>
          </ErrorBoundary>
        </AuthProvider>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
