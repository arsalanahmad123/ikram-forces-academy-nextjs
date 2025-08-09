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
    opacity: number;
}

const Bubble = ({ size, initialX, duration, image, opacity }: BubbleProps) => (
    <motion.div
        className="absolute pointer-events-none"
        style={{ width: size, height: size, opacity }}
        initial={{ y: '-20vh', x: initialX }}
        animate={{ y: '110vh' }}
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
            fill
            className="object-cover"
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
        const generateRandomSize = () => `${Math.random() * 80 + 40}px`;
        const generateRandomX = () => `${Math.random() * 90}vw`;
        const generateRandomDuration = () => Math.random() * 8 + 6;
        const generateRandomOpacity = () => Math.random() * 0.4 + 0.3;

        const numBubbles = 15;
        const newBubbles = Array.from({ length: numBubbles }, () => ({
            size: generateRandomSize(),
            initialX: generateRandomX(),
            duration: generateRandomDuration(),
            image: 'pass.png',
            opacity: generateRandomOpacity(),
        }));
        setBubbles(newBubbles);

        const getResult = async () => {
            try {
                const res = await fetch('/api/get-results', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ id }),
                });
                const data = await res.json();
                if (res.ok) {
                    setScore(data.score);
                    setTotalScore(data.paperId.questions.length);
                    const hasPassed =
                        data.score / data.paperId.questions.length >= 0.85;
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

    const passThreshold = 0.85;
    const hasPassed =
        score !== null &&
        totalScore !== null &&
        score / totalScore >= passThreshold;

    if (loading) {
        return <Loader />;
    }

    return (
        <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-blue-500 via-purple-500 to-purple-900">
            {/* Animated bubbles */}
            {bubbles.map((bubble, index) => (
                <Bubble key={index} {...bubble} />
            ))}

            {/* Card */}
            <div className="flex justify-center items-center h-full px-4 z-10 relative">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="w-full max-w-md"
                >
                    <Card className="backdrop-blur-lg bg-white/20 border border-white/30 shadow-2xl">
                        <CardHeader>
                            <CardTitle
                                className={`text-center text-3xl md:text-4xl font-bold ${
                                    hasPassed
                                        ? 'text-green-300'
                                        : 'text-red-600'
                                }`}
                            >
                                {hasPassed
                                    ? '🎉 Congratulations!'
                                    : '😢 Better Luck Next Time'}
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="text-center">
                            <p className="text-2xl md:text-3xl font-semibold mb-4 text-white">
                                {score} / {totalScore}
                            </p>
                            <p className="text-lg md:text-xl mb-6 text-white">
                                {hasPassed
                                    ? 'You passed! Scored above 85%.'
                                    : 'You need at least 85% to pass.'}
                            </p>
                            <Button
                                onClick={() => router.push('/dashboard')}
                                className="w-full font-semibold"
                            >
                                Back to Dashboard
                            </Button>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>
        </div>
    );
}
