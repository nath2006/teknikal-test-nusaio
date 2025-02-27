import React from 'react';
import { Wallet, Coins } from 'lucide-react';

const Header = ({ account, isConnecting, connectWallet, formatAddress }) => {
  return (
    <header className="sticky top-0 z-10 backdrop-blur-md bg-dark-950/70 border-b border-white/10">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-primary-500/20 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
              <Coins className="w-6 h-6 text-primary-400" />
            </div>
            <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">NathConnect</h1>
          </div>
          
          <button
            onClick={connectWallet}
            disabled={isConnecting}
            className={`flex items-center px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
              account 
                ? 'bg-green-500/20 text-green-400 border border-green-500/30 hover:bg-green-500/30' 
                : 'bg-primary-600 hover:bg-primary-700 text-white'
            } ${isConnecting ? 'opacity-75 cursor-not-allowed' : ''}`}
          >
            <Wallet className="w-5 h-5 mr-2" />
            {isConnecting ? 'Connecting...' : account ? formatAddress(account) : 'Connect Wallet'}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;