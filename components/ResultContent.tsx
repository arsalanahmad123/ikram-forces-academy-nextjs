'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { toast } from 'sonner';
import Loader from '@/components/Loader';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

interface BubbleProps {
    size: string;
    initialX: string;
    duration: number;
    image: string;
}

const Bubble = ({ size, initialX, duration, image }: BubbleProps) => (
    <motion.div
        className="absolute "
        style={{ width: size, height: size }}
        initial={{ y: '-20vh', x: initialX }}
        animate={{ y: '100vh' }}
        transition={{
            duration,
            ease: 'linear',
            repeat: Infinity,
            repeatType: 'loop',
        }}
    >
        <Image
            src={`/${image}`}
            alt="Falling element"
            layout="fill"
            objectFit="cover"
        />
    </motion.div>
);

export function ResultContent({ id }: { id: string }) {
    const [bubbles, setBubbles] = useState<BubbleProps[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [totalScore, setTotalScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();

    useEffect(() => {
        const generateRandomSize = () => `${Math.random() * 100 + 50}px`;
        const generateRandomX = () => `${Math.random() * 80 + 10}vw`;
        const generateRandomDuration = () => Math.random() * 8 + 6;

        const numBubbles = 10;
        const newBubbles = Array.from({ length: numBubbles }, () => ({
            size: generateRandomSize(),
            initialX: generateRandomX(),
            duration: generateRandomDuration(),
            image: 'pass.png', // Default image, will be updated after fetching results
        }));
        setBubbles(newBubbles);

        const getResult = async () => {
            try {
                const res = await fetch('/api/get-results', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id }),
                });
                const data = await res.json();
                if (res.ok) {
                    setScore(data.score);
                    setTotalScore(data.paperId.questions.length);
                    const hasPassed =
                        data.score / data.paperId.questions.length >= 0.8;
                    setBubbles((prev) =>
                        prev.map((bubble) => ({
                            ...bubble,
                            image: hasPassed ? 'pass.png' : 'fail.png',
                        }))
                    );
                } else {
                    throw new Error(data.message || 'Failed to fetch results');
                }
            } catch (error) {
                console.error(error);
                toast.error('Error fetching results. Please try again.');
            } finally {
                setLoading(false);
            }
        };
        getResult();
    }, [id]);

    const passThreshold = 0.8;
    const hasPassed =
        score !== null &&
        totalScore !== null &&
        score / totalScore >= passThreshold;

    if (loading) {
        return <Loader />;
    }

    return (
        <>
            {bubbles.map((bubble, index) => (
                <Bubble key={index} {...bubble} />
            ))}
            <div className="flex justify-center items-center h-screen">
                <Card className="w-full max-w-md z-50">
                    <CardHeader>
                        <CardTitle
                            className={`text-4xl font-bold ${
                                hasPassed ? 'text-green-500' : 'text-red-500'
                            }`}
                        >
                            {hasPassed
                                ? 'Congratulations! 🎉'
                                : 'Better Luck Next Time 😢'}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-3xl font-semibold mb-4">
                            {score} out of {totalScore}
                        </p>
                        <p className="text-xl mb-6">
                            {hasPassed
                                ? 'You passed! You scored above 80%.'
                                : "You didn't pass. You need to score at least 80% to pass."}
                        </p>
                        <Button
                            onClick={() => router.push('/dashboard')}
                            className="w-full"
                        >
                            Back to Dashboard
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </>
    );
}
