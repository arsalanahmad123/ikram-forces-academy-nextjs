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
    const [submissionId, setSubmissionId] = useState<string | null>(null);
    const [hasInitialized, setHasInitialized] = useState(false);
    const router = useRouter();

    // Create submission record immediately when page loads
    const initializeSubmission = useCallback(async () => {
        if (hasInitialized || !user?.id || !resolvedParams.id) return;

        try {
            const res = await fetch('/api/initialize-submission', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    paperId: resolvedParams.id,
                    userId: user.id,
                    username: user.name,
                }),
            });

            if (!res.ok) {
                const error = await res.text();
                throw new Error(error || 'Failed to initialize submission');
            }

            const data = await res.json();
            setSubmissionId(data.submissionId);
            setHasInitialized(true);
        } catch {
            toast.error('Failed to start the paper. Please try again.');
            router.push('/dashboard');
        }
    }, [hasInitialized, user, resolvedParams.id, router]);

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

    useEffect(() => {
        if (paper && user) {
            initializeSubmission();
        }
    }, [paper, user, initializeSubmission]);

    const handleSubmit = useCallback(async () => {
    if (!submissionId || isSubmitting || !user || !paper) return;
    setIsSubmitting(true);

    try {
        const res = await fetch('/api/submit-paper', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                submissionId,
                userAnswers,
                userId: user.id,
                paperId: paper._id,
                username: user.name,
            }),
        });

        if (!res.ok) throw new Error('Failed to submit paper');

        const data = await res.json();
        toast.success('Paper submitted successfully!');
        router.replace(`/dashboard/results/${data?.resultId || submissionId}`);
    } catch (error) {
        console.error('Error submitting paper:', error);
        toast.error('Failed to submit paper');
    } finally {
        setIsSubmitting(false);
    }
}, [submissionId, userAnswers, user, paper, router, isSubmitting]);



    useEffect(() => {
        if (!submissionId) return;

        const handleVisibilityChange = () => {
            if (document.hidden) {
                console.log('[AutoSubmit] Tab switched or minimized');
                handleSubmit();
            }
        };

        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            console.log('[AutoSubmit] Page closing or refreshing');
            handleSubmit();
            // Optional: Show native browser confirmation dialog
            e.preventDefault();
            e.returnValue = '';
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            document.removeEventListener(
                'visibilitychange',
                handleVisibilityChange
            );
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [submissionId, handleSubmit]);

    

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

    if (!paper || !hasInitialized) return <Loader />;

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
