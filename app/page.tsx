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
import { MessageCircle, X } from 'lucide-react';

export default function Home() {

    const [showModal, setShowModal] = useState(false);
    const [hasShownModal, setHasShownModal] = useState(false);

     useEffect(() => {
         // Check if modal has been shown before
         const modalShown = localStorage.getItem('paf-modal-shown');
         if (modalShown) {
             setHasShownModal(true);
             return;
         }

         // Show modal after 30 seconds
         const timer = setTimeout(() => {
             if (!hasShownModal) {
                 setShowModal(true);
             }
         }, 30000);

         return () => clearTimeout(timer);
     }, [hasShownModal]);

     const handleCloseModal = () => {
         setShowModal(false);
         setHasShownModal(true);
         localStorage.setItem('paf-modal-shown', 'true');
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
                <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <Card className="w-full max-w-md mx-auto bg-background border shadow-2xl">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="w-6" /> {/* Spacer */}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={handleCloseModal}
                                    className="h-6 w-6 p-0 hover:bg-muted"
                                >
                                    <X className="h-4 w-4" />
                                </Button>
                            </div>

                            <div className="text-center space-y-4">
                                <h2 className="text-xl font-bold text-foreground">
                                    Want to conduct online tests for preparation
                                    of PAF Sargodha and PAF Lower Topa?
                                </h2>

                                <p className="text-muted-foreground text-sm leading-relaxed">
                                    Get comprehensive online test preparation
                                    for PAF College Sargodha and PAF College LowerTopa mock tests.
                                    Our expert-designed practice tests cover all
                                    subjects including 
                                    English, and Intelligence tests specifically
                                    tailored for PAF Sargodha and Lower Topa
                                    requirements.
                                </p>

                                <div className="bg-muted/50 rounded-lg p-4 space-y-3">
                                    <p className="text-sm font-medium text-foreground">
                                        Contact us on WhatsApp:
                                    </p>
                                    <p className="text-lg font-bold text-primary">
                                        +92 305 1678811 
                                    </p>

                                    <Button
                                        onClick={handleWhatsAppClick}
                                        className="w-full bg-green-600 hover:bg-green-700 text-white"
                                    >
                                        <MessageCircle className="w-4 h-4 mr-2" />
                                        Contact on WhatsApp
                                    </Button>
                                </div>

                                <p className="text-xs text-muted-foreground">
                                    Limited time offer - Get started with your
                                    PAF preparation today!
                                </p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </main>
    );
}
