'use client';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import ModalDialog from '@/components/ModalDialog';
import QuestionDisplay from '@/components/QuestionDisplay';
import Loader from '@/components/Loader';

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
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{
    [questionId: string]: string;
  }>({});
  const [showModal, setShowModal] = useState(true);
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
        toast.error('Something went wrong, please contact administration');
      }
    };
    getPaper();
  }, [params.id]);

  const handleAgree = () => {
    setShowModal(false);
  };

  const handleNextQuestion = (selectedAnswer: string) => {
    if (paper) {
      const currentQuestionId = paper.questions[currentQuestionIndex]._id;
      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestionId]: selectedAnswer,
      }));
      setCurrentQuestionIndex((prev) => prev + 1);
    }
  };

  const handlePrevQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  const handleSubmit = () => {
    toast.success('Paper submitted!');
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
          selectedAnswer={userAnswers[currentQuestion._id] || ''}
          onPrev={handlePrevQuestion}
          onNext={handleNextQuestion}
          onSubmit={handleSubmit}
          timeLimit={paper.time}
        />
      )}
    </div>
  );
}
