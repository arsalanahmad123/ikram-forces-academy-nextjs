'use client';


import Hero from '@/components/Hero';
import About from '@/components/About';
import Quotes from '@/components/Quotest';
import Footer from '@/components/Footer';
import CadetCoaching from '@/components/CadetCoaching';
import AcademicTutoring from '@/components/AcademicTutoring';
import KidsCoding from '@/components/KidsCoding';
import { useState,useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card,CardContent } from '@/components/ui/card';
import { Clock, MessageCircle, Star, Trophy, Users, X } from 'lucide-react';

export default function Home() {

    const [showModal, setShowModal] = useState(false);
    const [isVisible, setIsVisible] = useState(false);

     useEffect(() => {
         const timer = setTimeout(() => {
             setShowModal(true);
             setTimeout(() => setIsVisible(true), 100);
         }, 15000); 

         return () => clearTimeout(timer);
     }, []);

     const handleCloseModal = () => {
         setIsVisible(false);
         setTimeout(() => setShowModal(false), 300);
     };

     const handleWhatsAppClick = () => {
         const phoneNumber = '+923051678811';
         const message = encodeURIComponent(
             'Hi! I am interested in PAF test preparation courses. Can you provide more details?'
         );
         window.open(`https://wa.me/${phoneNumber}?text=${message}`, '_blank');
     };



    return (
        <main>
            <Hero />

            <About />

            <CadetCoaching />

            <AcademicTutoring />

            <KidsCoding />

            <Quotes />

            <Footer />

            {showModal && (
                <div
                    className={`fixed inset-0 bg-black/60 backdrop-blur-md z-50 flex items-center justify-center p-4 transition-all duration-500 ${
                        isVisible ? 'opacity-100' : 'opacity-0'
                    }`}
                >
                    <Card
                        className={`w-full max-w-lg mx-auto bg-gradient-to-br from-white via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-950 border-2 border-blue-200 dark:border-blue-800 shadow-2xl transform transition-all duration-500 ${
                            isVisible
                                ? 'scale-100 translate-y-0'
                                : 'scale-95 translate-y-8'
                        }`}
                    >
                        <CardContent className="p-0 relative overflow-hidden">
                            <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10 animate-pulse"></div>

                            <div className="relative flex justify-between items-center p-4 border-b border-blue-200 dark:border-blue-800">
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-6 w-6 text-yellow-500 animate-bounce" />
                                    <span className="text-sm font-semibold text-blue-700 dark:text-blue-300">
                                        Premium Preparation
                                    </span>
                                </div>
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCloseModal}
                                    className="h-8 w-8 p-0 hover:bg-red-100 hover:text-red-600 rounded-full transition-all duration-200"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="relative p-6 space-y-6">
                                <div className="text-center space-y-3">
                                    <div className="flex justify-center items-center gap-2 mb-2">
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                        <Star className="h-5 w-5 text-yellow-500 fill-yellow-500" />
                                    </div>

                                    <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-700 via-purple-700 to-indigo-700 bg-clip-text text-transparent leading-tight">
                                        🎯 Ready for PAF Success?
                                    </h2>

                                    <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
                                        Master PAF Sargodha & Lower Topa Tests
                                    </p>
                                </div>

                                <div className="bg-white/80 dark:bg-gray-800/80 rounded-xl p-4 border border-blue-200 dark:border-blue-700 shadow-inner">
                                    <p className="text-gray-700 dark:text-gray-300 text-sm leading-relaxed text-center">
                                        Get comprehensive online test
                                        preparation with our expert-designed
                                        practice tests covering all subjects
                                        including English and Intelligence tests
                                        specifically tailored for PAF
                                        requirements.
                                    </p>
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div className="flex items-center gap-2 bg-green-50 dark:bg-green-950/30 p-3 rounded-lg border border-green-200 dark:border-green-800">
                                        <Clock className="h-4 w-4 text-green-600" />
                                        <span className="text-xs font-medium text-green-700 dark:text-green-300">
                                            24/7 Access
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2 bg-blue-50 dark:bg-blue-950/30 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
                                        <Users className="h-4 w-4 text-blue-600" />
                                        <span className="text-xs font-medium text-blue-700 dark:text-blue-300">
                                            Expert Guidance
                                        </span>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 rounded-xl p-5 border-2 border-green-200 dark:border-green-800 shadow-lg">
                                    <div className="text-center space-y-4">
                                        <div className="flex items-center justify-center gap-2">
                                            <MessageCircle className="h-5 w-5 text-green-600 animate-pulse" />
                                            <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                                                Contact us on WhatsApp:
                                            </p>
                                        </div>

                                        <div className="bg-white dark:bg-gray-800 rounded-lg p-3 border border-green-300 dark:border-green-700">
                                            <p className="text-xl font-bold text-green-700 dark:text-green-300 tracking-wider">
                                                +92 305 1678811
                                            </p>
                                        </div>

                                        <Button
                                            onClick={handleWhatsAppClick}
                                            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold py-3 rounded-xl shadow-lg transform hover:scale-105 transition-all duration-200"
                                        >
                                            <MessageCircle className="w-5 h-5 mr-2 animate-bounce" />
                                            Start Your Journey Now! 
                                        </Button>
                                    </div>
                                </div>

                                <div className="text-center">
                                    <div className="inline-flex items-center gap-2 bg-red-50 dark:bg-red-950/30 px-4 py-2 rounded-full border border-red-200 dark:border-red-800">
                                        <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                                        <p className="text-xs font-medium text-red-700 dark:text-red-300">
                                            ⏰ Limited Time Offer - Join Today!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </main>
    );
}
