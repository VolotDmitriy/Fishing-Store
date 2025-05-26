'use client';

import Footer from '@/components/app-components/footer';
import Header from '@/components/app-components/header';
import facebook from '@/components/app-components/public/footer/facebook.svg';
import instagram from '@/components/app-components/public/footer/instagram.svg';
import telegram from '@/components/app-components/public/footer/telegram.svg';
import youtube from '@/components/app-components/public/footer/youtube.svg';
import { PathBreadcrumb } from '@/components/path-breadcrumb';
import Image from 'next/image';
import Link from 'next/link';

export default function ContactsPage() {
    return (
        <div className="bg-[#141414] min-h-screen">
            <Header />
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
                <PathBreadcrumb />
                <div className="mt-8">
                    <h1 className="text-[#38E078] font-brigends-expanded font-bold text-4xl mb-8 text-center md:text-left">
                        Contacts
                    </h1>
                    <div className="flex flex-col md:flex-row gap-12">
                        <div className="flex-1 bg-[#1A1A1A] rounded-lg p-6 shadow-lg border border-[#38E078]/20">
                            <h2 className="text-white font-plus-jakarta-sans text-2xl font-bold mb-4">
                                Get in Touch
                            </h2>
                            <p className="text-[#AAAAAA] font-plus-jakarta-sans text-lg mb-6">
                                We’d love to hear from you! Reach out with any
                                questions or inquiries about our fishing
                                products.
                            </p>
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#38E078] font-plus-jakarta-sans text-lg">
                                        Phone:
                                    </span>
                                    <div className="flex flex-col">
                                        <a
                                            href="tel:+380676572448"
                                            className="text-white font-plus-jakarta-sans text-lg hover:text-[#38E078] transition-colors"
                                        >
                                            (067) 657-24-48
                                        </a>
                                        <a
                                            href="tel:+380673802186"
                                            className="text-white font-plus-jakarta-sans text-lg hover:text-[#38E078] transition-colors"
                                        >
                                            (067) 380-21-86
                                        </a>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#38E078] font-plus-jakarta-sans text-lg">
                                        Email:
                                    </span>
                                    <a
                                        href="mailto:logoFishing@gmail.com"
                                        className="text-white font-plus-jakarta-sans text-lg hover:text-[#38E078] transition-colors"
                                    >
                                        logoFishing@gmail.com
                                    </a>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#38E078] font-plus-jakarta-sans text-lg">
                                        Address:
                                    </span>
                                    <p className="text-white font-plus-jakarta-sans text-lg">
                                        123 Fishing Lane, Kyiv, Ukraine
                                    </p>
                                </div>
                                <div className="flex items-start gap-2">
                                    <span className="text-[#38E078] font-plus-jakarta-sans text-lg">
                                        Hours:
                                    </span>
                                    <p className="text-white font-plus-jakarta-sans text-lg">
                                        Mon-Fri: 9:00 AM - 6:00 PM
                                        <br />
                                        Sat: 10:00 AM - 4:00 PM
                                        <br />
                                        Sun: Closed
                                    </p>
                                </div>
                            </div>
                            <div className="flex flex-row gap-4 mt-6">
                                <Link
                                    href="https://youtube.com"
                                    target="_blank"
                                >
                                    <Image
                                        src={youtube}
                                        alt="YouTube"
                                        width={42}
                                        height={42}
                                        className="cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300"
                                    />
                                </Link>
                                <Link
                                    href="https://telegram.org"
                                    target="_blank"
                                >
                                    <Image
                                        src={telegram}
                                        alt="Telegram"
                                        width={42}
                                        height={42}
                                        className="cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300"
                                    />
                                </Link>
                                <Link
                                    href="https://instagram.com"
                                    target="_blank"
                                >
                                    <Image
                                        src={instagram}
                                        alt="Instagram"
                                        width={42}
                                        height={42}
                                        className="cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300"
                                    />
                                </Link>
                                <Link
                                    href="https://facebook.com"
                                    target="_blank"
                                >
                                    <Image
                                        src={facebook}
                                        alt="Facebook"
                                        width={42}
                                        height={42}
                                        className="cursor-pointer filter grayscale hover:grayscale-0 transition-all duration-300"
                                    />
                                </Link>
                            </div>
                        </div>
                        <div className="flex-1 flex flex-col gap-8">
                            <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-lg border border-[#38E078]/20">
                                <h2 className="text-white font-plus-jakarta-sans text-2xl font-bold mb-4">
                                    Our Mission
                                </h2>
                                <p className="text-[#AAAAAA] font-plus-jakarta-sans text-lg">
                                    At LogoFishing, we’re passionate about
                                    providing high-quality fishing gear to
                                    enthusiasts worldwide. Our mission is to
                                    equip every angler with the tools they need
                                    to make unforgettable memories by the water.
                                    Contact us to learn more about our products
                                    or to share your fishing adventures!
                                </p>
                            </div>
                            <div className="bg-[#1A1A1A] rounded-lg p-6 shadow-lg border border-[#38E078]/20">
                                <h2 className="text-white font-plus-jakarta-sans text-2xl font-bold mb-4">
                                    Send Us a Message
                                </h2>
                                <p className="text-[#AAAAAA] font-plus-jakarta-sans text-lg mb-6">
                                    Have a specific question or feedback? Drop
                                    us a message, and we’ll get back to you as
                                    soon as possible.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
