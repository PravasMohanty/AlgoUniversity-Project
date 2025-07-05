import React, { useState } from 'react';
import Editor from '@monaco-editor/react';

const LANGUAGES = [
    { label: 'C++', value: 'cpp' },
    { label: 'Python', value: 'py' },
    { label: 'Java', value: 'java' },
];

const CodeEditor = ({ question }) => {
    const [code, setCode] = useState('');
    const [language, setLanguage] = useState('cpp');
    const [output, setOutput] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // TODO: Integrate with backend
        setOutput('Code submitted! (Backend integration pending)');
    };

    const handleRunCode = () => {
        // TODO: Integrate with backend for code execution
        setOutput('Code executed! (Backend integration pending)');
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
            <form onSubmit={handleSubmit} className="space-y-4">
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
                <div>
                    <label className="block text-gray-300 mb-2">Your Code</label>
                    <Editor
                        height="45vh"
                        theme="vs-dark"
                        defaultLanguage={language}
                        onMount={handleEditorDidMount}
                        value={code}
                        onChange={handleEditorChange}
                    />
                </div>
                <div className="mt-2 bg-gray-800 rounded-lg p-2 border border-gray-700 text-gray-200 min-h-[130px]">
                    <strong>Output :</strong>
                    <pre className="whitespace-pre-wrap mt-2">{output || ''}</pre>
                </div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                    <button type="submit" className="w-full sm:w-auto pl-2 py-2 px-5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition">Submit Code</button>
                    <button type="button" onClick={handleRunCode} className="w-full sm:w-auto py-2 px-5 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-lg transition">Run Code</button>
                </div>
            </form>
        </div>
    );
};

export default CodeEditor;