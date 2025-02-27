import React from 'react';
import { TrendingUp } from 'lucide-react';
import { formatLargeNumber } from '../utils/formatLargaNumber';

const CryptoCard = ({ crypto }) => {
  const priceChangeColor = crypto.price_change_percentage_24h >= 0 
    ? 'text-green-500' 
    : 'text-red-500';

  return (
    <div className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden border border-white/10 hover:border-primary-400/50 transition-all duration-300 hover:shadow-glow">
      <div className="p-5">
        <div className="flex items-center mb-3">
          <img src={crypto.image} alt={crypto.name} className="w-10 h-10 mr-3 rounded-full" />
          <div>
            <h3 className="font-bold text-lg">{crypto.name}</h3>
            <p className="text-gray-400 text-sm uppercase">{crypto.symbol}</p>
          </div>
        </div>
        
        <div className="mt-4">
          <p className="text-2xl font-bold">${crypto.current_price.toLocaleString()}</p>
          <div className="flex items-center mt-1">
            <span className={`${priceChangeColor} flex items-center font-medium`}>
              {crypto.price_change_percentage_24h >= 0 ? 
                <TrendingUp className="w-4 h-4 mr-1" /> : 
                <TrendingUp className="w-4 h-4 mr-1 transform rotate-180" />}
              {Math.abs(crypto.price_change_percentage_24h).toFixed(2)}%
            </span>
            <span className="text-gray-400 text-sm ml-2">24h</span>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-white/10">
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <p className="text-gray-400">Market Cap</p>
              <p className="font-medium">${formatLargeNumber(crypto.market_cap)}</p>
            </div>
            <div>
              <p className="text-gray-400">Volume (24h)</p>
              <p className="font-medium">${formatLargeNumber(crypto.total_volume)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CryptoCard;