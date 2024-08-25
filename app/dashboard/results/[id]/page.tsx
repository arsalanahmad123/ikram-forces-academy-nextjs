'use client';

import Loader from '@/components/Loader';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

type ResultProps = {
    params: {
        id: string;
    };
};

const generateRandomSize = () => `${Math.random() * 100 + 50}px`;
const generateRandomX = () => `${Math.random() * 80 + 10}vw`; // Ensures it's within view but less on left
const generateRandomDuration = () => Math.random() * 8 + 6; // Duration adjusted for smoothness

interface BubbleProps {
    size: string;
    initialX: string;
    duration: number;
    image?: string;
}

const Bubble = ({ size, initialX, duration, image }: BubbleProps) => (
    <motion.div
        className="absolute z-10"
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

export default function Page({ params }: ResultProps) {
    const [bubbles, setBubbles] = useState<BubbleProps[]>([]);
    const [score, setScore] = useState<number | null>(null);
    const [totalScore, setTotalScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const numBubbles = 10;
        const newBubbles = Array.from({ length: numBubbles }, (_, i) => ({
            size: generateRandomSize(),
            initialX: generateRandomX(),
            duration: generateRandomDuration(),
        }));
        setBubbles(newBubbles);

        const getResult = async () => {
            try {
                setLoading(true);
                const res = await fetch('/api/get-results', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ id: params.id }),
                });
                const data = await res.json();
                if (res.ok) {
                    setScore(data.score);
                    const paper = data.paperId;
                    setTotalScore(paper.questions.length);
                    setLoading(false);
                }
            } catch (error) {
                console.log(error);
                toast.error('Error fetching results');
                setLoading(false);
            }
        };
        getResult();
    }, [params.id]);

    const passThreshold = 0.9;
    const hasPassed =
        score !== null &&
        totalScore !== null &&
        score / totalScore >= passThreshold;

    return (
        <div className="relative overflow-hidden h-screen dark:bg-gray-900">
            {bubbles.map((bubble, index) => (
                <Bubble
                    image={hasPassed ? 'pass.png' : 'fail.png'}
                    key={index}
                    size={bubble.size}
                    initialX={bubble.initialX}
                    duration={bubble.duration}
                />
            ))}
            <div className="flex justify-center items-center h-screen">
                {loading ? (
                    <Loader />
                ) : (
                    <div className="dark:bg-white/70 bg-theme2/50 min-w-[400px] p-10 backdrop-blur-md z-50 rounded-md flex flex-col justify-center items-center">
                        <h3
                            className={`text-6xl font-extrabold ${
                                hasPassed ? 'text-green-400' : 'text-red-400'
                            }`}
                        >
                            {hasPassed
                                ? 'Congratulations 🎇'
                                : 'Better Luck Next Time 😢'}
                        </h3>
                        <p className="text-4xl mt-5 dark:text-white mb-3">
                            {score} out of {totalScore}
                        </p>
                        <p className="text-2xl">
                            {hasPassed ? 'You Passed' : 'You Failed'}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
