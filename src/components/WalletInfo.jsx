import React from 'react';
import { Wallet, AlertCircle, Shield, Zap, ExternalLink, ChevronRight } from 'lucide-react';

const WalletInfo = ({ account, balance, error }) => {
  return (
    <section className="mb-12">
      <div className="bg-white/5 backdrop-blur-md rounded-2xl p-6 border border-white/10">
        <h2 className="text-xl font-bold mb-6 flex items-center">
          <Wallet className="w-6 h-6 mr-2 text-primary-400" />
          Wallet Information
        </h2>
        
        {error && (
          <div className="bg-red-500/20 text-red-100 p-4 rounded-lg mb-4 flex items-start border border-red-500/30">
            <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
            <p>{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <p className="text-sm text-gray-400 mb-2">Wallet Address</p>
            <div className="flex items-center">
              <p className="font-mono text-sm md:text-base break-all">
                {account}
              </p>
              <a 
                href={`https://etherscan.io/address/${account}`} 
                target="_blank" 
                rel="noopener noreferrer"
                className="ml-2 text-primary-400 hover:text-primary-300 transition-colors"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            </div>
          </div>
          
          <div className="bg-white/5 p-5 rounded-xl border border-white/10">
            <p className="text-sm text-gray-400 mb-2">ETH Balance</p>
            <div className="flex items-center">
              <p className="text-2xl font-bold">{balance} ETH</p>
              <span className="ml-2 text-xs px-2 py-1 bg-primary-500/20 text-primary-400 rounded-full">
                Mainnet
              </span>
            </div>
          </div>
        </div>
        
        <div className="mt-6 pt-6 border-t border-white/10">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center">
              <div className="bg-green-500/20 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <Shield className="w-5 h-5 text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Security Status</p>
                <p className="font-medium text-green-400">Connected Securely</p>
              </div>
            </div>
            
            <div className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center">
              <div className="bg-primary-500/20 w-10 h-10 rounded-lg flex items-center justify-center mr-3">
                <Zap className="w-5 h-5 text-primary-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Network</p>
                <p className="font-medium">Ethereum Mainnet</p>
              </div>
            </div>
            
            <a 
              href={`https://etherscan.io/address/${account}`}
              target="_blank"
              rel="noopener noreferrer" 
              className="bg-white/5 p-4 rounded-xl border border-white/10 flex items-center hover:bg-white/10 transition-colors"
            >
              <div className="flex-1">
                <p className="text-sm text-gray-400">View on Explorer</p>
                <p className="font-medium">Etherscan</p>
              </div>
              <ChevronRight className="w-5 h-5 text-gray-400" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WalletInfo;