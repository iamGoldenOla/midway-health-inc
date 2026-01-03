import { Link } from "react-router-dom";
import { MapPin, Phone, Mail, Facebook, Instagram, Youtube } from "lucide-react";
import logo from "@/assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground">
      {/* Main Footer */}
      <div className="container-custom section-padding">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* School Info */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <img src={logo} alt="Christ The Haven School Logo" className="w-14 h-14 object-contain bg-white rounded-full p-1" />
              <div>
                <h3 className="font-serif font-bold text-lg">Christ The Haven</h3>
                <p className="text-sm opacity-80">School</p>
              </div>
            </div>
            <p className="text-yellow font-semibold text-sm mb-4">
              Motto: Excellence & Godliness
            </p>
            <p className="text-sm opacity-80 leading-relaxed mb-6">
              Nurturing excellence, building character, and preparing students for a bright future 
              through quality education and holistic development.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-yellow hover:text-primary transition-colors">
                <Facebook size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-yellow hover:text-primary transition-colors">
                <Instagram size={18} />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-primary-foreground/10 flex items-center justify-center hover:bg-yellow hover:text-primary transition-colors">
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: "About Us", path: "/about" },
                { name: "Academics", path: "/academics" },
                { name: "Services", path: "/services" },
                { name: "Our Staff", path: "/staff" },
                { name: "Events", path: "/events" },
                { name: "Careers", path: "/careers" },
                { name: "Contact", path: "/contact" }
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-sm opacity-80 hover:opacity-100 hover:text-yellow transition-all">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Academic Programs */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Programs</h4>
            <ul className="space-y-3">
              {["Nursery (Early Years)", "Primary School", "Extra-Curricular Activities", "Clubs"].map((program) => (
                <li key={program}>
                  <span className="text-sm opacity-80 hover:opacity-100 hover:text-yellow transition-all cursor-pointer">
                    {program}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-serif font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-1 text-yellow" />
                <span className="text-sm opacity-80">
                  10, Christ Avenue, by Starizo Place<br />
                  (Events Centre) Cele 3, Asese-Orimerunmu,<br />
                  Ogun State, Nigeria
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="text-yellow" />
                <span className="text-sm opacity-80">+234 802 335 7800</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="text-yellow" />
                <span className="text-sm opacity-80">info@christthehavenschool.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-primary-foreground/10">
        <div className="container-custom py-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm opacity-60">
            © 2025 Christ The Haven School. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link to="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
              Privacy Policy
            </Link>
            <Link to="#" className="text-sm opacity-60 hover:opacity-100 transition-opacity">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;