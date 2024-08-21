'use client';
import PaperCard from '@/components/PaperCard';
import { Suspense, useState, useEffect } from 'react';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import withRole from '@/components/withRole';
import { toast } from 'react-hot-toast';
import { ArrowLeft } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useRouter } from 'next/navigation';

interface Paper {
  title: string;
  description: string;
  time: number;
  _id: string;
  active: boolean;
}

const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

async function fetchPapers(): Promise<Paper[]> {
  const res = await fetch(`${baseUrl}/api/papers`, {
    headers: {
      'Content-Type': 'application/json',
    },
    // cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch papers');
  }

  return res.json();
}

async function createPaper(paperData: {
  title: string;
  description: string;
  time: number;
}): Promise<Paper[]> {
  const res = await fetch(`${baseUrl}/api/papers`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(paperData),
  });

  if (!res.ok) {
    throw new Error('Failed to add paper');
  }

  return res.json();
}

function Page() {
  const [papers, setPapers] = useState<Paper[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const loadPapers = async () => {
      try {
        const data = await fetchPapers();
        setPapers(data);
      } catch (err: any) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadPapers();
  }, []);

  const handleAddPaper = async (paperData: {
    title: string;
    description: string;
    time: number;
  }) => {
    setLoading(true);
    try {
      await createPaper(paperData);
      const updatedPapers = await fetchPapers();
      setPapers(updatedPapers);
      toast.success('Paper created!!');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="flex justify-center items-center min-h-screen bg-transparent">
        <Loader />
      </div>
    );
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="min-h-screen relative inset-0 flex flex-col mt-52 container gap-10">
      <ArrowLeft
        size={40}
        className="mb-16  cursor-pointer bg-theme1 text-white p-2 rounded-md"
        onClick={() => router.back()}
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -right-96 -z-10 transform-gpu overflow-hidden blur-3xl"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-[calc(80%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
        />
      </div>
      <div className="flex justify-between items-center">
        <h4 className="text-4xl font-bold">Papers</h4>
        {papers.length === 0 && (
          <span className="text-lg font-bold">No Papers</span>
        )}
        <Dialog>
          <DialogTrigger asChild>
            <Button>Add Paper</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] p-10">
            <DialogHeader>
              <DialogTitle className="text-3xl">Add New Paper</DialogTitle>
              <DialogDescription>
                Fill out the form below to add a new paper.
              </DialogDescription>
            </DialogHeader>
            <AddPaperForm onAddPaper={handleAddPaper} />
          </DialogContent>
        </Dialog>
      </div>
      <Suspense
        fallback={
          <div className="min-h-screen flex justify-center items-center bg-transparent">
            <Loader />
          </div>
        }
      >
        <PaperList papers={papers} />
      </Suspense>
    </div>
  );
}

function AddPaperForm({
  onAddPaper,
}: {
  onAddPaper: (paperData: {
    title: string;
    description: string;
    time: number;
  }) => Promise<void>;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [time, setTime] = useState<number | ''>('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onAddPaper({
        title,
        description,
        time: Number(time),
      });
      setTitle('');
      setDescription('');
      setTime('');
    } catch (error) {
      console.error('Failed to add paper:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="description" className="text-right">
          Description
        </Label>
        <Input
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="col-span-3"
          required
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="time" className="text-right">
          Time For Paper (minutes)
        </Label>
        <Input
          id="time"
          value={time}
          onChange={(e) => setTime(Number(e.target.value))}
          className="col-span-3"
          required
        />
      </div>
      <DialogFooter>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Paper'}
        </Button>
      </DialogFooter>
    </form>
  );
}

function PaperList({ papers }: { papers: Paper[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
      {papers?.map((paper) => (
        <PaperCard
          title={paper.title}
          id={paper._id}
          content={paper.description}
          key={paper._id}
          time={paper.time}
          active={paper.active}
        />
      ))}
    </div>
  );
}

export default withRole(Page, 'admin');
