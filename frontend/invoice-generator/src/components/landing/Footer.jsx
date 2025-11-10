import { Link } from "react-router-dom";
import { Twitter, Github, Linkedin, FileText } from "lucide-react";

const FooterLink = ({ href, to, children }) => {
  const className =
    "block text-gray-400 hover:text-white transition-colors duration-200";
  if (to) {
    return (
      <Link to={to} className={className}>
        {children}
      </Link>
    );
  }
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
};

const SocialLink = ({ href, children }) => {
  return (
    <a
      href={href}
      className="w-10 h-10 bg-red-50 rounded-lg text-black flex items-center justify-center hover:bg-black hover:text-white transition-colors duration-200"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  );
};

const Footer = () => {
  return (
    <footer className="bg-red-950 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="space-y-4 md:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center space-x-2 mb-6">
              <div className="w-8 h-8 bg-red-50 rounded-md flex items-center justify-center">
                <FileText className="w-4 h-4 text-black" />
              </div>
              <span className="text-xl font-bold">easy INVOICE</span>
            </Link>
            <p className="text-red-50 leading-relaxed max-w-sm">
              The simplest way to create and send professional invoices.
            </p>
          </div>
          <div>
            <h3 className="text-base font-bold mb-4">Product</h3>
            <ul className="space-y-2 ">
              <li>
                <FooterLink href="#features">Features</FooterLink>
              </li>
              <li>
                <FooterLink href="#testimonials">Testimonials</FooterLink>
              </li>
              <li>
                <FooterLink href="#faq">FAQ</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-bold mb-4">Company</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/about">About Us</FooterLink>
              </li>
              <li>
                <FooterLink to="/contact">Contact</FooterLink>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-base font-bold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li>
                <FooterLink to="/privacy">Privacy Policy</FooterLink>
              </li>
              <li>
                <FooterLink to="/terms">Terms of Service</FooterLink>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-100 py-2 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-white font-medium">&copy; 2025 apna INVOICE. All rights reserved.</p>
            <div className="flex space-x-4">
              <SocialLink href="#">
                <Twitter className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="#">
                <Github className="w-5 h-5" />
              </SocialLink>
              <SocialLink href="#">
                <Linkedin className="w-5 h-5"/>
              </SocialLink>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
