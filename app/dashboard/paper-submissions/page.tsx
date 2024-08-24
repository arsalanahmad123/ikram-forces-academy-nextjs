// Importing necessary table components from ShadCN
import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Paper } from '@/models/models';

// Define the types
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
    paperId: Paper;
};

export default async function Page() {
    // Fetch data from the API endpoint
    const res = await fetch('http://localhost:3000/api/get-all-submissions');

    // Handle the case where fetching data fails
    if (!res.ok) {
        throw new Error('Failed to fetch submissions');
    }

    // Parse the response data
    const data = await res.json();
    return (
        <div className="h-screen flex flex-col justify-start mt-52 items-center">
            <div className="container">
                <h3 className="mb-10 text-4xl font-bold">Today Result</h3>
                <Table className="w-full ">
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
                                    {submission.paperId.title}
                                </TableCell>
                                <TableCell>{submission.score}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
