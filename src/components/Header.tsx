import React from 'react';

const Header: React.FC = () => {
    return (
        <header className="fixed top-0 w-full backdrop-blur-sm z-50 border-b border-cyber-cyan bg-cyber-dark/90">
            <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
                <div className="flex items-center space-x-3">
                    <a href="#home">
                        <img src="/Asset 10M9awem.png" alt="CyberGuards Logo" className="h-18" />
                    </a>
                </div>
                <div className="hidden md:flex space-x-8">
                    <a href="#about" className="hover:text-cyan-400 transition-colors">About</a>
                    <a href="#axes" className="hover:text-cyan-400 transition-colors">Our Axes</a>
                    <a href="#values" className="hover:text-cyan-400 transition-colors">Values</a>
                    <a href="#activities" className="hover:text-cyan-400 transition-colors">Activities</a>
                    <a href="#gallery" className="hover:text-cyan-400 transition-colors">Gallery</a>
                    <a href="#board" className="hover:text-cyan-400 transition-colors">Board</a>
                </div>
            </nav>
        </header>
    );
};

export default Header;
