import { Suspense, use } from 'react';
import { ResultContent } from '@/components/ResultContent';
import Loader from '@/components/Loader';

interface ResultIdParams {
    params: Promise<{ id: string }>;
}

export default function ResultPage({params}: ResultIdParams) {

    const resolvedParams = use(params)

    return (
        <div className="relative overflow-hidden h-screen dark:bg-gray-900 w-full">
            <Suspense fallback={<Loader />}>
                <ResultContent id={resolvedParams.id} />
            </Suspense>
        </div>
    );
}
