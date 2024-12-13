import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ReactNode } from 'react';

interface ServiceCardProps {
  icon: ReactNode;
  title: string;
  content: string;
}

export default function ServiceCard({
  icon,
  title,
  content,
}: ServiceCardProps) {
  return (
    <Card className="bg-white/45 border-none backdrop-blur-lg shadow-none hover:shadow-md transition-all duration-200 dark:bg-gray-950/20 dark:hover:bg-gray-950/30 dark:hover:shadow-xl">
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
