// Service to fetch questions from the backend API

export async function fetchQuestions() {
    try {
        const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';
        const response = await fetch(`${API_BASE_URL}/practice`); // Uses environment variable
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Failed to fetch questions:', error);
        return [];
    }
} 