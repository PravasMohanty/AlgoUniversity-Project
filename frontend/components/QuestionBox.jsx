import React from 'react';
import { Users, Code, ChevronRight } from 'lucide-react';

const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case 'Easy': return 'text-emerald-400 bg-emerald-900/30 border border-emerald-600';
        case 'Medium': return 'text-orange-400 bg-orange-900/30 border border-orange-600';
        case 'Hard': return 'text-red-400 bg-red-900/30 border border-red-600';
        default: return 'text-gray-400 bg-gray-700 border border-gray-600';
    }
};

const QuestionBox = ({ question, index }) => {
    return (
        <div
            className="group bg-gray-800 rounded-2xl shadow-lg hover:shadow-emerald-500/10 border border-gray-700 hover:border-emerald-400 transition-all duration-300 transform hover:-translate-y-1 p-6 cursor-pointer w-full"
            style={{
                animationDelay: `${index * 100}ms`,
                animation: 'fadeInUp 0.5s ease-out forwards'
            }}
        >
            <div className="flex items-center justify-between w-full">
                <div className="flex-1 w-full min-w-0">
                    <div className="flex items-center gap-4 mb-3">
                        <h3 className="text-xl font-semibold text-gray-100 group-hover:text-emerald-400 transition-colors duration-200">
                            {question.title || question.question}
                        </h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(question.difficulty)}`}>
                            {question.difficulty}
                        </span>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {(question.tags || []).map(tag => (
                            <span
                                key={tag}
                                className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm font-medium hover:bg-emerald-600 hover:text-white transition-colors duration-200 border border-gray-600"
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <ChevronRight className="w-6 h-6 text-gray-500 group-hover:text-emerald-400 group-hover:translate-x-1 transition-all duration-200" />
            </div>
        </div>
    );
};

export default QuestionBox; 