import React, { useState } from 'react';
import apiService from '../src/services/api';
import { useNavigate } from 'react-router-dom';

const TAG_OPTIONS = [
    "Array", "Graph", "DP", "Greedy", "Hashing", "Math", "Binary Search", "Prefix Sum", "Stack", "Queue", "Linked List", "Two-Pointer", "Sliding Window", "Bit Manipulation", "Recursion", "Backtracking", "Trie", "Tree"
];
const DIFFICULTY_OPTIONS = ["Easy", "Medium", "Hard"];

const CreateQuestionPage = () => {
    const [description, setDescription] = useState("");
    const [difficulty, setDifficulty] = useState("Easy");
    const [tags, setTags] = useState([]);
    const [testcases, setTestcases] = useState([{ input: "", output: "", isVisible: true }]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(null);
    const [titletag, setTitletag] = useState("");
    const navigate = useNavigate();

    const handleTestcaseChange = (idx, field, value) => {
        setTestcases(tc => tc.map((t, i) => i === idx ? { ...t, [field]: value } : t));
    };

    const addTestcase = () => {
        setTestcases(tc => [...tc, { input: "", output: "", isVisible: false }]);
    };

    const removeTestcase = (idx) => {
        setTestcases(tc => tc.filter((_, i) => i !== idx));
    };

    const handleTagChange = (e) => {
        const value = Array.from(e.target.selectedOptions, option => option.value);
        setTags(value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(null);
        try {
            await apiService.createQuestion({
                titletag,
                description,
                difficulty,
                tags,
                testcases
            });
            setSuccess('Question created successfully!');
            setTimeout(() => navigate('/admin'), 1200);
        } catch (err) {
            setError(err.message || 'Failed to create question');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center pt-20 px-4">
            <div className="bg-gray-800 rounded-2xl p-8 border border-gray-700 w-full max-w-2xl shadow-lg">
                <h2 className="text-2xl font-bold text-emerald-400 mb-6">Create New Question</h2>
                <form onSubmit={handleSubmit} className="space-y-6">
                    {error && <div className="text-red-400 mb-2">{error}</div>}
                    {success && <div className="text-green-400 mb-2">{success}</div>}
                    <div>
                        <label className="block text-gray-300 mb-2">Question Title</label>
                        <input
                            className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-gray-100"
                            type="text"
                            value={titletag}
                            onChange={e => setTitletag(e.target.value)}
                            placeholder="Enter question title (titletag)"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-gray-300 mb-2">Question Description</label>
                        <textarea
                            className="w-full p-3 rounded bg-gray-900 border border-gray-700 text-gray-100"
                            rows={3}
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                            required
                        />
                    </div>

                    <div className="flex gap-4">
                        <div className="flex-1">
                            <label className="block text-gray-300 mb-2">Difficulty</label>
                            <select
                                className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-gray-100"
                                value={difficulty}
                                onChange={e => setDifficulty(e.target.value)}
                                required
                            >
                                {DIFFICULTY_OPTIONS.map(opt => (
                                    <option key={opt} value={opt}>{opt}</option>
                                ))}
                            </select>
                        </div>
                        <div className="flex-1">
                            <label className="block text-gray-300 mb-2">Topic Tags</label>
                            <select
                                className="w-full p-2 rounded bg-gray-900 border border-gray-700 text-gray-100"
                                multiple
                                value={tags}
                                onChange={handleTagChange}
                                required
                            >
                                {TAG_OPTIONS.map(tag => (
                                    <option key={tag} value={tag}>{tag}</option>
                                ))}
                            </select>
                            <div className="text-xs text-gray-500 mt-1">Hold Ctrl (Cmd on Mac) to select multiple</div>
                        </div>
                    </div>

                    <div>
                        <label className="block text-gray-300 mb-2">Test Cases</label>
                        {testcases.map((tc, idx) => (
                            <div key={idx} className="flex gap-2 mb-2 items-center">
                                <textarea
                                    className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 text-gray-100 resize-y"
                                    placeholder="Input (multi-line allowed)"
                                    value={tc.input}
                                    onChange={e => handleTestcaseChange(idx, 'input', e.target.value)}
                                    required
                                    rows={2}
                                />
                                <textarea
                                    className="flex-1 p-2 rounded bg-gray-900 border border-gray-700 text-gray-100 resize-y"
                                    placeholder="Output (multi-line allowed)"
                                    value={tc.output}
                                    onChange={e => handleTestcaseChange(idx, 'output', e.target.value)}
                                    required
                                    rows={2}
                                />
                                <label className="flex items-center gap-1 text-xs text-gray-400">
                                    <input
                                        type="checkbox"
                                        checked={tc.isVisible}
                                        onChange={e => handleTestcaseChange(idx, 'isVisible', e.target.checked)}
                                    />
                                    Sample
                                </label>
                                {testcases.length > 1 && (
                                    <button type="button" onClick={() => removeTestcase(idx)} className="text-red-400 px-2">✕</button>
                                )}
                            </div>
                        ))}
                        <button type="button" onClick={addTestcase} className="mt-2 px-3 py-1 bg-emerald-700 text-white rounded hover:bg-emerald-600">+ Add Test Case</button>
                    </div>

                    <button type="submit" className="w-full py-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-lg transition" disabled={loading}>{loading ? 'Submitting...' : 'Submit Question'}</button>
                </form>
            </div>
        </div>
    );
};

export default CreateQuestionPage; 