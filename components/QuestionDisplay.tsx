'use client';

import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Image from 'next/image';

interface Question {
    _id: string;
    title: string;
    options: string[];
    image?: string;
}

interface QuestionDisplayProps {
    question: Question;
    currentQuestionIndex: number;
    totalQuestions: number;
    selectedAnswer: number | null;
    onPrev: () => void;
    onNext: (selectedAnswer: number | null) => void;
    onSubmit: (selectedAnswer?: number | null) => void;
    timeLimit: number;
    isSubmitting: boolean;
}

export default function QuestionDisplay({
    question,
    currentQuestionIndex,
    totalQuestions,
    selectedAnswer,
    onPrev,
    onNext,
    onSubmit,
    timeLimit,
    isSubmitting,
}: QuestionDisplayProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(
        selectedAnswer
    );
    const [timeLeft, setTimeLeft] = useState(timeLimit * 60);
    const [hasSubmitted, setHasSubmitted] = useState(false);

    // Update selected option when selectedAnswer changes
    useEffect(() => {
        setSelectedOption(selectedAnswer);
    }, [selectedAnswer]);

    // Timer management
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    useEffect(() => {
        if (timeLeft === 0 && !isSubmitting && !hasSubmitted) {
            onSubmit(selectedOption);
            setHasSubmitted(true);
        }
    }, [timeLeft, onSubmit, selectedOption, isSubmitting, hasSubmitted]);

    const handleOptionClick = (option: number) => {
        setSelectedOption(option);
    };

    const handleNextClick = () => {
        onNext(selectedOption);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center">
            <div className="bg-white p-5 h-full flex flex-col lg:py-48 py-20 gap-3 relative dark:bg-gray-900/30">
                <div className="text-xl lg:hidden font-bold text-right mb-4 dark:bg-theme2 p-5 rounded-md bg-gray-300 w-max ml-auto">
                    Time Left: {formatTime(timeLeft)}
                </div>
                {question.image && (
                    <div>
                        <Image
                            src={question.image}
                            width={600}
                            height={600}
                            alt="Question image"
                        />
                    </div>
                )}
                <h2 className="text-4xl font-semibold italic">
                    {currentQuestionIndex + 1}.
                </h2>
                <h3 className="text-5xl font-bold uppercase">
                    {question.title}
                </h3>
            </div>
            <div className="bg-gray-200 p-5 h-screen flex flex-col gap-64 z-50 dark:bg-gray-950/20">
                <div className="text-xl hidden lg:block font-bold text-right mb-4 dark:bg-theme2 bg-gray-300 p-5 rounded-md w-max ml-auto">
                    Time Left: {formatTime(timeLeft)}
                </div>
                <div>
                    {question.options.map((option, i) => (
                        <div
                            key={i}
                            className={`p-3 mb-2 border cursor-pointer rounded-sm ${
                                selectedOption === i
                                    ? 'bg-theme1'
                                    : 'bg-white dark:bg-gray-900/40'
                            }`}
                            onClick={() => handleOptionClick(i)}
                        >
                            {option}
                        </div>
                    ))}
                    <div className="flex justify-between mt-5 w-full">
                        {currentQuestionIndex > 0 && (
                            <Button variant="secondary" onClick={onPrev}>
                                Previous
                            </Button>
                        )}
                        {currentQuestionIndex < totalQuestions - 1 ? (
                            <Button
                                className="ml-auto"
                                onClick={handleNextClick}
                            >
                                Next
                            </Button>
                        ) : (
                            <Button
                                className="ml-auto bg-theme1"
                                onClick={() => onSubmit(selectedOption)}
                                disabled={isSubmitting}
                            >
                                {isSubmitting
                                    ? 'Submitting...'
                                    : 'Submit Paper'}
                            </Button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
