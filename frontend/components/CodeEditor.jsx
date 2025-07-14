import React, { useState } from 'react';
import Editor from '@monaco-editor/react';
import axios from 'axios';

// import { runCode } from '../src/services/api';

const LANGUAGES = [
    { label: 'C++', value: 'cpp' },
    { label: 'Python', value: 'py' },
    { label: 'Java', value: 'java' },
];

const CodeEditor = ({ question }) => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [output, setOutput] = useState('');
    const [userInput, setUserInput] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!question || !question.slug) {
            setOutput("No question selected.");
            return;
        }
        try {
            setOutput("Submitting...");
            const token = localStorage.getItem('token');
            const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
            const response = await axios.post(
                `${API_BASE_URL}/practice/${question.slug}/submission`,
                {
                    code,
                    language
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            // Format the result for display
            const { verdict, testCaseResults } = response.data;
            let resultText = `Verdict: ${verdict}\n\n`;
            testCaseResults.forEach((test, idx) => {
                resultText += `Test Case ${idx + 1}:\n`;
                resultText += `Input: ${test.input}\n`;
                resultText += `Expected: ${test.expectedOutput}\n`;
                resultText += `Actual: ${test.actualOutput}\n`;
                resultText += `Passed: ${test.passed ? "✅" : "❌"}\n\n`;
            });
            setOutput(resultText);
        } catch (err) {
            setOutput(
                err.response?.data?.error ||
                "Error submitting code. Please try again."
            );
        }
    };

    const handleRun = async () => {
        const payload = {
            language,
            code,
            input: userInput
        };

        try {
            const COMPILER_URL = import.meta.env.VITE_COMPILER_URL || 'http://localhost:8100';
            const { data } = await axios.post(`${COMPILER_URL}`, payload);
            setOutput(data.output);
        } catch (error) {
            setOutput('Error executing code, error: ' + error.message);
        }
    };

    const handleEditorDidMount = (editor, monaco) => {
        // Editor is mounted and ready
        console.log('Editor mounted');
    };

    const handleEditorChange = (value, event) => {
        setCode(value);
    };

    return (
        <div className="w-full min-h-screen px-4">
            <form onSubmit={handleSubmit} className="space-y-4 relative">
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
                        height="45vh"
                        theme="vs-dark"
                        defaultLanguage={language}
                        onMount={handleEditorDidMount}
                        value={code}
                        onChange={handleEditorChange}
                    />
                    {/* Buttons at bottom right of editor */}
                    <div className="absolute right-2 bottom-2 flex flex-col sm:flex-row gap-2 z-10">
                        <button type="submit" className="pl-2 py-2 px-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition shadow">Submit Code</button>
                        <button type="button" onClick={handleRun} className="py-2 px-4 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition shadow">Run Code</button>
                    </div>
                </div>
                <div className="mt-2 bg-gray-800 rounded-lg p-2 border border-gray-700 text-gray-200 min-h-[170px]">
                    <strong>Output :</strong>
                    <pre className="whitespace-pre-wrap mt-2">{output || ''}</pre>
                </div>
            </form>
        </div>
    );
};

export default CodeEditor;