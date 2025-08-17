import Image from 'next/image';

export default function KidsStudy() {
    return (
        <div
            id="kids-study"
            className="flex justify-center items-center min-h-screen flex-col container"
        >
            <Image
                src="/kids-coding.png"
                height={500}
                width={800}
                alt="Kids studying"
                className="bg-contain shadow-2xl mb-10 rounded-sm"
            />

            {/* Adjusted heading size */}
            <h3 className="xl:text-4xl font-bold md:text-3xl max-w-4xl text-2xl text-primary mx-auto text-center">
                Fun & Engaging Learning with Online Test System
            </h3>

            <p className="font-medium text-primary text-lg mt-6 max-w-4xl text-left">
                    We 
                provide a complete study and test preparation platform for
                young learners. Along with syllabus-based learning, our &quot;online
                test system&quot; ensures students are fully prepared for exams like{' '}
                <strong>PAF Sargodha</strong> and{' '}
                <strong>PAF Lower Topa</strong>. <br />Students can create accounts,
                attempt tests, receive instant results, and benefit from a
                secure anti-cheating system , giving them real exam-like
                practice.
            </p>

            {/* Timeline */}
            <div className="mt-14 relative">
                <div
                    aria-hidden="true"
                    className="absolute inset-x-0 top-0 -right-96 -z-10 transform-gpu overflow-hidden blur-3xl"
                >
                    <div
                        style={{
                            clipPath:
                                'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
                        }}
                        className="relative left-[calc(80%-11rem)] aspect-[1155/678] w-[36.125rem] 
              -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] 
              to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
                    />
                </div>

                <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid">
                    {/* Step 1 */}
                    <div className="flex md:contents flex-row-reverse">
                        <div
                            className="relative p-4 my-6 text-gray-800 bg-white 
                dark:bg-gray-950/30 dark:text-primary rounded-xl col-start-1 col-end-5 
                mr-auto md:mr-0 md:ml-auto"
                        >
                            <h3 className="text-lg font-semibold lg:text-xl">
                                Create Your Account
                            </h3>
                            <p className="mt-2 leading-6">
                                Students start by creating their account on our
                                platform, giving them access to study material
                                and tests anytime, anywhere.
                            </p>
                        </div>
                        <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                            <div className="flex items-center justify-center w-6 h-full">
                                <div
                                    className="w-1 h-full bg-indigo-300 rounded-t-full 
                  bg-gradient-to-b from-indigo-400 to-indigo-300"
                                ></div>
                            </div>
                            <div
                                className="absolute w-6 h-6 -mt-3 bg-white border-4 
                border-indigo-400 rounded-full top-1/2"
                            ></div>
                        </div>
                    </div>

                    {/* Step 2 */}
                    <div className="flex md:contents">
                        <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                            <div className="flex items-center justify-center w-6 h-full">
                                <div className="w-1 h-full bg-indigo-300"></div>
                            </div>
                            <div
                                className="absolute w-6 h-6 -mt-3 bg-white border-4 
                border-indigo-400 rounded-full top-1/2"
                            ></div>
                        </div>
                        <div
                            className="relative p-4 my-6 text-gray-800 bg-white 
                dark:bg-gray-950/30 dark:text-primary rounded-xl col-start-6 col-end-10 mr-auto"
                        >
                            <h3 className="text-lg font-semibold lg:text-xl">
                                Attempt Online Tests
                            </h3>
                            <p className="mt-2 leading-6">
                                Students perform tests that follow the similar
                                pattern of PAF Sargodha and PAF Lower Topa entry
                                exams, giving them real practice.
                            </p>
                        </div>
                    </div>

                    {/* Step 3 */}
                    <div className="flex md:contents flex-row-reverse">
                        <div
                            className="relative p-4 my-6 text-gray-800 bg-white 
                dark:bg-gray-950/30 dark:text-primary rounded-xl col-start-1 col-end-5 
                mr-auto md:mr-0 md:ml-auto"
                        >
                            <h3 className="text-lg font-semibold lg:text-xl">
                                Get Instant Results
                            </h3>
                            <p className="mt-2 leading-6">
                                Once submitted, students immediately see their
                                scores, helping them
                                track progress and focus on weak areas.
                            </p>
                        </div>
                        <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                            <div className="flex items-center justify-center w-6 h-full">
                                <div
                                    className="w-1 h-full bg-indigo-300 rounded-t-full 
                  bg-gradient-to-b from-indigo-400 to-indigo-300"
                                ></div>
                            </div>
                            <div
                                className="absolute w-6 h-6 -mt-3 bg-white border-4 
                border-indigo-400 rounded-full top-1/2"
                            ></div>
                        </div>
                    </div>

                    {/* Step 4 */}
                    <div className="flex md:contents">
                        <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
                            <div className="flex items-center justify-center w-6 h-full">
                                <div className="w-1 h-full bg-indigo-300"></div>
                            </div>
                            <div
                                className="absolute w-6 h-6 -mt-3 bg-white border-4 
                border-indigo-400 rounded-full top-1/2"
                            ></div>
                        </div>
                        <div
                            className="relative p-4 my-6 text-gray-800 bg-white 
                dark:bg-gray-950/30 dark:text-primary rounded-xl col-start-6 col-end-10 mr-auto"
                        >
                            <h3 className="text-lg font-semibold lg:text-xl">
                                Secure & Fair Testing
                            </h3>
                            <p className="mt-2 leading-6">
                                Our tests use secure methods to prevent
                                cheating, ensuring students practice in a fair
                                and disciplined environment like the real exam.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
