'use client';
import React from 'react';
import Loader from '@/components/Loader';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import withRole from '@/components/withRole';
import { toast } from 'react-hot-toast';
import { Delete, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Image from 'next/image';

interface Question {
  _id: string;
  title: string;
  options: string[];
  image?: string;
  correctAnswer: number;
}

interface Paper {
  _id: string;
  title: string;
  description: string;
  questions: Question[];
}


function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const [paper, setPaper] = useState<Paper | null>(null);
  const [questions, setQuestions] = useState<Question[] | null>(null);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/papers/${id}`);
        if (!response.ok) throw new Error('Failed to fetch paper');
        const paperData = await response.json();
        setPaper(paperData);
        setQuestions(paperData.questions);
      } catch (error: any) {
        setError(error.message);
      }
    };

    fetchData();
  }, [id]);

  if (error) {
    return (
      <div className="flex justify-center items-center mt-60">
        <p>Error loading paper: {error}</p>
      </div>
    );
  }

  return (
    <>
      {paper ? (
        <div className="flex flex-col max-h-screen overflow-y-auto">
          <PaperTable
            setQuestions={setQuestions}
            paper={paper}
            questions={questions || []}
          />
        </div>
      ) : (
        <div className="flex justify-center items-center h-screen">
          <Loader />
        </div>
      )}
    </>
  );
}

function PaperTable({
  paper,
  setQuestions,
  questions,
}: {
  paper: Paper;
  setQuestions: React.Dispatch<React.SetStateAction<Question[] | null>>;
  questions: Question[];
}) {
  const router = useRouter();
  return (
    <div className="flex flex-col mt-52 container">
      <ArrowLeft
        size={40}
        className="mb-16  cursor-pointer bg-theme1 text-white p-2 rounded-md"
        onClick={() => router.back()}
      />
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-4xl font-bold">{paper.title}</h2>
        <AddQuestionDialog setQuestions={setQuestions} paperId={paper._id} />
      </div>
      {questions.length === 0 ? (
        <span className="text-xl font-semibold">No Questions</span>
      ) : (
        <QuestionsTable
          setQuestions={setQuestions}
          questions={questions}
          paperId={paper._id}
        />
      )}
    </div>
  );
}

function AddQuestionDialog({
  paperId,
  setQuestions,
}: {
  paperId: string;
  setQuestions: React.Dispatch<React.SetStateAction<Question[] | null>>;
}) {
  const [title, setTitle] = useState('');
  const [option1, setOption1] = useState('');
  const [option2, setOption2] = useState('');
  const [option3, setOption3] = useState('');
  const [option4, setOption4] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState<number | ''>('');
  const [image, setImage] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = async () => {
    setIsSubmitting(true);
    if (
      title === '' ||
      option1 === '' ||
      option2 === '' ||
      option3 === '' ||
      option4 === '' ||
      correctAnswer === ''
    ) {
        setIsSubmitting(false)
      toast.error('All fields are required!!');
      return;
    }

    const data = new FormData();
    data.append('title', title);
    data.append('options', option1);
    data.append('options', option2);
    data.append('options', option3);
    data.append('options', option4);
    data.append('correctAnswer', correctAnswer.toString());
    data.append('paperId', paperId);
    if (image) {
      data.append('image', image);
    }

    try {
      const res = await fetch('/api/questions', {
        method: 'POST',
        body: data,
      });

      if (!res.ok) {
        setIsSubmitting(false);
        throw new Error('Failed to submit question');
      }

      const newQuestion: Question = await res.json(); 

      toast.success('Question added successfully!');
      setTitle('');
      setOption1('');
      setOption2('');
      setOption3('');
      setOption4('');
      setCorrectAnswer('');
      setImage(null);

      setQuestions((prevQuestions) => {
        if (prevQuestions) {
          return [...prevQuestions, newQuestion];
        }
        return [newQuestion];
      });
      setIsSubmitting(false);
    } catch (error: any) {
      toast.error(error.message);
      console.error('Error:', error.message);
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add Question</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] min-w-[60%]">
        <DialogHeader>
          <DialogTitle>Add New Question</DialogTitle>
          <DialogDescription>
            Enter the details of the question and click save.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <InputField
            id="title"
            label="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <InputField
            id="option1"
            label="Option 1"
            value={option1}
            onChange={(e) => setOption1(e.target.value)}
          />
          <InputField
            id="option2"
            label="Option 2"
            value={option2}
            onChange={(e) => setOption2(e.target.value)}
          />
          <InputField
            id="option3"
            label="Option 3"
            value={option3}
            onChange={(e) => setOption3(e.target.value)}
          />
          <InputField
            id="option4"
            label="Option 4"
            value={option4}
            onChange={(e) => setOption4(e.target.value)}
          />
          <InputField
            id="correctAnswer"
            label="Correct Answer (Number)"
            value={correctAnswer}
            type="number"
            onChange={(e) => setCorrectAnswer(Number(e.target.value))}
          />
          <Input
            id="image"
            type="file"
            onChange={(e) =>
              setImage(e.target.files ? e.target.files[0] : null)
            }
          />
        </div>
        <DialogFooter>
          <Button type="submit" onClick={handleSubmit}>
            {isSubmitting ? 'submitting...' : 'Add'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Reusable input field component
function InputField({
  id,
  label,
  value,
  onChange,
  type = 'text',
}: {
  id: string;
  label: string;
  value: string | number;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: string;
}) {
  return (
    <div className="grid grid-cols-4 items-center gap-4">
      <Label htmlFor={id} className="text-right">
        {label}
      </Label>
      <Input
        id={id}
        value={value}
        onChange={onChange}
        type={type}
        className="col-span-3"
      />
    </div>
  );
}

function QuestionsTable({
  questions,
  paperId,
  setQuestions,
}: {
  questions: Question[];
  paperId: string;
  setQuestions: React.Dispatch<React.SetStateAction<Question[] | null>>;
}) {
    


  const deleteQuestion = async (id: string) => {
  try {
    const res = await fetch('/api/questions', {
      method: 'DELETE',
      body: JSON.stringify({ paperId: paperId, questionId: id }),
    });

    if (res.ok) {
      toast.success('Question deleted');
      setQuestions((prevQuestions) => {
        if (!prevQuestions) {
          return null;
        }
        return prevQuestions.filter((question) => question._id !== id);
      });
    } else {
      throw new Error('Failed to delete question. Please try again.');
    }
  } catch (error: any) {
    toast.error('Error deleting question. Please try again.');
    console.log(error.message);
  }
};



  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Image</TableHead>
          <TableHead>Question</TableHead>
          <TableHead>Option 1</TableHead>
          <TableHead>Option 2</TableHead>
          <TableHead>Option 3</TableHead>
          <TableHead>Option 4</TableHead>
          <TableHead>Correct Option</TableHead>
          <TableHead>Action</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {questions.map((question) => (
          <TableRow key={question._id}>
            <TableCell>
              {question.image ? (
                <Image
                  src={question.image}
                  width={100}
                  height={100}
                  alt="question image"
                  className="rounded-md"
                />
              ) : (
                'No image'
              )}
            </TableCell>
            <TableCell className="font-medium">{question.title}</TableCell>
            {question.options.map((option, index) => (
              <TableCell className="font-medium" key={index}>
                {option}
              </TableCell>
            ))}
            <TableCell>
              {question.correctAnswer + 1} {/* Adjust for zero-based index */}
            </TableCell>
            <TableCell className="text-red-500 cursor-pointer">
              <Dialog>
                <DialogTrigger asChild>
                  <Delete />
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Are you sure you want to Delete?</DialogTitle>
                    <DialogDescription>{question.title}</DialogDescription>
                  </DialogHeader>
                  <div className="grid grid-cols-2 gap-5 mt-3">
                    <DialogClose asChild>
                      <Button>No</Button>
                    </DialogClose>
                    <DialogClose asChild>
                      <Button
                        onClick={() => deleteQuestion(question._id)}
                        variant={'destructive'}
                      >
                        Yes
                      </Button>
                    </DialogClose>
                  </div>
                </DialogContent>
              </Dialog>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default withRole(Page, 'admin');
