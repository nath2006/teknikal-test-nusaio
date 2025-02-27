import React from 'react';
import { BarChart3, RefreshCw, ExternalLink,AlertCircle   } from 'lucide-react';
import CryptoCard from './CryptoCard';

const CryptoPrices = ({ cryptoData, isLoading, error, lastUpdated, fetchCryptoData }) => {
  return (
    <section>
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center">
            <BarChart3 className="w-6 h-6 mr-2 text-primary-400" />
            Cryptocurrency Prices
          </h2>
          {lastUpdated && (
            <p className="text-sm text-gray-400 mt-1">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        
        <div className="flex items-center gap-4">
          <button 
            onClick={fetchCryptoData}
            disabled={isLoading}
            className="flex items-center px-3 py-2 rounded-lg text-sm font-medium bg-white/5 hover:bg-white/10 border border-white/10 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          
          <a 
            href="https://www.coingecko.com/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-sm text-primary-400 hover:text-primary-300 flex items-center transition-colors"
          >
            Data from CoinGecko
            <ExternalLink className="w-4 h-4 ml-1" />
          </a>
        </div>
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {[...Array(5)].map((_, index) => (
            <div key={index} className="bg-white/5 rounded-xl h-64 animate-pulse-slow"></div>
          ))}
        </div>
      ) : error ? (
        <div className="bg-red-500/20 text-red-100 p-4 rounded-lg flex items-start border border-red-500/30">
          <AlertCircle className="w-5 h-5 mr-2 flex-shrink-0 mt-0.5" />
          <p>{error}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
          {cryptoData.map((crypto) => (
            <CryptoCard key={crypto.id} crypto={crypto} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CryptoPrices;