import React from 'react';
import { Users, Target, Code } from 'lucide-react';

const Axes: React.FC = () => {
    const axes = [
        {
            icon: Users,
            title: 'Trainings',
            description: 'Comprehensive training programs to build cybersecurity skills from the ground up'
        },
        {
            icon: Target,
            title: 'Events',
            description: 'Engaging events that bring together the cybersecurity community'
        },
        {
            icon: Code,
            title: 'Projects',
            description: 'Real-world projects that apply cybersecurity knowledge to practical scenarios'
        }
    ];

    return (
        <section id="axes" className="py-20 px-6 bg-blue-900/5">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                    Our <span className="text-cyber-cyan">Three Axes</span>
                </h2>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    {axes.map((axis, index) => {
                        const Icon = axis.icon;
                        return (
                            <div
                                key={index}
                                className="bg-gradient-to-br from-blue-900/20 to-cyan-900/20 border border-cyber-cyan rounded-xl p-8 hover:border-cyan-400/50 transition-all duration-300 transform hover:-translate-y-2"
                            >
                                <div className="w-16 h-16 rounded-lg flex items-center justify-center mb-6 bg-cyber-cyan/20">
                                    <Icon className="w-8 h-8 text-cyber-cyan" />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{axis.title}</h3>
                                <p className="text-gray-300">{axis.description}</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Axes;
