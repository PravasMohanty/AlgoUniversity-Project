// Service to fetch questions from the backend API

export async function fetchQuestions() {
    try {
        const response = await fetch('http://localhost:5000/practice'); // Adjust endpoint if needed
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        return data || [];
    } catch (error) {
        console.error('Failed to fetch questions:', error);
        return [];
    }
} 