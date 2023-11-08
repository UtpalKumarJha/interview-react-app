import React, { useState } from 'react';
import axios from 'axios';
import { Button } from 'antd';
import './App.css';
import { LoadingOutlined } from '@ant-design/icons';

function App() {
    const [jobDescriptionPrompt, setJobDescriptionPrompt] = useState('');
    const [questionsPrompt, setQuestionsPrompt] = useState('');
    const [jobDescription, setJobDescription] = useState('');
    const [questions, setQuestions] = useState('');
    const [isDescriptionLoading, setIsDescriptionLoading] = useState(false);
    const [areQuestionsLoading, setAreQuestionsLoading] = useState(false);

    const handleJobDescriptionChange = (e) => {
        setJobDescriptionPrompt(e.target.value);
    };

    const handleQuestionsPromptChange = (e) => {
        setQuestionsPrompt(e.target.value);
    };

    const handleGenerateJobDescription = async () => {
        try {
            setIsDescriptionLoading(true);
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
            setIsDescriptionLoading(false);
            setQuestionsPrompt(`Based on the above job description, generate 5 multiple choice questions for potential candidates:`);
        } catch (error) {
            console.error('Error generating job description:', error);
        }
    };

    const handleGenerateQuestions = async () => {
        try {
            setAreQuestionsLoading(true);
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
            setAreQuestionsLoading(false);
        } catch (error) {
            console.error('Error generating questions:', error);
        }
    };

    return (
        <div className="container">
            <header>
                <h1 className="title">Job Description and Questions Generator</h1>
            </header>
            <main>
                <section className="generator-section">
                    <textarea
                        className="text-input"
                        placeholder="Enter job description prompt"
                        onChange={handleJobDescriptionChange}
                    />
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <Button className='generate-button' type="primary" shape="round" size='large' onClick={handleGenerateJobDescription}>Generate Job Description</Button>
                        {isDescriptionLoading && <LoadingOutlined />}
                    </div>
                </section>
                {jobDescription && (
                    <section className="result-section">
                        <h2>Job Description</h2>
                        <div className="result-text">{jobDescription}</div>
                        <textarea
                            className="text-input" 
                            placeholder="Enter questions prompt"
                            value={questionsPrompt}
                            onChange={handleQuestionsPromptChange}
                        />
                        <div style={{display: 'flex', justifyContent: 'center'}}>
                            <Button className='generate-button' type="primary" shape="round"  size='large' onClick={handleGenerateQuestions}>Generate Questions</Button>
                            {areQuestionsLoading && <LoadingOutlined />}
                        </div>
                    </section>
                )}
                {questions && (
                    <section className="result-section">
                        <h2>Questions</h2>
                        <div className="result-text">{questions}</div>
                    </section>
                )}
            </main>
        </div>
    );
}

export default App;
