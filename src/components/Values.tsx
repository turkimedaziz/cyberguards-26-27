import React from 'react';

const Values: React.FC = () => {
    const values = [
        {
            title: 'Ethics & Responsibility',
            description: 'Emphasize the importance of ethical hacking, privacy, and responsible handling of sensitive information.'
        },
        {
            title: 'Awareness & Outreach',
            description: 'Spread cybersecurity awareness among students and the wider community to create a culture of digital safety.'
        },
        {
            title: 'Learning & Growth',
            description: 'Encourage continuous learning in cybersecurity, keeping up with the latest threats, tools, and techniques.'
        },
        {
            title: 'Collaboration & Teamwork',
            description: 'Promote working together on projects, CTFs, and events to share knowledge and solve problems collectively.'
        }
    ];

    return (
        <section id="values" className="py-20 px-6 bg-gradient-to-b from-blue-900/10 to-transparent">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">
                    Our <span className="text-cyber-pink">Values</span>
                </h2>
                <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="rounded-xl p-6 hover:border-cyan-400/40 transition-all duration-300 border border-cyber-cyan bg-cyber-dark/50"
                        >
                            <h3 className="text-xl font-bold mb-3 text-cyber-pink">{value.title}</h3>
                            <p className="text-gray-300">{value.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Values;
