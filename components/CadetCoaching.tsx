import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';
import CollegesCarousel from './CollegesCarousel';
import Vector from './Vector';
export default function CadetCoaching() {
    return (
        <div
            id="cadetcoaching"
            className="min-h-screen relative inset-0 flex justify-center  bg-themeBG dark:bg-transparent py-20 flex-col overflow-x-hidden gap-10"
        >
            <div
                aria-hidden="true"
                className="absolute dark:block hidden inset-x-0 bottom-0 left-96 -z-10 transform-gpu overflow-hidden blur-3xl"
            >
                <div
                    style={{
                        clipPath:
                            'polygon(50% 0%, 70% 20%, 85% 40%, 100% 70%, 80% 100%, 60% 80%, 40% 100%, 20% 80%, 0% 60%, 20% 30%, 35% 15%)',
                    }}
                    className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[60deg] bg-gradient-to-r from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                />
            </div>

            <div className="container mt-10 mb-20">
                <h3 className=" xl:text-6xl font-bold  md:text-5xl max-w-5xl text-4xl text-center text-primary mx-auto ">
                    Make Your Child&rsquo;s Cadet College Dream a Reality
                </h3>
            </div>

            <div className="container grid lg:grid-cols-2 grid-cols-1 gap-10 mt-10 items-center">
                <div className="flex justify-end items-center relative order-2 lg:order-1">
                    <Image
                        src="/cadet-coaching.png"
                        alt="Hero Banner"
                        height={700}
                        width={900}
                        style={{ objectFit: 'contain' }}
                    />
                </div>

                <div className="flex flex-col gap-12 order-1 lg:order-2 relative">
                    <div className="absolute -top-14 left-0">
                        <Vector color="#20AD96" />
                    </div>

                    <h4 className="text-4xl font-bold">
                        Chance to get into Pakistan&rsquo;s most famous Cadet
                        Colleges
                    </h4>

                    <p className="font-medium text-primary text-lg">
                        Your child has the chance to join one of
                        Pakistan&rsquo;s most prestigious cadet colleges, where
                        discipline meets academic excellence. Our dedicated
                        coaching program will prepare them for every step of the
                        way, from mastering entrance exams to acing interviews.
                        We focus on building strong foundational skills,
                        boosting confidence, and nurturing the qualities that
                        these elite institutions seek.
                    </p>

                    <p className="font-medium text-primary text-lg">
                        With personalized guidance, your child will not only be
                        ready for the challenges ahead but will also develop a
                        mindset that will serve them throughout their academic
                        and professional life. Invest in their future today, and
                        watch them grow into tomorrow&rsquos;s leaders.
                    </p>

                    <Link
                        href={'#'}
                        className={`${buttonVariants({
                            variant: 'default',
                        })} font-semibold lg:w-[200px]`}
                    >
                        Get Consultation
                    </Link>
                </div>
            </div>

            <CollegesCarousel />
        </div>
    );
}
