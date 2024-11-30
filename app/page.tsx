import Hero from '@/components/Hero';
import About from '@/components/About';
import Quotes from '@/components/Quotest';
import Footer from '@/components/Footer';
import CadetCoaching from '@/components/CadetCoaching';
import AcademicTutoring from '@/components/AcademicTutoring';
import KidsCoding from '@/components/KidsCoding';

export default function Home() {
    return (
        <main>
            <Hero />

            <About />

            <CadetCoaching />

            <AcademicTutoring />

            <KidsCoding />

            <Quotes />

            <Footer />
        </main>
    );
}
