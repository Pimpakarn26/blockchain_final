import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-indigo-100 text-black p-4 mt-8 w-full h-full">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <p className="text-sm">© 2024 TokenSale DApp. All rights reserved.</p>
                <div className="space-x-6 flex items-center">
                    {/* GitHub Link with Icon */}
                    <a href="https://github.com" target="_blank" className="hover:text-indigo-200">
                        <img src="https://cdn-icons-png.flaticon.com/512/25/25231.png" alt="GitHub" className="w-6 h-6 inline-block" />
                    </a>

                    {/* Twitter Link with Icon */}
                    <a href="https://twitter.com" target="_blank" className="hover:text-indigo-200">
                        <img src="https://cdn-icons-png.flaticon.com/512/733/733579.png" alt="Twitter" className="w-6 h-6 inline-block" />
                    </a>

                    {/* LinkedIn Link with Icon */}
                    <a href="https://linkedin.com" target="_blank" className="hover:text-indigo-200">
                        <img src="https://cdn-icons-png.flaticon.com/512/174/174857.png" alt="LinkedIn" className="w-6 h-6 inline-block" />
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
