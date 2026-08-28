import klrLogo from "@/assets/klr-logo.jpeg";

const Footer = () => {
  return (
    <footer className="bg-primary text-primary-foreground py-12">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <img src={klrLogo} alt="KLR BUILD" className="h-20 w-auto mx-auto mb-6 rounded-lg" />
          <p className="text-primary-foreground/80 mb-4 font-body text-lg">
            Building quality, building trust, building your future.
          </p>
          <div className="w-16 h-0.5 bg-accent mx-auto mb-4" />
          <p className="text-sm text-primary-foreground/50 font-body">
            © {new Date().getFullYear()} KLR BUILD. All rights reserved. | Family Owned & Operated
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
