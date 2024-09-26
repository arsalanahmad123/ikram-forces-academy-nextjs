'use client';

import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ModalDialog from '@/components/ModalDialog';
import QuestionDisplay from '@/components/QuestionDisplay';
import Loader from '@/components/Loader';
import { useUser } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';
import { MenuSquareIcon, CheckCircleIcon, XCircleIcon } from 'lucide-react';
import {
    Sheet,
    SheetTrigger,
    SheetContent,
    SheetTitle,
    SheetHeader,
    SheetDescription,
} from '@/components/ui/sheet';

interface SolvePaperParams {
    params: { id: string };
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

    // Fetch the paper data
    useEffect(() => {
        const fetchPaper = async () => {
            try {
                const res = await fetch(`/api/papers/${params.id}`);
                if (!res.ok) throw new Error('Failed to fetch paper');
                const data = await res.json();
                setPaper(data);
            } catch (error) {
                console.error(error);
                toast.error(
                    'Something went wrong, please contact administration'
                );
            }
        };
        fetchPaper();
    }, [params.id]);

    // Handle navigation confirmation
    const handleBeforeNavigation = (event: PopStateEvent) => {
        event.preventDefault();
        const userConfirmed = window.confirm('Paper will be submitted now!');
        if (userConfirmed) handleSubmit();
        else window.history.pushState(null, '', window.location.href);
    };

    useEffect(() => {
        window.addEventListener('popstate', handleBeforeNavigation, {
            capture: true,
        });
        return () => {
            window.removeEventListener('popstate', handleBeforeNavigation);
        };
    }, []);

    const handleAgree = () => setShowModal(false);

    const handleNextQuestion = (selectedAnswer: number | null) => {
        if (paper) {
            const currentQuestionId = paper.questions[currentQuestionIndex]._id;
            if (selectedAnswer !== null) {
                setUserAnswers((prev) => ({
                    ...prev,
                    [currentQuestionId]: selectedAnswer,
                }));
            }
            setCurrentQuestionIndex((prev) =>
                Math.min(prev + 1, paper.questions.length - 1)
            );
        }
    };

    const handlePrevQuestion = () => {
        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
    };

    const handleSubmit = async () => {
        if (!paper) return;
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/submit-paper', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    paperId: paper._id,
                    userId: user?.id,
                    username: user?.username,
                    userAnswers,
                }),
            });

            if (!res.ok) throw new Error('Submission failed');
            const data = await res.json();
            toast.success('Paper submitted successfully!');
            router.replace(`/dashboard/results/${data}`);
        } catch (error) {
            console.error(error);
            toast.error('An error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!paper) return <Loader />;

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 relative">
            <ModalDialog open={showModal} onAgree={handleAgree} />
            {!showModal && paper.questions[currentQuestionIndex] && (
                <>
                    <Sheet>
                        <SheetTrigger>
                            <div className="absolute top-5 left-5 bg-primary p-3 rounded-md cursor-pointer">
                                <MenuSquareIcon
                                    size={30}
                                    className="text-white dark:text-slate-900"
                                />
                            </div>
                        </SheetTrigger>
                        <SheetContent side={'left'} className="overflow-y-auto">
                            <SheetHeader>
                                <SheetTitle>Question Details </SheetTitle>
                                <SheetDescription>
                                    {paper.questions.map((question, ind) => {
                                        const isAnswered =
                                            userAnswers[question._id] !==
                                            undefined;

                                        return (
                                            <div
                                                key={question._id}
                                                className={`${
                                                    currentQuestionIndex === ind
                                                        ? 'bg-gray-100'
                                                        : ''
                                                } p-2 my-1 hover:bg-gray-100 rounded-sm cursor-pointer flex justify-between items-center`}
                                                onClick={() =>
                                                    setCurrentQuestionIndex(ind)
                                                }
                                            >
                                                <span className="text-xl">
                                                    Q.{ind + 1}
                                                </span>
                                                <span className="ml-4">
                                                    {isAnswered ? (
                                                        <CheckCircleIcon
                                                            className="text-green-500"
                                                            size={20}
                                                        />
                                                    ) : (
                                                        <XCircleIcon
                                                            className="text-red-500"
                                                            size={20}
                                                        />
                                                    )}
                                                </span>
                                            </div>
                                        );
                                    })}
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <QuestionDisplay
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={paper.questions.length}
                        question={paper.questions[currentQuestionIndex]}
                        selectedAnswer={
                            userAnswers[
                                paper.questions[currentQuestionIndex]._id
                            ] || null
                        }
                        onPrev={handlePrevQuestion}
                        onNext={handleNextQuestion}
                        onSubmit={handleSubmit}
                        timeLimit={paper.time}
                        isSubmitting={isSubmitting}
                        userAnswers={userAnswers}
                    />
                </>
            )}
        </div>
    );
}
