import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import Editor from '@monaco-editor/react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import boilerplate from './boilerplate.json';


const LANGUAGES = [
    { label: 'C++', value: 'cpp' },
    { label: 'Python', value: 'py' },

];



function Ide() {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [output, setOutput] = useState('');
    const [userInput, setUserInput] = useState('');
    const [aiReview, setAiReview] = useState('');
    const [showAuthModal, setShowAuthModal] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setCode(boilerplate[language === 'py' ? 'python' : language]);
    }, [language]);

    const handleRun = async () => {
        const token = localStorage.getItem('token');
        if (!token) {
            setShowAuthModal(true);
            return;
        }
        const payload = {
            language,
            code,
            input: userInput
        };

        try {
            const { data } = await axios.post(import.meta.env.VITE_COMPILER_URL, payload);
            setOutput(data.output || data.error || "No output");
        } catch (error) {
            setOutput("Oops! Looks like there's a error in the code ...");
        }
    };

    const handleEditorDidMount = (editor, monaco) => {
        console.log('Editor mounted');
    };

    const handleEditorChange = (value, event) => {
        setCode(value);
    };

    const generateAIReview = async () => {
        const payload = {
            code,
            language
        };

        try {
            const { data } = await axios.post(import.meta.env.VITE_BACKEND_URL, payload);
            if (data.success) {
                setAiReview(data.review);
            } else {
                setAiReview('AI review failed: ' + (data.error || 'Unknown error'));
            }
        } catch (error) {
            setAiReview('Error in AI review, error: ' + error.message);
        }
    };

    return (
        <div className="flex bg-gray-900 pt-20" style={{ height: '100vh' }}>
            {/* Modal for login/signup */}
            {showAuthModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.35)' }}>
                    <div className="bg-gray-800 rounded-lg p-8 shadow-lg flex flex-col items-center">
                        <h2 className="text-xl font-bold text-white mb-4">Authentication Required</h2>
                        <p className="text-gray-200 mb-6">You need to sign up or login to run code.</p>
                        <div className="flex gap-4">
                            <button
                                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold"
                                onClick={() => navigate('/login')}
                            >
                                Login
                            </button>
                            <button
                                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-semibold"
                                onClick={() => navigate('/register')}
                            >
                                Sign Up
                            </button>
                            <button
                                className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-lg font-semibold"
                                onClick={() => setShowAuthModal(false)}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Left side - Monaco Editor (65%) */}
            <div className="w-2/3 flex flex-col">
                <div className="w-full h-96 px-4">
                    <div className="space-y-4 relative">
                        <div>
                            <label className="block text-gray-300 mb-2">Language</label>
                            <select
                                className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-gray-100"
                                value={language}
                                onChange={e => setLanguage(e.target.value)}
                            >
                                {LANGUAGES.map(lang => (
                                    <option key={lang.value} value={lang.value}>{lang.label}</option>
                                ))}
                            </select>
                        </div>
                        <div className="relative">
                            <label className="block text-gray-300 mb-2">Your Code</label>
                            <Editor
                                height="70vh"
                                theme="vs-dark"
                                defaultLanguage={language}
                                onMount={handleEditorDidMount}
                                value={code}
                                onChange={handleEditorChange}
                            />
                            {/* Buttons at bottom right of editor */}
                            <div className="absolute right-2 bottom-2 flex flex-col sm:flex-row gap-2 z-10">
                                <button
                                    type="button"
                                    onClick={handleRun}
                                    className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition shadow"
                                >
                                    Run Code
                                </button>
                                <button
                                    type="button"
                                    onClick={generateAIReview}
                                    className="py-2 px-4 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-lg transition shadow"
                                >
                                    AI Review
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Right side - Text areas (35%) */}
            <div className="w-1/3 flex flex-col p-4 space-y-4">
                {/* Input Section */}
                <div className="flex-1 flex flex-col">
                    <label className="block text-gray-300 mb-2">Input</label>
                    <textarea
                        value={userInput}
                        onChange={(e) => setUserInput(e.target.value)}
                        placeholder="Enter your input here..."
                        className="flex-1 p-3 rounded bg-gray-800 border border-gray-700 text-gray-100 resize-none outline-none font-mono text-sm"
                        style={{ minHeight: '120px', maxHeight: '180px', overflow: 'auto' }}
                    />
                </div>

                {/* Output Section */}
                <div className="flex-1 flex flex-col">
                    <label className="block text-gray-300 mb-2">Output</label>
                    <div className="flex-1 bg-gray-800 rounded border border-gray-700 text-gray-200 p-3 overflow-auto" style={{ maxHeight: '180px' }}>
                        <pre className="whitespace-pre-wrap font-mono text-sm">{output || 'Output will appear here...'}</pre>
                    </div>
                </div>

                {/* AI Review Section */}
                <div className="flex-1 flex flex-col">
                    <label className="block text-gray-300 mb-2">AI Review</label>
                    <div className="flex-1 bg-gray-800 rounded border border-gray-700 text-gray-100 p-3 overflow-auto" style={{ maxHeight: '180px' }}>
                        <ReactMarkdown>{aiReview || 'AI review will appear here...'}</ReactMarkdown>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Ide;