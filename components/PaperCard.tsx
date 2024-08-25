'use client';
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    CardFooter,
} from '@/components/ui/card';
import { Button, buttonVariants } from './ui/button';
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from '@/components/ui/dialog';
import { Pencil } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import toast from 'react-hot-toast';

interface ServiceCardProps {
    title: string;
    content: string;
    id: string;
    time: number;
    active: boolean;
}

export default function PaperCard({
    title,
    content,
    id,
    time,
    active,
}: ServiceCardProps) {
    const router = useRouter();
    const [editTitle, setEditTitle] = useState(title);
    const [editContent, setEditContent] = useState(content);
    const [Time, setTime] = useState(time);

    async function deletePaper(id: string): Promise<void> {
        try {
            const res = await fetch(`http://localhost:3000/api/papers`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ paperId: id }),
            });

            if (res.ok) {
                router.refresh();
            } else {
                console.error('Failed to delete paper:', await res.text());
            }
        } catch (error) {
            console.error('Error during delete:', error);
        }
    }

    async function editPaper(): Promise<void> {
        try {
            const res = await fetch(`http://localhost:3000/api/papers`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    id: id,
                    title: editTitle,
                    description: editContent,
                    time: Time,
                }),
            });

            if (res.ok) {
                router.refresh();
            } else {
                console.error('Failed to edit paper:', await res.text());
            }
        } catch (error) {
            console.error('Error during edit:', error);
        }
    }

    async function changeStatus(id: string) {
        try {
            const res = await fetch('/api/change-paper-status', {
                headers: { 'Cache-Control': 'no-store' },
                method: 'PUT',
                body: JSON.stringify({ paperId: id }),
            });

            if (!res.ok) {
                console.error('Failed to change status:', await res.text());
                toast.error('Error updating paper status');
                return;
            }

            router.refresh();
            toast.success('Paper status updated');
        } catch (error: any) {
            console.log(error.message);
            toast.error('Error updating paper status');
        }
    }

    return (
        <Card className="bg-white/45 border-none backdrop-blur-lg shadow-md hover:shadow-lg transition-all duration-200 dark:bg-gray-900/70 dark:hover:bg-gray-900/90 dark:hover:shadow-xl">
            <CardHeader>
                <CardTitle className="text-primary font-semibold text-2xl flex justify-between items-center">
                    <span>{title}</span>
                    <span className="text-sm">{time} minutes</span>
                </CardTitle>
            </CardHeader>

            <CardContent className="flex flex-col gap-10">
                <p>{content}</p>
                <span
                    className={`${
                        active ? 'bg-red-500' : 'bg-theme1'
                    } p-2 rounded-3xl w-[6.5rem] text-center text-sm text-white flex justify-center items-center gap-1 cursor-pointer`}
                    onClick={() => changeStatus(id)}
                >
                    <Pencil size={12} />
                    {active ? 'Deactivate' : 'Activate'}
                </span>
            </CardContent>
            <CardFooter className="flex justify-between items-center flex-wrap gap-5">
                <Link
                    href={`/dashboard/papers/${id}`}
                    className={`${buttonVariants({
                        variant: 'default',
                    })} bg-theme1`}
                >
                    View Paper
                </Link>
                <div className="flex justify-between items-center gap-5">
                    {/* Edit Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button>Edit</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>Edit Paper</DialogTitle>
                            </DialogHeader>
                            <form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    editPaper();
                                }}
                                className="grid gap-4 py-4"
                            >
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-title"
                                        className="text-right"
                                    >
                                        Title
                                    </Label>
                                    <Input
                                        id="edit-title"
                                        value={editTitle}
                                        onChange={(e) =>
                                            setEditTitle(e.target.value)
                                        }
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="edit-content"
                                        className="text-right"
                                    >
                                        Description
                                    </Label>
                                    <Input
                                        id="edit-content"
                                        value={editContent}
                                        onChange={(e) =>
                                            setEditContent(e.target.value)
                                        }
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label
                                        htmlFor="time"
                                        className="text-right"
                                    >
                                        Time
                                    </Label>
                                    <Input
                                        id="time"
                                        type="number"
                                        value={Time}
                                        onChange={(e) =>
                                            setTime(Number(e.target.value))
                                        }
                                        className="col-span-3"
                                        required
                                    />
                                </div>
                                <DialogFooter className="mt-6">
                                    <DialogClose asChild>
                                        <Button type="button">Cancel</Button>
                                    </DialogClose>
                                    <DialogClose asChild>
                                        <Button type="submit">Save</Button>
                                    </DialogClose>
                                </DialogFooter>
                            </form>
                        </DialogContent>
                    </Dialog>

                    {/* Delete Dialog */}
                    <Dialog>
                        <DialogTrigger asChild>
                            <Button variant="destructive">Delete</Button>
                        </DialogTrigger>
                        <DialogContent className="sm:max-w-[425px]">
                            <DialogHeader>
                                <DialogTitle>
                                    Are you sure you want to delete{' '}
                                    <span className="font-extrabold">
                                        {title}
                                    </span>
                                    ?
                                </DialogTitle>
                            </DialogHeader>
                            <DialogFooter className="mt-6">
                                <DialogClose asChild>
                                    <Button type="button">No</Button>
                                </DialogClose>
                                <DialogClose asChild>
                                    <Button
                                        variant={'destructive'}
                                        onClick={() => deletePaper(id)}
                                    >
                                        Yes
                                    </Button>
                                </DialogClose>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </div>
            </CardFooter>
        </Card>
    );
}
