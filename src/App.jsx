import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { Wallet, Coins, BarChart3, ExternalLink, AlertCircle, TrendingUp, RefreshCw, ChevronRight, Globe, Shield, Zap } from 'lucide-react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Header from './components/Header';
import WalletInfo from './components/WalletInfo';
import CryptoPrices from './components/CryptoPrice';
import Footer from './components/Footer';
import FeatureCard from './components/FeatureCard';

function App() {
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState('');
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState('');
  const [cryptoData, setCryptoData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);

  const fetchCryptoData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/coins/markets',
        {
          params: {
            vs_currency: 'usd',
            ids: 'bitcoin,ethereum,solana,cardano,polkadot',
            order: 'market_cap_desc',
            per_page: 5,
            page: 1,
            sparkline: false,
          },
        }
      );
      setCryptoData(response.data);
      setLastUpdated(new Date());
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching crypto data:', error);
      setError('Failed to load cryptocurrency data');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCryptoData();
    
    const checkConnection = async () => {
      if (window.ethereum && window.ethereum.selectedAddress) {
        try {
          const address = window.ethereum.selectedAddress;
          setAccount(address);
          
          const provider = new ethers.BrowserProvider(window.ethereum);
          const balance = await provider.getBalance(address);
          const etherBalance = ethers.formatEther(balance);
          setBalance(parseFloat(etherBalance).toFixed(4));
        } catch (error) {
          console.error('Error checking connection:', error);
        }
      }
    };
    
    checkConnection();
  }, []);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        setIsConnecting(true);
        setError('');
        
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        const account = accounts[0];
        setAccount(account);
        
        const provider = new ethers.BrowserProvider(window.ethereum);
        const balance = await provider.getBalance(account);
        const etherBalance = ethers.formatEther(balance);
        setBalance(parseFloat(etherBalance).toFixed(4));
        
        setIsConnecting(false);
      } catch (error) {
       // console.error('Error connecting wallet:', error);
        setIsConnecting(false);
        toast.error('Failed to connect wallet. Please try again.', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
        });
      }
    } else {
      toast.error('MetaMask is not installed. Please install MetaMask to use this feature.', {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
      });
    }
  };

  const formatAddress = (address) => {
    if (!address) return '';
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-950 via-dark-900 to-secondary-950 text-white font-sans">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <Header 
        account={account} 
        isConnecting={isConnecting} 
        connectWallet={connectWallet} 
        formatAddress={formatAddress} 
      />
      
      <main className="container mx-auto px-4 py-8">
        {!account && (
          <section className="mb-16 py-16 text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary-400 to-secondary-400">
              Your Gateway to Web3 Finance
              <h1/>
            </h1>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
              Connect your wallet to track your ETH balance and monitor real-time cryptocurrency prices in one dashboard.
            </p>
            <button
              onClick={connectWallet}
              disabled={isConnecting}
              className={`inline-flex items-center px-6 py-3 rounded-lg font-medium text-lg bg-primary-600 hover:bg-primary-700 transition-all duration-300 ${
                isConnecting ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              <Wallet className="w-6 h-6 mr-2" />
              {isConnecting ? 'Connecting...' : 'Connect Wallet'}
            </button>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
              <FeatureCard 
                icon={Wallet} 
                title="Secure Wallet Connection" 
                description="Connect your MetaMask wallet with a single click to view your ETH balance securely."
              />
              <FeatureCard 
                icon={BarChart3} 
                title="Real-time Crypto Prices" 
                description="Track live prices of top cryptocurrencies with 24-hour change indicators."
              />
              <FeatureCard 
                icon={Globe} 
                title="Web3 Integration" 
                description="Built for the decentralized web with direct blockchain connectivity."
              />
            </div>
          </section>
        )}
        
        {account && (
          <WalletInfo 
            account={account} 
            balance={balance} 
            error={error} 
          />
        )}
        
        <CryptoPrices 
          cryptoData={cryptoData} 
          isLoading={isLoading} 
          error={error} 
          lastUpdated={lastUpdated} 
          fetchCryptoData={fetchCryptoData} 
        />
      </main>
      
      <Footer />
    </div>
  );
}

export default App;