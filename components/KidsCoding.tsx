import Image from 'next/image';
export default function KidsCoding() {
  return (
    <div
      id="kids-coding"
      className="flex justify-center items-center min-h-screen flex-col container"
    >
      <Image
        src="/kids-coding.png"
        height={500}
        width={800}
        alt="Kids coding"
        className="bg-contain"
      />

      <h3 className="xl:text-6xl font-bold  md:text-5xl max-w-5xl text-4xl text-primary mx-auto ">
        Fun & Engaging Coding for Kids
      </h3>

      <p className="font-medium text-primary text-lg mt-10 max-w-4xl">
        <span className="font-extrabold text-xl bg-theme1 p-1">
          {' '}
          &quot;Kids Coding&quot;
        </span>{' '}
        introduces young learners to the world of programming in a fun and
        engaging way. Our tailored curriculum focuses on building essential
        coding skills, problem-solving abilities, and creativity. Designed for
        children starting from className 3 onwards, we ensure that each student
        learns at their own pace, making coding an enjoyable experience.
      </p>

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
            className="relative left-[calc(80%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]"
          />
        </div>

        <div className="flex flex-col grid-cols-9 p-2 mx-auto md:grid">
          <div className="flex md:contents flex-row-reverse">
            <div className="relative p-4 my-6 text-gray-800 bg-white dark:bg-gray-950/30 dark:text-primary rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto">
              <h3 className="text-lg font-semibold lg:text-xl">
                Interactive Lessons
              </h3>

              <p className="mt-2 leading-6">
                We use games and hands-on activities to teach coding concepts,
                making learning both exciting and effective.
              </p>
            </div>

            <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
              <div className="flex items-center justify-center w-6 h-full">
                <div className="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300"></div>
              </div>

              <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
            </div>
          </div>

          <div className="flex md:contents">
            <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
              <div className="flex items-center justify-center w-6 h-full">
                <div className="w-1 h-full bg-indigo-300"></div>
              </div>

              <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
            </div>

            <div className="relative p-4 my-6 text-gray-800 bg-white dark:bg-gray-950/30 dark:text-primary rounded-xl col-start-6 col-end-10 mr-auto">
              <h3 className="text-lg font-semibold lg:text-xl">
                Real-World Projects
              </h3>

              <p className="mt-2 leading-6">
                Students work on small projects that allow them to apply what
                Transform Your Child&rsquo;s Future with Expert Guidance theyve
                learned, boosting their confidence and understanding.
              </p>
            </div>
          </div>

          <div className="flex md:contents flex-row-reverse">
            <div className="relative p-4 my-6 text-gray-800 bg-white dark:bg-gray-950/30 dark:text-primary rounded-xl col-start-1 col-end-5 mr-auto md:mr-0 md:ml-auto">
              <h3 className="text-lg font-semibold lg:text-xl">
                Personalized Attention
              </h3>

              <p className="mt-2 leading-6">
                Our small class sizes ensure that each child receives the
                guidance they need to succeed.
              </p>
            </div>

            <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
              <div className="flex items-center justify-center w-6 h-full">
                <div className="w-1 h-full bg-indigo-300 rounded-t-full bg-gradient-to-b from-indigo-400 to-indigo-300"></div>
              </div>

              <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
            </div>
          </div>

          <div className="flex md:contents">
            <div className="relative col-start-5 col-end-6 mr-7 md:mx-auto">
              <div className="flex items-center justify-center w-6 h-full">
                <div className="w-1 h-full bg-indigo-300"></div>
              </div>

              <div className="absolute w-6 h-6 -mt-3 bg-white border-4 border-indigo-400 rounded-full top-1/2"></div>
            </div>

            <div className="relative p-4 my-6 text-gray-800 bg-white dark:bg-gray-950/30 dark:text-primary rounded-xl col-start-6 col-end-10 mr-auto">
              <h3 className="text-lg font-semibold lg:text-xl">
                Regular Progress Updates
              </h3>

              <p className="mt-2 leading-6">
                Parents receive regular feedback on their Transform Your
                Child&rsquo;s Future with Expert Guidance childs progress, so
                they can stay informed and involved.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
