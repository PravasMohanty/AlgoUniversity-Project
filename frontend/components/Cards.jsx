import React from 'react';
import {
    Code,
    Zap,
    Users,
    Trophy,
    BookOpen,
    Target,
    ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Cards = () => {
    const codingCards = [
        {
            icon: <Code className="w-8 h-8" />,
            title: "Code Editor",
            description: "Advanced IDE with syntax highlighting, auto-completion, and AI support.",
            gradient: "from-blue-500 to-cyan-400",
            delay: "0ms"
        },
        {
            icon: <Zap className="w-8 h-8" />,
            title: "Coders' Guild",
            description: "Connect with fellow coders and Discuss doubts.",
            gradient: "from-purple-500 to-pink-400",
            delay: "100ms"
        },
        {
            icon: <Users className="w-8 h-8" />,
            title: "Pair Programming",
            description: "Collaborate with developers worldwide in real-time coding sessions.",
            gradient: "from-green-500 to-emerald-400",
            delay: "200ms"
        },
        {
            icon: <Trophy className="w-8 h-8" />,
            title: "Coding Contests",
            description: "Participate in competitive programming challenges and climb the leaderboard.",
            gradient: "from-yellow-500 to-orange-400",
            delay: "300ms"
        },
        {
            icon: <BookOpen className="w-8 h-8" />,
            title: "Learning Hub",
            description: "Comprehensive tutorials, documentation, and coding best practices.",
            gradient: "from-indigo-500 to-blue-400",
            delay: "400ms"
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Code Challenges",
            description: "Daily coding problems to sharpen your skills and master algorithms.",
            gradient: "from-red-500 to-pink-400",
            delay: "500ms"
        }
    ];

    return (
        <section id="features" className="py-20 bg-gradient-to-b from-green-400/5 to-transparent">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-white to-green-400 bg-clip-text text-transparent">
                        Powerful Development Tools
                    </h2>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                        Everything you need to code, learn, and grow as a developer in one comprehensive platform.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
                    {codingCards.map((card, index) => {
                        const cardContent = (
                            <div
                                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-8 hover:scale-105 hover:bg-gray-800/50 hover:border-green-400/30 hover:shadow-2xl hover:shadow-green-400/10 transition-all duration-500 cursor-pointer"
                                style={{ animationDelay: card.delay }}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${card.gradient} rounded-2xl flex items-center justify-center mb-6 text-white group-hover:scale-110 transition-transform duration-300`}>
                                    {card.icon}
                                </div>
                                <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-green-400 transition-colors duration-300">
                                    {card.title}
                                </h3>
                                <p className="text-gray-300 leading-relaxed mb-6">
                                    {card.description}
                                </p>
                                <div className="flex items-center text-green-400 group-hover:translate-x-2 transition-transform duration-300">
                                    <span className="font-medium">Learn More</span>
                                    <ChevronRight className="w-4 h-4 ml-1" />
                                </div>
                            </div>
                        );
                        return card.title === 'Code Editor' ? (
                            <Link to="/ide" key={index}>
                                {cardContent}
                            </Link>
                        ) : (
                            <div key={index}>{cardContent}</div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Cards; 