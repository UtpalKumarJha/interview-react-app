import React, { useState } from 'react';
import axios from 'axios';

function App() {
    const [jobDescriptionPrompt, setJobDescriptionPrompt] = useState('');
    const [questionsPrompt, setQuestionsPrompt] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [questions, setQuestions] = useState('');

    const handleJobDescriptionChange = (e) => {
        setJobDescriptionPrompt(e.target.value);
    };

    const handleQuestionsPromptChange = (e) => {
        setQuestionsPrompt(e.target.value);
    };

    const handleGenerateJobDescription = async () => {
        try {
            const response = await axios.post(
                'https://interview-questions-ad3cff6d86c0.herokuapp.com/generate/jobDescriptionPrompt',
                { prompt: jobDescriptionPrompt },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    timeout: 300000, 
                }
            );
            setJobDescription(response.data[0]);
            setQuestionsPrompt(`Based on the above job description, generate 5 multiple choice questions for potential candidates:`);
        } catch (error) {
            console.error('Error generating job description:', error);
        }
    };

    const handleGenerateQuestions = async () => {
        try {
            const response = await axios.post(
                'https://interview-questions-ad3cff6d86c0.herokuapp.com/generate/questionPrompt',
                { prompt: questionsPrompt },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        setQuestions(response.data[0]);
        } catch (error) {
            console.error('Error generating questions:', error);
        }
    };

    return (
        <div>
            <h1>Job Description and Questions Generator</h1>
            <div>
                <textarea
                    value={jobDescriptionPrompt}
                    onChange={handleJobDescriptionChange}
                    placeholder="Enter job description prompt"
                />
                <button onClick={handleGenerateJobDescription}>Generate Job Description</button>
            </div>
            {jobDescription && (
                <div>
                    <h2>Job Description</h2>
                    <pre>{jobDescription}</pre> {/* Using pre tag to preserve whitespace and line breaks */}
                    <textarea
                        value={questionsPrompt}
                        onChange={handleQuestionsPromptChange}
                    />
                    <button onClick={handleGenerateQuestions}>Generate Questions</button>
                </div>
            )}
            {questions && (
                <div>
                    <h2>Questions</h2>
                    <pre>{questions}</pre> {/* Using pre tag to preserve whitespace and line breaks */}
                </div>
            )}
        </div>
    );
}

export default App;
