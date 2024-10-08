'use client';

import { useState, useEffect } from 'react';

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';

type Question = {
    _id: string;
    title: string;
};

type Paper = {
    _id: string;
    title: string;
    questions: Question[];
};

type Submission = {
    _id: string;
    score: number;
    username: string;
    paper: Paper; // Rename paperId to paper
};

export default function Page() {
    const [data, setData] = useState<Submission[]>([]); // Initialize as empty array

    useEffect(() => {
        const baseURL =
            process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
        async function getData() {
            try {
                const res = await fetch(`${baseURL}/api/get-all-submissions`, {
                    headers: {
                        'Cache-Control': 'no-store',
                    },
                });

                if (!res.ok) {
                    throw new Error('Failed to fetch submissions');
                }

                const submissions = await res.json();
                setData(submissions);
            } catch (error) {
                console.error('Error fetching submissions:', error);
            }
        }
        getData();
    }, []);

    return (
        <div className="h-screen flex flex-col justify-start mt-52 items-center">
            <div className="container">
                <h3 className="mb-10 text-4xl font-bold">Today Result</h3>
                {data.length === 0 ? (
                    <p>No submissions available.</p>
                ) : (
                    <Table className="w-full">
                        <TableHeader>
                            <TableRow>
                                <TableHead>Username</TableHead>
                                <TableHead>Paper</TableHead>
                                <TableHead>Score</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((submission: Submission) => (
                                <TableRow key={submission._id}>
                                    <TableCell>{submission.username}</TableCell>
                                    <TableCell>
                                        {submission.paper.title}
                                    </TableCell>
                                    <TableCell>{submission.score}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}
            </div>
        </div>
    );
}
