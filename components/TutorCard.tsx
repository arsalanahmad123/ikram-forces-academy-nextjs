import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';

interface TutorCardProps {
  icon: ReactNode;
  title: string;
  content: string;
}

export default function TutorCard({ icon, title, content }: TutorCardProps) {
  return (
    <Card className="bg-theme1/10 border-none backdrop-blur-lg shadow-lg hover:shadow-xl transition-all duration-200 dark:bg-gray-900/70 dark:hover:bg-gray-900/80 dark:hover:shadow-xl">
      <CardHeader>
        <CardTitle className="text-theme1 mb-3">{icon}</CardTitle>

        <CardDescription className="text-primary font-semibold text-2xl">
          {title}
        </CardDescription>
      </CardHeader>

      <CardContent className="">
        <p>{content}</p>
      </CardContent>
    </Card>
  );
}
