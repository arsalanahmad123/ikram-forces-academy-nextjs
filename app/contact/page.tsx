'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function ContactPage() {
    return (
        <div className="min-h-screen bg-background lg:mt-36">
            <div className="pt-20 lg:pt-24 pb-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
                            We&apos;d love to hear from you. Reach out to us
                            through any of the channels below or visit us at our
                            office location.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-16">
                        {/* Contact Cards */}
                        <div className="xl:col-span-1 space-y-6">
                            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-3 text-foreground">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Phone className="h-5 w-5 text-primary" />
                                        </div>
                                        Phone Numbers
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="text-lg font-semibold text-foreground">
                                            +92 300 4373031
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Main Office
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-foreground">
                                            +92 346 6666846
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Support Line
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-3 text-foreground">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Mail className="h-5 w-5 text-primary" />
                                        </div>
                                        Email Addresses
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <div>
                                        <p className="text-lg font-semibold text-foreground">
                                            h.ikram00786@gmail.com
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            General Inquiries
                                        </p>
                                    </div>
                                    <div>
                                        <p className="text-lg font-semibold text-foreground">
                                            thepeacedevelopers@gmail.com
                                        </p>
                                        <p className="text-sm text-muted-foreground">
                                            Technical Support
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-3 text-foreground">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <MapPin className="h-5 w-5 text-primary" />
                                        </div>
                                        Location
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <p className="text-lg font-semibold text-foreground">
                                        House no.30 Street 50
                                    </p>
                                    <p className="text-lg font-semibold text-foreground">
                                        Block x, new satellite town sargodha
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-3">
                                        Postal Code: 40100
                                    </p>
                                </CardContent>
                            </Card>

                            <Card className="border-border bg-card hover:shadow-lg transition-shadow duration-300">
                                <CardHeader className="pb-3">
                                    <CardTitle className="flex items-center gap-3 text-foreground">
                                        <div className="p-2 rounded-lg bg-primary/10">
                                            <Clock className="h-5 w-5 text-primary" />
                                        </div>
                                        Business Hours
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-2">
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Monday - Friday
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            9:00 AM - 6:00 PM
                                        </span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-muted-foreground">
                                            Saturday - Sunday
                                        </span>
                                        <span className="font-semibold text-foreground">
                                            10:00 AM - 6:00 PM
                                        </span>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        <div className="xl:col-span-2">
                            <Card className="border-border bg-card h-full min-h-[500px] xl:min-h-[600px]">
                                <CardHeader>
                                    <CardTitle className="text-foreground">
                                        Find Us Here
                                    </CardTitle>
                                    <p className="text-muted-foreground">
                                        Visit our office for in-person
                                        consultations and meetings
                                    </p>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="rounded-lg overflow-hidden h-[400px] xl:h-[800px]">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4199.573576620498!2d72.70126937638915!3d32.07496087396504!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3921773103d361b7%3A0x2c598fdf05adbfe2!2sIkram%20forces%20academy%20sargodha!5e1!3m2!1sen!2s!4v1755360840818!5m2!1sen!2s"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                            className="w-full h-full"
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    <div className="text-center bg-muted/50 rounded-2xl p-8 sm:p-12">
                        <h2 className="text-2xl sm:text-3xl font-bold text-foreground mb-4">
                            Ready to Start a Conversation?
                        </h2>
                        <p className="text-lg text-muted-foreground mb-6 max-w-2xl mx-auto">
                            Whether you have questions about our services or
                            want to discuss a query, we&apos;re here
                            to help you succeed.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <a
                                href="tel:+923004373031"
                                className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-primary/90 transition-colors"
                            >
                                <Phone className="h-4 w-4" />
                                Call Now
                            </a>
                            <a
                                href="mailto:h.ikram00786@gmail.com"
                                className="inline-flex items-center justify-center gap-2 bg-secondary text-secondary-foreground px-6 py-3 rounded-lg font-semibold hover:bg-secondary/80 transition-colors"
                            >
                                <Mail className="h-4 w-4" />
                                Send Email
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
