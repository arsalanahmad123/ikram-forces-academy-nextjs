'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import {
    CheckCircle,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
} from 'lucide-react';

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
    userAnswers: { [questionId: string]: number };
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
    userAnswers,
}: QuestionDisplayProps) {
    const [selectedOption, setSelectedOption] = useState<number | null>(
        selectedAnswer
    );
    const [timeLeft, setTimeLeft] = useState(timeLimit * 60);

    useEffect(() => {
        if (userAnswers[question._id] !== undefined) {
            setSelectedOption(userAnswers[question._id]);
        } else {
            setSelectedOption(selectedAnswer);
        }
    }, [selectedAnswer, question._id, userAnswers]);

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

    useEffect(() => {
        if (timeLeft === 0 && !isSubmitting) {
            onSubmit(selectedOption);
        }
    }, [timeLeft, onSubmit, selectedOption, isSubmitting]);

    const handleOptionClick = (option: number) => setSelectedOption(option);

    const handleNextClick = () => {
        onNext(selectedOption);
        setSelectedOption(null);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4 md:p-8 flex flex-col justify-center items-center">
            <Card className="w-full max-w-4xl bg-white/90 backdrop-blur-sm shadow-xl rounded-xl overflow-hidden">
                <CardContent className="p-6 md:p-8">
                    <div className="flex justify-between items-center mb-6">
                        <div className="text-2xl font-bold text-indigo-700">
                            Question {currentQuestionIndex + 1} of{' '}
                            {totalQuestions}
                        </div>
                        <div className="text-xl font-semibold text-indigo-600">
                            Time Left: {formatTime(timeLeft)}
                        </div>
                    </div>

                    <Progress
                        value={
                            ((currentQuestionIndex + 1) / totalQuestions) * 100
                        }
                        className="mb-6 h-2 bg-indigo-100"
                    />

                    {question.image && (
                        <div className="mb-6 rounded-lg overflow-hidden">
                            <Image
                                src={question.image}
                                width={800}
                                height={400}
                                alt="Question Image"
                                className="w-full h-auto object-cover"
                            />
                        </div>
                    )}

                    <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-6">
                        {question.title}
                    </h3>

                    <div className="space-y-4">
                        {question.options.map((option, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <Button
                                    variant={
                                        selectedOption === i
                                            ? 'default'
                                            : 'outline'
                                    }
                                    className={`w-full justify-start text-left p-4 ${
                                        selectedOption === i
                                            ? 'bg-indigo-600 text-white'
                                            : 'hover:bg-indigo-50'
                                    }`}
                                    onClick={() => handleOptionClick(i)}
                                >
                                    <span className="mr-4">
                                        {String.fromCharCode(65 + i)}.
                                    </span>
                                    {option}
                                    {selectedOption === i && (
                                        <CheckCircle className="ml-auto h-5 w-5" />
                                    )}
                                </Button>
                            </motion.div>
                        ))}
                    </div>

                    <div className="flex justify-between mt-8">
                        <Button
                            variant="outline"
                            onClick={onPrev}
                            disabled={currentQuestionIndex === 0}
                            className="flex items-center"
                        >
                            <ChevronLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        <Button
                            onClick={
                                currentQuestionIndex < totalQuestions - 1
                                    ? handleNextClick
                                    : () => onSubmit(selectedOption)
                            }
                            disabled={isSubmitting}
                            className="flex items-center"
                        >
                            {currentQuestionIndex < totalQuestions - 1 ? (
                                <>
                                    Next{' '}
                                    <ChevronRight className="ml-2 h-4 w-4" />
                                </>
                            ) : isSubmitting ? (
                                <>
                                    Submitting...{' '}
                                    <AlertCircle className="ml-2 h-4 w-4 animate-pulse" />
                                </>
                            ) : (
                                <>
                                    Submit Paper{' '}
                                    <CheckCircle className="ml-2 h-4 w-4" />
                                </>
                            )}
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
