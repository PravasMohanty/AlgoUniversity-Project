import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from './CodeEditor';

const QuestionSolvePage = () => {
    const { slug } = useParams();
    const [question, setQuestion] = useState(null);
    const [sampleTestCases, setSampleTestCases] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchQuestion = async () => {
            setLoading(true);
            setError(null);
            try {
                const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://44.198.131.81:5000';
                const res = await fetch(`${API_BASE_URL}/practice/${slug}`);
                const data = await res.json();
                if (data && data.question) {
                    setQuestion(data.question);
                    setSampleTestCases(data.sampleTestCases || []);
                } else {
                    setError('Question not found');
                }
            } catch (err) {
                setError('Failed to fetch question');
            } finally {
                setLoading(false);
            }
        };
        fetchQuestion();
    }, [slug]);

    if (loading) return <div className="min-h-screen flex items-center justify-center text-emerald-400">Loading...</div>;
    if (error) return <div className="min-h-screen flex items-center justify-center text-red-400">{error}</div>;
    if (!question) return null;

    return (
        <div className="w-full bg-gradient-to-br from-gray-900 to-black flex flex-col items-stretch min-h-[80vh] " >
            <div className="w-full max-w-9xl bg-gray-900 pt-10 shadow-lg border border-gray-700 p-0 flex flex-col md:flex-row min-h-[80vh] ">
                {/* Left: Question Details */}
                <div className="md:w-5/12 w-full p-8 border-b md:border-b-0 md:border-r border-gray-700">
                    <h1 className="text-3xl font-extrabold text-emerald-400 mb-2">{question.titletag || question.title || question.question}</h1>
                    {question.description && <h2 className="text-lg font-semibold text-gray-200 mb-4 whitespace-pre-line">{question.description}</h2>}

                    {/* Sample Input/Output */}
                    <div className="mb-6">
                        <h3 className="text-lg font-semibold text-gray-100 mb-3">Sample Input/Output</h3>
                        <div className="space-y-3">
                            {sampleTestCases.length > 0 ? (
                                sampleTestCases.map((testCase, index) => (
                                    <div key={index} className="bg-gray-800 rounded-lg p-4 border border-gray-600">
                                        <div className="text-gray-400 text-sm font-medium mb-2">Sample {index + 1}:</div>
                                        <div className="text-gray-300 text-sm mb-1">Input: {testCase.input}</div>
                                        <div className="text-gray-300 text-sm">Output: {testCase.output}</div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-400 text-sm">No sample test cases available</div>
                            )}
                        </div>
                    </div>

                    {question.examples && question.examples.length > 0 && (
                        <div className="mb-4">
                            <h3 className="text-lg font-semibold text-gray-100 mb-2">Examples</h3>
                            {question.examples.map((ex, i) => (
                                <div key={i} className="bg-gray-800 rounded-lg p-3 mb-2 border border-gray-600">
                                    <div className="text-gray-400 text-sm">Input: <span className="text-gray-200">{ex.input}</span></div>
                                    <div className="text-gray-400 text-sm">Output: <span className="text-gray-200">{ex.output}</span></div>
                                    {ex.explanation && <div className="text-gray-400 text-xs mt-1">{ex.explanation}</div>}
                                </div>
                            ))}
                        </div>
                    )}
                    {question.constraints && question.constraints.length > 0 && (
                        <div>
                            <h3 className="text-lg font-semibold text-gray-100 mb-2">Constraints</h3>
                            <ul className="list-disc list-inside text-gray-300 text-sm">
                                {question.constraints.map((c, i) => <li key={i}>{c}</li>)}
                            </ul>
                        </div>
                    )}
                </div>
                {/* Right: Code Editor */}
                <div className="md:w-7/12 w-full p-8 bg-gray-900">
                    <CodeEditor question={question} />
                </div>
            </div>
        </div>
    );
};

export default QuestionSolvePage; 