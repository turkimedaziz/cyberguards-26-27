import { useEffect, useRef } from 'react';
import { Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
    const videoRef = useRef<HTMLVideoElement>(null);

    useEffect(() => {
        // Ensure video plays
        if (videoRef.current) {
            videoRef.current.play().catch((error) => {
                console.error('Video autoplay failed:', error);
            });
        }
    }, []);

    return (
        <section id="home" className="relative pt-40 pb-20 px-6 overflow-hidden">
            {/* Video Background */}
            <div className="absolute inset-0">
                <video
                    ref={videoRef}
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="w-full h-full object-cover opacity-30"
                    onError={(e) => console.error('Video error:', e)}
                    onLoadedData={() => console.log('Video loaded successfully')}
                >
                    <source src="/bg.webm" type="video/webm" />
                    Your browser does not support the video tag.
                </video>
            </div>

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/10 via-transparent to-blue-900/10"></div>

            <div className="container mx-auto text-center relative z-10">
                {/* Hero Section */}
                <div className="mb-8 flex justify-center">
                    <img src="/Asset 7Logo HelmetFou9.png" alt="ENISo CyberGuards" className="h-50 md:h-64" />
                </div>
                <div className="flex items-center justify-center gap-2 mb-6">

                    <span className="text-lg font-semibold text-cyber-blue">Our New Club</span>

                </div>
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12">
                    Empowering students to protect the digital world through training, awareness, and hands-on experience
                </p>
                <div className="flex justify-center gap-4 mb-20">
                    <a
                        href="#axes"
                        className="px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 bg-cyber-cyan text-white"
                    >
                        Learn More
                    </a>
                    <a
                        href="#activities"
                        className="px-8 py-3 border-2 border-cyber-pink rounded-lg font-semibold transition-all duration-300 text-cyber-pink hover:bg-cyber-pink/10"
                    >
                        Our Activities
                    </a>
                </div>

                {/* Who We Are Section */}
                <div id="about" className="max-w-4xl mx-auto mt-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-8">
                        <span className="text-cyber-cyan">Who</span> We Are
                    </h2>
                    <p className="text-lg text-gray-300 leading-relaxed">
                        ENISo CyberGuards is a non-profit club dedicated to training students, raising awareness,
                        and empowering everyone to protect their digital information against cyber threats. Through
                        engaging workshops, training sessions, and Capture The Flag (CTF) challenges, we offer
                        hands-on experiences for both beginners and enthusiasts.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Hero;
