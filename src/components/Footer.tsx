const Footer = () => {
  return (
    <footer className="w-full py-12 px-8 flex flex-col md:flex-row justify-between items-center gap-6 text-muted-foreground/60 text-sm border-t border-outline-variant/5">
      <div className="flex items-center gap-2">
        <span className="font-bold text-muted-foreground">Web Material</span>
        <span>© 2026 Webmaterial.org</span>
      </div>
      <div className="flex gap-8 font-medium">
        <a className="hover:text-primary transition-colors" href="#">Privacy Policy</a>
        <a className="hover:text-primary transition-colors" href="#">Terms of Service</a>
        <a className="hover:text-primary transition-colors" href="#">Support</a>
      </div>
    </footer>
  );
};

export default Footer;
