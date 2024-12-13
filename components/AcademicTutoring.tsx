import Vector from './Vector';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import TutorCard from './TutorCard';

const qualities = [
  {
    icon: '🧑‍🏫',
    title: 'Expert Tutors',
    content:
      'Our skilled tutors bring years of experience to help students excel',
  },
  {
    icon: '💻',
    title: 'Flexible Learning',
    content:
      'Choose between online and offline classes to fit your schedule and preferences',
  },
  {
    icon: '🎯',
    title: 'Personalized Attention',
    content:
      "Receive customized support to address each student's individual learning needs",
  },
  {
    icon: '📚',
    title: 'Comprehensive Subjects',
    content:
      'Support available in all subjects from 5th grade onward, ensuring a well-rounded education',
  },
  {
    icon: '📈',
    title: 'Engaging Materials',
    content:
      'Utilize interactive and effective learning tools designed to keep students motivated and engaged',
  },
];

export default function AcademicTutoring() {
  return (
    <div
      id="tutoring"
      className="min-h-screen inset-0 flex flex-col pt-32 pb-10 gap-10"
    >
      <div className="container grid grid-cols-1 lg:grid-cols-2 gap-10 relative items-center">
        <div className="absolute xl:top-24 left-8 xl:block hidden">
          <Vector color="#0F172A" />
        </div>

        <div className="flex flex-col gap-10">
          <h3 className="xl:text-6xl font-bold  md:text-5xl max-w-5xl text-4xl text-primary mx-auto ">
            Excel in School with Expert Tuition
          </h3>

          <p className="font-medium text-primary text-lg max-w-md">
            Starting from 5th grade, we offer comprehensive tuition in all
            Transform Your Child&rsquo;s Future with Expert Guidance subjects,
            tailored to your child&rsquo;s needs. Whether it is full academic
            support or focused coaching in a specific subject, our experienced
            tutors are here to help. Available both online and in-person, we are
            dedicated to helping your child achieve their best.
          </p>

          <Link
            href={'#'}
            className={`${buttonVariants({ variant: 'default' })} font-semibold lg:w-[200px]`}
          >
            Get Consultation
          </Link>
        </div>

        <Image
          src="/tuition-center.png"
          alt="Hero Banner"
          height={700}
          width={900}
          className="dark:filter dark:brightness-75 dark:rounded-3xl dark:border-[50px] border-gray-900/70"
          style={{ objectFit: 'contain' }}
        />
      </div>

      <div className="relative container grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 py-28">
        <div
          aria-hidden="true"
          className="absolute inset-x-0 bottom-0 left-[600px] -z-10 transform-gpu overflow-hidden blur-3xl"
        >
          <div
            style={{
              clipPath:
                'polygon(50% 0%, 70% 20%, 85% 40%, 100% 70%, 80% 100%, 60% 80%, 40% 100%, 20% 80%, 0% 60%, 20% 30%, 35% 15%)',
            }}
            className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-gradient-to-r from-[#20AD96] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        {qualities.map((quality, i) => (
          <TutorCard
            key={i}
            icon={quality.icon}
            title={quality.title}
            content={quality.content}
          />
        ))}
      </div>
    </div>
  );
}
