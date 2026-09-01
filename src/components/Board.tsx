import React from 'react';

interface TeamMember {
    name: string;
    role: string;
    image: string;
}

interface BoardProps {
    teamMembers: TeamMember[];
}

const Board: React.FC<BoardProps> = ({ teamMembers }) => {
    return (
        <section id="board" className="py-20 px-6 bg-gradient-to-b from-blue-900/10 to-transparent">
            <div className="container mx-auto">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-center">
                    Executive Board
                </h2>
                <p className="text-center text-gray-400 mb-16">Meet the dedicated team leading our mission</p>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {teamMembers.map((member, index) => (
                        <div
                            key={index}
                            className="group rounded-xl overflow-hidden border border-cyber-cyan transition-all duration-300 hover:-translate-y-2 bg-cyber-dark/30"
                        >
                            <div className="relative h-90 overflow-hidden bg-gradient-to-br from-blue-900 to-cyan-900">
                                <img
                                    src={member.image}
                                    alt={member.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
                            </div>
                            <div className="p-4 relative z-12">
                                <h3 className="text-xl font-semibold mb-2">{member.name}</h3>
                                <p className="text-xl font-bold text-cyber-cyan">{member.role}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Board;
