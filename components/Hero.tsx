import Image from 'next/image';
import { Check } from 'lucide-react';
import { buttonVariants } from './ui/button';
import { cn } from '@/lib/utils';
import Vector from './Vector';

export default function Hero() {
    return (
        <div
            id="home"
            className="min-h-screen relative inset-0 flex justify-center items-center overflow-x-hidden bg-themeBG dark:bg-transparent"
        >
            <div
                aria-hidden="true"
                className="absolute dark:block hidden inset-x-0 top-0 -right-96 -z-10 transform-gpu overflow-hidden blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                    }}
                    className="relative left-[calc(80%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div className="relative w-full xl:px-20 lg:py-10 grid grid-cols-1 lg:grid-cols-2 mt-52 gap-10">
                {/* Vector SVG positioned on the side */}
                <div className="absolute xl:top-0 xl:left-20 lg:-top-1 md:left-32 lg:-left-32 -top-10 left-5">
                    <Vector color="#20AD96" />
                </div>

                {/* Text and button container */}
                <div className="flex flex-col gap-10 lg:px-10 px-3 container xl:pt-20">
                    <p className="font-semibold text-lg md:text-base text-theme1 bg-white/30 backdrop-blur-3xl rounded-md p-1.5 max-w-md dark:bg-white/10 dark:text-white">
                        Ikram Forces Academy - Expert Coaching & Mentorship
                    </p>

                    <h1 className="font-extrabold xl:text-7xl lg:text-6xl md:text-5xl text-4xl tracking-wide text-primary dark:text-white">
                        Build Your Child&rsquo;s Future with{' '}
                        <span className="inline-block bg-gradient-to-r from-teal-200 to-teal-800 text-white py-1 rounded-lg shadow-md dark:from-teal-200 dark:to-purple-400 text-transparent bg-clip-text font-extrabold uppercase">
                            Ikram Forces Academy
                        </span>
                    </h1>

                    <p className="font-medium text-lg md:text-base max-w-lg">
                        At Ikram Forces Academy, we help students prepare for
                        army, navy, and air force exams through focused coaching
                        and personal attention. Give your child the best chance
                        at success with our trusted learning programs.
                    </p>

                    <a href='#about' className={cn(buttonVariants({variant: 'default'}), 'md:w-[30%] w-[40%]')}>
                        Learn More
                    </a>
                </div>

                <div className="flex justify-end items-center relative xl:mt-0">
                    <Image
                        src="/hero-banner.png"
                        alt="Hero Banner"
                        fill
                        style={{ objectFit: 'contain' }}
                    />

                    {/* Text badges */}
                    <span className="absolute xl:top-0 xl:right-0 lg:top-1/2 lg:-right-16 md:top-1/4 md:right-10 bg-white shadow-md rounded-md backdrop-blur-md md:p-5 justify-center items-center gap-2 font-bold md:text-lg dark:bg-slate-950/20 dark:backdrop-blur-lg hidden md:flex">
                        <Check className="text-theme1 " />
                        Achieve Success
                    </span>

                    <span className="absolute xl:top-0 xl:left-5 lg:top-1/3 lg:left-10 md:top-1/4 md:left-10 bg-white shadow-md rounded-md backdrop-blur-md md:p-5 justify-center items-center gap-2 font-bold md:text-lg dark:bg-slate-950/20 dark:backdrop-blur-lg hidden md:flex">
                        <Check className="text-theme1 " />
                        Expert Guidance
                    </span>

                    {/* Decorative SVG */}
                    <svg
                        viewBox="0 0 200 200"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fill={`#20AD96`}
                            d="M40.4,-64.5C51.8,-55.6,59.9,-43.4,67.6,-29.9C75.3,-16.4,82.5,-1.8,80.5,11.6C78.6,24.9,67.5,36.9,56.6,48.4C45.7,59.9,34.9,70.9,22.3,73.4C9.8,75.9,-4.4,69.8,-17.8,64.2C-31.2,58.7,-43.7,53.7,-50.9,44.6C-58.2,35.4,-60.2,22.2,-65.1,7.5C-70.1,-7.1,-78,-23.2,-74.3,-35.1C-70.7,-47.1,-55.6,-55,-41.3,-62.6C-27,-70.1,-13.5,-77.3,0.5,-78.1C14.5,-78.9,29.1,-73.4,40.4,-64.5Z"
                            transform="translate(100 100)"
                        />
                    </svg>
                </div>
            </div>
        </div>
    );
}
