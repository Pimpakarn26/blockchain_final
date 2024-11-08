// Navbar.jsx
import React from 'react';

function Navbar({ account }) {
  return (
    <nav className="w-full p-4 bg-indigo-600 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        <div className="text-white text-2xl font-semibold">
          Token Sale DApp
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-white text-lg">
            {account ? (
              <span>Account: {account}</span>
            ) : (
              <span className="italic text-gray-300">Not connected</span>
            )}
          </div>
          {/* ตัวเลือกการเชื่อมต่อ */}
          {!account && (
            <button className="btn btn-outline btn-light text-white text-lg hover:bg-indigo-700">
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
