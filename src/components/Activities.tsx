import React from 'react';
import { Shield, Award, Zap, Code } from 'lucide-react';

const Activities: React.FC = () => {
    const activities = [
        {
            icon: Shield,
            title: 'Cybersecurity Awareness Campaigns',
            description: 'Conduct events to educate students on phishing, password hygiene, social engineering, and data privacy.'
        },
        {
            icon: Award,
            title: 'Competitions & Hackathons',
            description: 'Host or participate in local, national, or international cybersecurity contests.'
        },
        {
            icon: Zap,
            title: 'Capture The Flag (CTF) Challenges',
            description: 'Organize in-house and online CTF competitions to apply skills in realistic cybersecurity scenarios.'
        },
        {
            icon: Code,
            title: 'Workshops & Hands-On Labs',
            description: 'Sessions on topics like network security, cryptography, ethical hacking, malware analysis, and secure coding.'
        }
    ];

    return (
        <section id="activities" className="py-20 px-6 bg-blue-900/5">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                    Our <span className="text-cyber-cyan">Activities</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
                    {activities.map((activity, index) => {
                        const Icon = activity.icon;
                        return (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-blue-900/20 rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300 border border-cyber-cyan"
                            >
                                <div className="flex items-start space-x-4">
                                    <div className="w-12 h-12 rounded-lg flex items-center justify-center flex-shrink-0 bg-cyber-cyan/20">
                                        <Icon className="w-6 h-6 text-cyber-cyan" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold mb-3">{activity.title}</h3>
                                        <p className="text-gray-300">{activity.description}</p>
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Activities;
