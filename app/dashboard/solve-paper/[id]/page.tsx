'use client';

import { useEffect, useState, useCallback, useMemo, use } from 'react';
import { toast } from 'sonner';
import ModalDialog from '@/components/ModalDialog';
import QuestionDisplay from '@/components/QuestionDisplay';
import Loader from '@/components/Loader';
import { useAuth } from '@/app/contexts/AuthContext';
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
    params: Promise<{ id: string }>;
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
    const resolvedParams = use(params);
    const [paper, setPaper] = useState<Paper | null>(null);
    const { user } = useAuth();
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [userAnswers, setUserAnswers] = useState<Record<string, number>>({});
    const [showModal, setShowModal] = useState(true);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const router = useRouter();

    const fetchPaper = useCallback(async () => {
        try {
            const res = await fetch(`/api/papers/${resolvedParams.id}`);
            if (!res.ok) throw new Error('Failed to fetch paper');
            const data = await res.json();
            setPaper(data);
        } catch (error) {
            console.error(error);
            toast.error('Something went wrong, please contact administration');
        }
    }, [resolvedParams.id]);

    useEffect(() => {
        fetchPaper();
    }, [fetchPaper]);

    const handleSubmit = useCallback(async () => {
        if (!paper || isSubmitting) return;
        setIsSubmitting(true);
        try {
            const res = await fetch('/api/submit-paper', {
                headers: { 'Content-Type': 'application/json' },
                method: 'POST',
                body: JSON.stringify({
                    paperId: resolvedParams?.id,
                    userId: user?.id,
                    username: user?.name,
                    userAnswers,
                }),
            });

            if (!res.ok) throw new Error('Submission failed');
            const data = await res.json();
            toast.success('Paper submitted successfully!');
            router.replace(`/dashboard/results/${data}`);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            console.error(error);
            toast.error(error?.message);
        } finally {
            setIsSubmitting(false);
        }
    }, [paper, user, userAnswers, router, resolvedParams?.id, isSubmitting]);

    const handleBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
        event.preventDefault();
        event.returnValue = 'Are you sure you want to leave? Your answers will be submitted.';

    }, []);

    const handleVisibilityChange = useCallback(() => {
        if (document.visibilityState === 'hidden') {
            handleSubmit();
        }
    }, [handleSubmit]);

    const handlePopState = useCallback(
        (event: PopStateEvent) => {
            event.preventDefault();
            handleSubmit();
        },
        [handleSubmit]
    );

    useEffect(() => {
        window.addEventListener('beforeunload', handleBeforeUnload);
        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('popstate', handlePopState);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
            window.removeEventListener('popstate', handlePopState);
        };
    }, [handleBeforeUnload, handleVisibilityChange, handlePopState]);

    const handleAgree = useCallback(() => setShowModal(false), []);

    const handleNextQuestion = useCallback(
        (selectedAnswer: number | null) => {
            if (paper) {
                const currentQuestionId =
                    paper.questions[currentQuestionIndex]._id;
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
        },
        [paper, currentQuestionIndex]
    );

    const handlePrevQuestion = useCallback(() => {
        setCurrentQuestionIndex((prev) => Math.max(0, prev - 1));
    }, []);

    const currentQuestion = useMemo(
        () => paper?.questions[currentQuestionIndex],
        [paper, currentQuestionIndex]
    );

    const questionOverview = useMemo(
        () =>
            paper?.questions.map((question, ind) => ({
                id: question._id,
                number: ind + 1,
                isAnswered: userAnswers[question._id] !== undefined,
                isCurrent: currentQuestionIndex === ind,
            })),
        [paper, userAnswers, currentQuestionIndex]
    );

    if (!paper) return <Loader />;

    return (
        <div className="min-h-screen flex flex-col bg-gray-900 relative w-full">
            <ModalDialog open={showModal} onAgree={handleAgree} />
            {!showModal && currentQuestion && (
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
                                    {questionOverview?.map(
                                        ({
                                            id,
                                            number,
                                            isAnswered,
                                            isCurrent,
                                        }) => (
                                            <div
                                                key={id}
                                                className={`${
                                                    isCurrent
                                                        ? 'bg-gray-100'
                                                        : ''
                                                } p-2 my-1 hover:bg-gray-100 rounded-sm cursor-pointer flex justify-between items-center`}
                                                onClick={() =>
                                                    setCurrentQuestionIndex(
                                                        number - 1
                                                    )
                                                }
                                            >
                                                <span className="text-xl">
                                                    Q.{number}
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
                                        )
                                    )}
                                </SheetDescription>
                            </SheetHeader>
                        </SheetContent>
                    </Sheet>
                    <QuestionDisplay
                        currentQuestionIndex={currentQuestionIndex}
                        totalQuestions={paper.questions.length}
                        question={currentQuestion}
                        selectedAnswer={
                            userAnswers[currentQuestion._id] || null
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
