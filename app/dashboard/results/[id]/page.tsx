import { Suspense } from 'react';
import { ResultContent } from '@/components/ResultContent';
import Loader from '@/components/Loader';

export default function ResultPage({ params }: { params: { id: string } }) {
    return (
        <div className="relative overflow-hidden h-screen dark:bg-gray-900 w-full">
            <Suspense fallback={<Loader />}>
                <ResultContent id={params.id} />
            </Suspense>
        </div>
    );
}
