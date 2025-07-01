import React, { useState, useEffect } from 'react';
import { Search, Filter, Code, Users, ChevronRight } from 'lucide-react';
import { fetchQuestions } from '../src/services/fetchQuestions';
import QuestionBox from './QuestionBox';

const QuestionListPage = () => {
    // State for questions and filters
    const [questions, setQuestions] = useState([]);
    const [filteredQuestions, setFilteredQuestions] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedDifficulty, setSelectedDifficulty] = useState('all');
    const [selectedTag, setSelectedTag] = useState('all');
    const [loading, setLoading] = useState(true);

    // Fetch questions from backend API using the service
    useEffect(() => {
        const getQuestions = async () => {
            setLoading(true);
            const data = await fetchQuestions();
            setQuestions(data);
            setFilteredQuestions(data);
            setLoading(false);
        };
        getQuestions();
    }, []);

    // Filter questions based on search and filters
    useEffect(() => {
        let filtered = questions.filter(question => {
            const matchesSearch = (question.title || question.question || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                (question.tags && question.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())));
            const matchesDifficulty = selectedDifficulty === 'all' || question.difficulty === selectedDifficulty;
            const matchesTag = selectedTag === 'all' || (question.tags && question.tags.includes(selectedTag));

            return matchesSearch && matchesDifficulty && matchesTag;
        });

        setFilteredQuestions(filtered);
    }, [searchTerm, selectedDifficulty, selectedTag, questions]);

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy': return 'text-emerald-400 bg-emerald-900/30 border border-emerald-600';
            case 'Medium': return 'text-orange-400 bg-orange-900/30 border border-orange-600';
            case 'Hard': return 'text-red-400 bg-red-900/30 border border-red-600';
            default: return 'text-gray-400 bg-gray-700 border border-gray-600';
        }
    };

    const allTags = [...new Set(questions.flatMap(q => q.tags || []))];

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-emerald-500 mx-auto mb-4"></div>
                    <p className="text-gray-300 text-lg">Loading questions...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black pt-15">
            {/* Header */}
            <div className="bg-gray-900 shadow-lg border-b border-gray-700 sticky top-0 z-10">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-400 to-emerald-600 bg-clip-text text-transparent">
                                Problem Set
                            </h1>
                            <p className="text-gray-400 mt-1">Master your coding skills with these challenges</p>
                        </div>

                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search problems..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-600 focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20 transition-all duration-200 bg-gray-800 text-gray-100 placeholder-gray-400 shadow-sm"
                            />
                        </div>
                    </div>

                    {/* Filters */}
                    <div className="flex flex-wrap gap-4 mt-6">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-400" />
                            <select
                                value={selectedDifficulty}
                                onChange={(e) => setSelectedDifficulty(e.target.value)}
                                className="px-3 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 transition-all duration-200 bg-gray-800 text-gray-100"
                            >
                                <option value="all">All Difficulty</option>
                                <option value="Easy">Easy</option>
                                <option value="Medium">Medium</option>
                                <option value="Hard">Hard</option>
                            </select>
                        </div>

                        <select
                            value={selectedTag}
                            onChange={(e) => setSelectedTag(e.target.value)}
                            className="px-3 py-2 rounded-lg border border-gray-600 focus:border-emerald-500 transition-all duration-200 bg-gray-800 text-gray-100"
                        >
                            <option value="all">All Tags</option>
                            {allTags.map(tag => (
                                <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Question List */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="space-y-4 w-full">
                    {filteredQuestions.map((question, index) => (
                        <QuestionBox key={question._id || question.id} question={question} index={index} />
                    ))}
                </div>

                {filteredQuestions.length === 0 && (
                    <div className="text-center py-16">
                        <div className="bg-gray-800 rounded-full w-24 h-24 flex items-center justify-center mx-auto mb-4 border border-gray-700">
                            <Search className="w-12 h-12 text-gray-400" />
                        </div>
                        <h3 className="text-xl font-semibold text-gray-300 mb-2">No questions found</h3>
                        <p className="text-gray-500">Try adjusting your search or filter criteria</p>
                    </div>
                )}
            </div>

            <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
        </div>
    );
};

export default QuestionListPage;