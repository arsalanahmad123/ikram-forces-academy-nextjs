'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ModalDialog from '@/components/ModalDialog';
import QuestionDisplay from '@/components/QuestionDisplay';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

interface SolvePaperParams {
    params: {
        id: string;
    };
}

type Question = {
    _id: string;
    title: string;
    options: string[];
    image?: string;
};

type Paper = {
    _id: string;
    title: string;
    time: number;
    questions: Question[];
};

export default function Page({ params }: SolvePaperParams) {
    const [paper, setPaper] = useState<Paper | null>(null);
    const { user } = useUser();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<{
        [questionId: string]: number;
    }>({});
    const [showModal, setShowModal] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const router = useRouter();

    useEffect(() => {
        const getPaper = async () => {
            try {
                const res = await fetch(`/api/papers/${params.id}`);
                if (res.ok) {
                    const data = await res.json();
                    setPaper(data);
                }
            } catch (error) {
                console.log(error);
                toast.error(
                    'Something went wrong, please contact administration'
                );
            }
        };
        getPaper();
    }, [params.id]);

    const handleAgree = () => {
        setShowModal(false);
    };

    const handleNextQuestion = (selectedAnswer: number | null) => {
        if (paper) {
            const currentQuestionId = paper.questions[currentQuestionIndex]._id;
            if (selectedAnswer !== null) {
                setUserAnswers((prev) => ({
                    ...prev,
                    [currentQuestionId]: selectedAnswer,
                }));
            }
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
    };

    const handleSubmit = async (selectedAnswer?: number | null) => {
        if (paper) {
            setIsSubmitting(true);

            const currentQuestionId = paper.questions[currentQuestionIndex]._id;

            // Update answers if an answer is provided
            if (selectedAnswer !== null) {
                setUserAnswers((prev) => ({
                    ...prev,
                    [currentQuestionId]: selectedAnswer as number,
                }));
            }

            // Wait for the state to be updated (this guarantees that the API call uses the updated state)
            const updatedAnswers =
                selectedAnswer !== null
                    ? { ...userAnswers, [currentQuestionId]: selectedAnswer }
                    : userAnswers;

            // Perform API call with updatedAnswers
            try {
                const res = await fetch('/api/submit-paper', {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    method: 'POST',
                    body: JSON.stringify({
                        paperId: paper._id,
                        userId: user?.id,
                        userAnswers: updatedAnswers,
                    }),
                });

                const data = await res.json();
                if (res.ok) {
                    toast.success('Paper submitted successfully!');
                    router.replace(`/dashboard/results/${data}`);
                } else {
                    toast.error(data.error);
                }
            } catch (error) {
                console.log(error);
                toast.error('An error occurred. Please try again later.');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    if (!paper) {
        return (
            <div className="h-screen flex justify-center items-center">
                <Loader />
            </div>
        );
    }

    const currentQuestion = paper.questions[currentQuestionIndex];

    return (
        <div className="min-h-screen relative inset-0 flex flex-col bg-gray-900">
            <ModalDialog open={showModal} onAgree={handleAgree} />
            {!showModal && currentQuestion && (
                <QuestionDisplay
                    currentQuestionIndex={currentQuestionIndex}
                    totalQuestions={paper.questions.length}
                    question={currentQuestion}
                    selectedAnswer={userAnswers[currentQuestion._id] || null}
                    onPrev={handlePrevQuestion}
                    onNext={handleNextQuestion}
                    onSubmit={handleSubmit}
                    timeLimit={paper.time}
                    isSubmitting={isSubmitting}
                />
            )}
        </div>
    );
}
