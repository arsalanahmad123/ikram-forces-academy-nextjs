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
  selectedAnswer: string;
  onPrev: () => void;
  onNext: (selectedAnswer: string) => void;
  onSubmit: () => void;
  timeLimit: number;
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
}: QuestionDisplayProps) {
  const [selectedOption, setSelectedOption] = useState<string | null>(
    selectedAnswer
  );
  const [timeLeft, setTimeLeft] = useState(timeLimit * 60);

  useEffect(() => {
    setSelectedOption(selectedAnswer);
  }, [selectedAnswer]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    return () => clearInterval(timer); // Clean up the interval on component unmount
  }, []);

  useEffect(() => {
    if (timeLeft === 0) {
      onSubmit();
    }
  }, [timeLeft, onSubmit]);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
  };

  const handleNextClick = () => {
    if (selectedOption) {
      onNext(selectedOption);
      setSelectedOption(null);
    } else {
      onNext('');
      setSelectedOption(null);
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen items-center">
      <div className="bg-white p-5 h-full flex flex-col py-48 gap-3 relative dark:bg-gray-900/30">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 top-0 -right-96 z-10  transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
            }}
            className="relative left-[calc(80%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
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
        <h3 className="text-5xl font-bold uppercase">{question.title}</h3>
      </div>
      <div className="bg-gray-200 p-5 h-screen flex flex-col gap-64 z-50 dark:bg-gray-950/20">
        <div className="text-xl font-bold text-right mb-4 bg-theme2 p-5 rounded-md">
          Time Left: {formatTime(timeLeft)}
        </div>
        <div>
          {question.options.map((option) => (
            <div
              key={option}
              className={`p-3 mb-2 border cursor-pointer rounded-sm ${
                selectedOption === option
                  ? 'bg-theme1'
                  : 'bg-white dark:bg-gray-900/40'
              }`}
              onClick={() => handleOptionClick(option)}
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
              <Button className="ml-auto" onClick={handleNextClick}>
                Next
              </Button>
            ) : (
              <Button className="ml-auto bg-theme1" onClick={onSubmit}>
                Submit Paper
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
