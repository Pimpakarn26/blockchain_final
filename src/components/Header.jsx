import React from "react";

const Header = () => {
  return (
    <div className=" w-full py-6 flex items-center justify-right space-x-4">
      <img
        src="https://cdn-icons-png.flaticon.com/256/10692/10692995.png"
        alt="Logo"
        className="w-16 h-16"
      />
      <h1 className="text-5xl font-bold text-primary-content ">
      TOKENS SALE D-APP
      </h1>
    </div>
  );
};

export default Header;