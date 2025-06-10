
import { Instagram, Phone, Send } from "lucide-react";
import { siteConfig } from "@/config/siteConfig";

const Contact = () => {
  const contactMethods = [
    {
      icon: Instagram,
      title: "Instagram",
      value: siteConfig.contactUs.instagram.handle,
      link: siteConfig.contactUs.instagram.url
    },
    {
      icon: Send,
      title: "Pinterest", 
      value: siteConfig.contactUs.pinterest.handle,
      link: siteConfig.contactUs.pinterest.url
    },
    {
      icon: Phone,
      title: "Phone",
      value: siteConfig.contactUs.phone.number,
      link: siteConfig.contactUs.phone.url
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-foreground text-3xl md:text-4xl font-bold leading-tight mb-4">Contact Us</h1>
          <p className="text-foreground text-base md:text-lg leading-normal text-muted-foreground">
            We're here to help! If you have any questions about our Patola art or need assistance with your order, please don't hesitate to reach out. You can contact us through the following channels:
          </p>
        </div>

        {/* Contact Methods */}
        <div className="space-y-4">
          {contactMethods.map((method, index) => (
            <a
              key={method.title}
              href={method.link}
              target={method.link.startsWith('http') ? '_blank' : undefined}
              rel={method.link.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="flex items-center gap-4 bg-card border border-border rounded-lg p-6 hover:bg-accent transition-colors hover-lift animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-center justify-center rounded-lg bg-secondary size-12 flex-shrink-0">
                <method.icon size={24} className="text-foreground" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-foreground text-base font-medium">{method.title}</h3>
                <p className="text-muted-foreground text-sm">{method.value}</p>
              </div>
            </a>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-12 p-6 bg-secondary rounded-lg animate-fade-in">
          <h3 className="text-foreground text-lg font-semibold mb-3">Visit Our Workshop</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Experience the art of Patola weaving firsthand at our traditional workshop. Witness skilled artisans at work and learn about the intricate double ikat technique that makes each piece a masterpiece. Please contact us to schedule a visit.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Contact;
