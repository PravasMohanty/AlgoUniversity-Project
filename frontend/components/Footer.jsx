import React from 'react';
import {
    Github,
    Twitter,
    Linkedin,
    Mail
} from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-900/80 border-t border-gray-700/50 py-16">
            <div className="max-w-7xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
                    {/* Logo & Description */}
                    <div className="md:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-emerald-500 rounded-lg flex items-center justify-center">
                                <span className="text-black font-bold text-lg">C</span>
                            </div>
                            <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                CodeForge
                            </span>
                        </div>
                        <p className="text-gray-400 leading-relaxed mb-6">
                            Empowering developers worldwide with cutting-edge tools and collaborative coding environment.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <Github className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <Twitter className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <Linkedin className="w-6 h-6" />
                            </a>
                            <a href="#" className="text-gray-400 hover:text-green-400 transition-colors">
                                <Mail className="w-6 h-6" />
                            </a>
                        </div>
                    </div>

                    {/* Product */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-lg">Product</h3>
                        <div className="space-y-3">
                            {['Code Editor', 'Live Compiler', 'Pair Programming', 'Contests', 'Learning Hub'].map((item) => (
                                <a key={item} href="#" className="block text-gray-400 hover:text-green-400 transition-colors">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Company */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-lg">Company</h3>
                        <div className="space-y-3">
                            {['About Us', 'Careers', 'Blog', 'Press', 'Partners'].map((item) => (
                                <a key={item} href="#" className="block text-gray-400 hover:text-green-400 transition-colors">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Support */}
                    <div>
                        <h3 className="text-white font-bold mb-4 text-lg">Support</h3>
                        <div className="space-y-3">
                            {['Help Center', 'Documentation', 'API Reference', 'Community', 'Contact'].map((item) => (
                                <a key={item} href="#" className="block text-gray-400 hover:text-green-400 transition-colors">
                                    {item}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-700/50 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-gray-500 mb-4 md:mb-0">
                        © 2024 CodeForge. All rights reserved. Built with ❤️ for developers.
                    </p>
                    <div className="flex space-x-6">
                        <a href="#" className="text-gray-500 hover:text-green-400 transition-colors text-sm">
                            Privacy Policy
                        </a>
                        <a href="#" className="text-gray-500 hover:text-green-400 transition-colors text-sm">
                            Terms of Service
                        </a>
                        <a href="#" className="text-gray-500 hover:text-green-400 transition-colors text-sm">
                            Cookie Policy
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
