import React from 'react';
import { Link } from 'react-router-dom';
import {
    Star,
    Play,
    Globe,
    ArrowDown
} from 'lucide-react';

const Homepage = ({ heroRef }) => {
    const scrollToFeatures = () => {
        const featuresSection = document.getElementById('features');
        if (featuresSection) {
            featuresSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    return (
        <>
            {/* Hero Section */}
            <section ref={heroRef} id="home" className="min-h-screen flex items-center justify-center relative">
                <div className="absolute inset-0 bg-gradient-radial from-green-400/5 via-transparent to-transparent"></div>

                <div className="max-w-6xl mx-auto px-4 text-center z-10">
                    <div className="mb-8 animate-fade-in-up">
                        <div className="inline-flex items-center space-x-2 bg-green-400/10 border border-green-400/20 rounded-full px-4 py-2 mb-6">
                            <Star className="w-4 h-4 text-green-400" />
                            <span className="text-green-400 text-sm font-medium">Welcome to the Future of Coding</span>
                        </div>
                    </div>

                    <h1 className="text-5xl md:text-7xl font-extrabold mb-6 animate-fade-in-up animation-delay-200">
                        <span className="bg-gradient-to-r from-white via-green-400 to-emerald-400 bg-clip-text text-transparent">
                            Forge Your Code,
                        </span>
                        <br />
                        <span className="bg-gradient-to-r from-emerald-400 to-green-300 bg-clip-text text-transparent">
                            Shape Your Future
                        </span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto animate-fade-in-up animation-delay-400">
                        The ultimate platform for developers to code, collaborate, compete, and create extraordinary software solutions.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up animation-delay-600">
                        <button className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-8 py-4 rounded-full text-lg font-semibold hover:scale-105 hover:shadow-xl hover:shadow-green-400/40 transition-all duration-300 flex items-center justify-center space-x-2">
                            <Play className="w-5 h-5" />
                            <Link to="/questions" className="text-inherit no-underline"><span>Start Coding Now</span></Link>
                        </button>
                        <button
                            onClick={scrollToFeatures}
                            className="border-2 border-green-400/50 text-green-400 px-8 py-4 rounded-full text-lg font-semibold hover:bg-green-400/10 hover:border-green-400 hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2"
                        >
                            <Globe className="w-5 h-5" />
                            <span>Explore Features</span>
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto animate-fade-in-up animation-delay-800">
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">500K+</div>
                            <div className="text-gray-400">Active Developers</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">1M+</div>
                            <div className="text-gray-400">Lines of Code</div>
                        </div>
                        <div className="text-center">
                            <div className="text-3xl font-bold text-green-400 mb-2">24/7</div>
                            <div className="text-gray-400">Global Support</div>
                        </div>
                    </div>
                </div>

                <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-green-400 animate-bounce">
                    <ArrowDown className="w-6 h-6" />
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-gradient-to-r from-green-400/10 to-emerald-400/10">
                <div className="max-w-4xl mx-auto px-4 text-center">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                        Ready to Start Your Coding Journey?
                    </h2>
                    <p className="text-xl text-gray-300 mb-8">
                        Join thousands of developers who are already building the future with CodeForge.
                    </p>
                    <Link to="/register" className="text-inherit no-underline">
                        <button className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-12 py-4 rounded-full text-xl font-bold hover:scale-105 hover:shadow-2xl hover:shadow-green-400/40 transition-all duration-300">
                            Get Started Free
                        </button>
                    </Link>
                </div>
            </section>
        </>
    );
};

export default Homepage;
