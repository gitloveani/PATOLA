
import { Instagram, Phone, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start gap-8">
          {/* Brand Section */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div className="size-4">
                <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M44 4H30.6666V17.3334H17.3334V30.6666H4V44H44V4Z" fill="currentColor"></path>
                </svg>
              </div>
              <h3 className="text-foreground text-lg font-bold">J K PATOLA</h3>
            </div>
            <p className="text-muted-foreground text-sm max-w-md">
              Preserving the timeless art of Patola weaving through generations of skilled craftsmanship.
            </p>
          </div>

          {/* Stay in Touch Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-foreground text-base font-semibold">Stay in Touch</h4>
            <div className="flex flex-col gap-3">
              <a 
                href="https://instagram.com/jkpatola_official" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Instagram size={18} />
                <span className="text-sm">@jkpatola_official</span>
              </a>
              <a 
                href="tel:+919876543210" 
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Phone size={18} />
                <span className="text-sm">+91-987-654-3210</span>
              </a>
              <a 
                href="mailto:info@jkpatola.com" 
                className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={18} />
                <span className="text-sm">info@jkpatola.com</span>
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 J K PATOLA. All rights reserved. | Handcrafted with tradition and care.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
