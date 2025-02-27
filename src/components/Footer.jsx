import React from 'react';
import { Coins } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-20 border-t border-white/10 bg-dark-950/70 backdrop-blur-md">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <div className="bg-primary-500/20 w-8 h-8 rounded-lg flex items-center justify-center mr-2">
              <Coins className="w-5 h-5 text-primary-400" />
            </div>
            <p className="font-medium bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
              NathConnect
            </p>
          </div>
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} NathConnect. Fullstack Web Developer Technical Test.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;