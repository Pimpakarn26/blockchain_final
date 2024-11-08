import React, { useState, useEffect } from 'react';
import Web3 from 'web3';
import contractABI from './contractABI.json';
import Swal from 'sweetalert2';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import { FaWallet, FaBalanceScale, FaChartLine, FaTag, FaShoppingCart, FaRegCreditCard } from 'react-icons/fa';

const contractAddress = '0x19c0cd4d7c78e3e5277306a8b2ae45f54c16a79c';

function App() {
  const [web3, setWeb3] = useState(null);
  const [contract, setContract] = useState(null);
  const [account, setAccount] = useState('');
  const [balance, setBalance] = useState(0);
  const [totalSupply, setTotalSupply] = useState(0);
  const [tokenAmount, setTokenAmount] = useState(0);
  const [pricePerToken, setPricePerToken] = useState(0);

  useEffect(() => {
    async function loadBlockchainData() {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        await window.ethereum.enable();
        setWeb3(web3);

        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);

        const tokenSaleContract = new web3.eth.Contract(contractABI, contractAddress);
        setContract(tokenSaleContract);

        const totalSupply = await tokenSaleContract.methods.totalSupply().call();
        setTotalSupply(web3.utils.fromWei(totalSupply, 'ether'));

        const price = await tokenSaleContract.methods.pricePerToken().call();
        setPricePerToken(web3.utils.fromWei(price, 'ether'));

        const balance = await tokenSaleContract.methods.checkBalance().call({ from: accounts[0] });
        setBalance(web3.utils.fromWei(balance, 'ether'));
      } else {
        Swal.fire({
          icon: 'error',
          title: 'MetaMask Missing',
          text: 'Please install MetaMask to use this application.',
        });
      }
    }

    loadBlockchainData();
  }, []);

  const buyTokens = async () => {
    try {
      const cost = web3.utils.toWei((tokenAmount * pricePerToken).toString(), 'ether');
      await contract.methods.buyTokens(tokenAmount).send({ from: account, value: cost });
      Swal.fire({ icon: 'success', title: 'Success!', text: `You have successfully purchased ${tokenAmount} tokens!` });
      window.location.reload();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Transaction Failed', text: 'Please try again.' });
    }
  };

  const sellTokens = async () => {
    try {
      await contract.methods.sellTokens(tokenAmount).send({ from: account });
      Swal.fire({ icon: 'success', title: 'Success!', text: `You have successfully sold ${tokenAmount} tokens!` });
      window.location.reload();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Transaction Failed', text: 'Please try again.' });
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 p-4">
      <Header />
      <div className="bg-white w-full max-w-4xl p-6 rounded-xl shadow-2xl mb-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
          <div className="p-4 bg-indigo-100 rounded-xl shadow-md flex flex-col">
            <div className="text-lg font-semibold text-gray-700 flex items-center mb-2">
              <FaWallet className="mr-2" />
              Account
            </div>
            <div className="text-xl md:text-2xl text-indigo-800 overflow-hidden text-ellipsis">
              {account || 'Not connected'}
            </div>
          </div>

          <div className="p-4 bg-green-100 rounded-xl shadow-md flex flex-col">
            <div className="text-lg font-semibold text-gray-700 flex items-center mb-2">
              <FaBalanceScale className="mr-2" />
              Your Balance
            </div>
            <div className="text-xl md:text-2xl text-green-800">{balance} MTK</div>
          </div>

          <div className="p-4 bg-blue-100 rounded-xl shadow-md flex flex-col">
            <div className="text-lg font-semibold text-gray-700 flex items-center mb-2">
              <FaChartLine className="mr-2" />
              Total Supply
            </div>
            <div className="text-xl md:text-2xl text-blue-800">{totalSupply} MTK</div>
          </div>

          <div className="p-4 bg-yellow-100 rounded-xl shadow-md flex flex-col">
            <div className="text-lg font-semibold text-gray-700 flex items-center mb-2">
              <FaTag className="mr-2" />
              Price per Token
            </div>
            <div className="text-xl md:text-2xl text-yellow-800">{pricePerToken} ETH</div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-2xl w-full max-w-md">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-gray-800 mb-4">Buy or Sell Tokens</h2>
        <div className="form-control w-full mb-4">
          <label className="label text-lg">Token Amount</label>
          <input
            type="number"
            placeholder="Enter token amount"
            value={tokenAmount}
            onChange={(e) => setTokenAmount(e.target.value)}
            className="input input-bordered w-full rounded-lg border-2 border-gray-300 p-3"
          />
        </div>

        <div className="flex flex-col gap-3">
          <button
            onClick={buyTokens}
            className="btn bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg flex items-center justify-center"
          >
            <FaShoppingCart className="mr-2" />
            Buy Tokens
          </button>
          <button
            onClick={sellTokens}
            className="btn bg-yellow-500 hover:bg-yellow-600 text-white py-3 rounded-lg flex items-center justify-center"
          >
            <FaRegCreditCard className="mr-2" />
            Sell Tokens
          </button>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default App;
