import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface GalleryImage {
    src: string;
    title: string;
    description: string;
}

const Gallery: React.FC = () => {
    const images: GalleryImage[] = [
        {
            src: '/1st-bootcamp-linux.jpg',
            title: 'Introduction to cybersecurity Bootcamp',
            description: 'Linux Fundamentals for cybersecurity'
        },
        {
            src: '/1st-bootcamp-networks.jpg',
            title: 'Introduction to cybersecurity Bootcamp',
            description: 'Network security fundamentals and practical exercises'
        },
        {
            src: '/1st-workshop.jpg',
            title: '1st CTF Workshop',
            description: 'Our inaugural workshop introducing students to CTF fundamentals'
        },
        {
            src: '/2nd workshop.jpg',
            title: '2nd CTF Workshop',
            description: 'Advanced CTF techniques and hands-on practice sessions'
        },


        {
            src: '/bootcamp.jpg',
            title: 'Cybersecurity Bootcamp',
            description: 'Comprehensive cybersecurity training program'
        }
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    // Auto-advance every 15 seconds
    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
        }, 15000);

        return () => clearInterval(timer);
    }, [images.length]);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    };

    const goToSlide = (index: number) => {
        setCurrentIndex(index);
    };

    return (
        <section id="gallery" className="py-20 px-6 bg-gradient-to-b from-transparent to-blue-900/10">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                    Our <span className="text-cyber-cyan">Workshops & Bootcamps</span>
                </h2>
                <p className="text-center text-gray-400 mb-16">
                    Explore our past events and training sessions
                </p>

                <div className="max-w-5xl mx-auto">
                    {/* Main Image Container */}
                    <div className="relative group">
                        <div className="relative h-96 md:h-[500px] overflow-hidden rounded-xl border border-cyber-cyan bg-gradient-to-br from-blue-900/20 to-cyan-900/20">
                            <img
                                src={images[currentIndex].src}
                                alt={images[currentIndex].title}
                                className="w-full h-full object-contain transition-opacity duration-500"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

                            {/* Image Info */}
                            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                                <h3 className="text-2xl md:text-3xl font-bold mb-2">
                                    {images[currentIndex].title}
                                </h3>
                                <p className="text-gray-300 text-lg">
                                    {images[currentIndex].description}
                                </p>
                            </div>

                            {/* Navigation Arrows */}
                            <button
                                onClick={goToPrevious}
                                className="absolute left-4 top-1/2 -translate-y-1/2 bg-cyber-dark/80 hover:bg-cyber-cyan/80 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                aria-label="Previous image"
                            >
                                <ChevronLeft className="w-6 h-6" />
                            </button>
                            <button
                                onClick={goToNext}
                                className="absolute right-4 top-1/2 -translate-y-1/2 bg-cyber-dark/80 hover:bg-cyber-cyan/80 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                                aria-label="Next image"
                            >
                                <ChevronRight className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Dot Indicators */}
                        <div className="flex justify-center gap-3 mt-6">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={() => goToSlide(index)}
                                    className={`transition-all duration-300 rounded-full ${index === currentIndex
                                        ? 'w-12 h-3 bg-cyber-cyan'
                                        : 'w-3 h-3 bg-gray-500 hover:bg-gray-400'
                                        }`}
                                    aria-label={`Go to slide ${index + 1}`}
                                />
                            ))}
                        </div>

                        {/* Counter */}
                        <div className="text-center mt-4 text-gray-400">
                            <span className="text-cyber-cyan font-semibold">{currentIndex + 1}</span>
                            {' / '}
                            {images.length}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Gallery;
