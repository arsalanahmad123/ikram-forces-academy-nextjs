'use client';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Paper {
    _id: string;
    title: string;
    time: number;
    active: boolean;
}

export default function Dashboard() {
    const [activePapers, setActivePapers] = useState<Paper[] | null>(null);

    useEffect(() => {
        const getActivePapers = async () => {
            try {
                const res = await fetch(`/api/get-active-papers`, {
                    headers: {
                        'Cache-Control': 'no-store',
                    },
                });
                if (res.ok) {
                    const data = await res.json();
                    setActivePapers(data);
                }
            } catch (error) {
                console.log(error);
                toast.error('Error getting active papers');
            }
        };
        getActivePapers();
    }, []);

    return (
        <div className="min-h-screen relative inset-0 flex flex-col mt-60 container">
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
            <h1 className="text-4xl font-bold">Active Papers</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
                {activePapers?.map((paper) => (
                    <ActivePaperCard key={paper._id} paper={paper} />
                ))}
                {activePapers === null && <Loader />}
            </div>
        </div>
    );
}

const ActivePaperCard = ({
    paper,
}: {
    paper: Paper & { alreadySubmitted?: boolean };
}) => {
    const router = useRouter();

    const handleStartPaper = () => {
        // Open solve paper in new tab
        const newTab = window.open(
            `/dashboard/solve-paper/${paper._id}`,
            '_blank'
        );

        // Check if the new tab was successfully opened
        if (newTab) {
            // Optional: Focus on the new tab
            newTab.focus();

            // Redirect current tab to home page
            router.push('/');
        } else {
            // Handle case where popup was blocked
            toast.error('Please allow popups to start the paper in a new tab');
        }
    };

    return (
        <div
            key={paper._id}
            className="bg-white dark:bg-gray-900/40 rounded-lg shadow-md p-6 flex flex-col justify-between"
        >
            <div>
                <h2 className="text-xl font-semibold mb-4 text-theme1">
                    {paper.title}
                </h2>
                <p className="text-gray-500 mb-6 dark:text-white">
                    Time: {paper.time} minutes
                </p>
            </div>
            {!paper.alreadySubmitted && (
                <Button onClick={handleStartPaper}>Start Paper</Button>
            )}
            {paper.alreadySubmitted && (
                <p className="text-sm text-green-600 font-semibold">
                    ✅ Already submitted today
                </p>
            )}
        </div>
    );
};
