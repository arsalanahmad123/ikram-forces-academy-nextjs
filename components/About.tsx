import Vector from './Vector';
import ServiceCard from './ServiceCard';

import { GraduationCap, Book, Compass, Laptop } from 'lucide-react';

export default function About() {
    return (
        <div
            id="about"
            className="relative inset-0 flex flex-col justify-center items-center py-20"
        >
            <div
                aria-hidden="true"
                className="absolute inset-x-0 top-1/3 -right-2/4 -z-10 transform-gpu overflow-hidden blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(66% 12%, 91% 33%, 82% 56%, 71% 78%, 50% 100%, 30% 80%, 10% 60%, 20% 40%, 33% 20%, 50% 0%, 70% 10%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[90deg] bg-gradient-to-tl from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div className="container grid grid-cols-1 lg:grid-cols-2  relative py-20 gap-10">
                <div className="absolute top-0 lg:left-52 left-5 xl:left-10">
                    <Vector color="#0F172A" />
                </div>

                <h3 className="xl:text-6xl font-bold  md:text-5xl text-4xl text-primary">
                    Shaping Future Leaders with Precision and Passion
                </h3>

                <div className="flex flex-col gap-5">
                    <p className="lg:text-xl text-lg font-light lg:max-w-[600px]">
                        At{' '}
                        <span className="font-medium">
                            Ikram Forces Academy
                        </span>
                        , we&apos;re here to help students grow. With our focused
                        coaching, we guide them to build confidence, stay
                        disciplined, and get strong in their studies.
                    </p>

                    <p className="lg:text-xl text-lg font-light lg:max-w-[600px]">
                        Our coaching programs are specially designed for cadet
                        college preparation and more. We help students get ready
                        for real challenges — in exams and in life.
                    </p>
                </div>
            </div>

            <div className="container grid xl:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-5 mt-10">
                <ServiceCard
                    icon={<GraduationCap size={40} />}
                    title="Cadets Coaching"
                    content="Our tailored cadet coaching programs are designed to hone each student's unique abilities, ensuring they excel in both academics and physical training, setting a strong foundation for their future."
                />

                <ServiceCard
                    icon={<Book size={40} />}
                    title="Academic Tuition"
                    content="We provide extensive tuition services starting from class 7th across all major subjects, focusing on building a deep understanding and mastery of each topic to ensure students achieve their highest academic potential."
                />

                <ServiceCard
                    icon={<Compass size={40} />}
                    title="Career Guidance"
                    content="Our career guidance services are designed to help students and their families navigate the complex world of education and career choices, offering insights that lead to informed and confident decisions."
                />

                <ServiceCard
                    icon={<Laptop size={40} />}
                    title="Kids Coding"
                    content="We introduce young minds to the world of programming, fostering creativity and problem-solving skills from an early age with engaging and interactive sessions tailored for kids."
                />
            </div>
        </div>
    );
}
