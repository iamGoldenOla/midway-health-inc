import { ReactNode } from "react";
import BreakingNewsTicker from "./BreakingNewsTicker";
import TopBar from "./TopBar";
import Header from "./Header";
import Footer from "./Footer";
import LiveChat from "@/components/shared/LiveChat";
import ScrollToTopButton from "@/components/shared/ScrollToTopButton";
import EncouragementPopup from "@/components/shared/EncouragementPopup";
import CookieConsent from "@/components/shared/CookieConsent";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <BreakingNewsTicker />
      <TopBar />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <LiveChat />
      <ScrollToTopButton />
      <EncouragementPopup />
      <CookieConsent />
    </div>
  );
};

export default Layout;
