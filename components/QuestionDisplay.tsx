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

    // Update selected option when selectedAnswer changes
    useEffect(() => {
        setSelectedOption(selectedAnswer);
    }, [selectedAnswer]);

    // Timer management
    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) return prevTime - 1;
                clearInterval(timer);
                return 0;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    // Auto-submit if time runs out
    useEffect(() => {
        if (timeLeft === 0 && !isSubmitting) {
            onSubmit(selectedOption);
        }
    }, [timeLeft, onSubmit, selectedOption, isSubmitting]);

    const handleOptionClick = (option: number) => setSelectedOption(option);

    const handleNextClick = () => {
        console.log(selectedOption);
        onNext(selectedOption);
        setSelectedOption(null);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 h-[100lvh] items-center">
            <div className="bg-white p-5 h-full flex flex-col  py-20 gap-3">
                <div className="text-xl font-bold text-right mb-4">
                    Time Left: {formatTime(timeLeft)}
                </div>
                {question.image && (
                    <Image
                        src={question.image}
                        width={600}
                        height={600}
                        alt="Question"
                    />
                )}
                <h2 className="text-4xl font-semibold italic">
                    {currentQuestionIndex + 1}.
                </h2>
                <h3 className="lg:text-5xl text-3xl font-bold">
                    {question.title}
                </h3>
            </div>
            <div className="bg-gray-200 px-5 lg:py-40 py-10 h-[100lvh] flex flex-col gap-4">
                {question.options.map((option, i) => (
                    <div
                        key={i}
                        className={`p-3 mb-2 border cursor-pointer rounded-sm ${
                            selectedOption === i ? 'bg-theme1' : 'bg-white'
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
                    <Button
                        className="ml-auto"
                        onClick={
                            currentQuestionIndex < totalQuestions - 1
                                ? handleNextClick
                                : () => onSubmit(selectedOption)
                        }
                        disabled={isSubmitting}
                    >
                        {currentQuestionIndex < totalQuestions - 1
                            ? 'Next'
                            : isSubmitting
                            ? 'Submitting...'
                            : 'Submit Paper'}
                    </Button>
                </div>
            </div>
        </div>
    );
}
