import React from 'react';
import { User, Star } from 'lucide-react';

const SkillCard = ({ user, onRequestSwap }) => {
    const avatarGradient = (name) => {
        const hash = name.split("").reduce((acc, char) => char.charCodeAt(0) + ((acc << 5) - acc), 0);
        const hue = Math.abs(hash % 360);
        return `linear-gradient(135deg, hsl(${hue}, 70%, 60%), hsl(${hue + 40}, 70%, 50%))`;
    };

    return (
        <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border border-t-4 border-t-transparent hover:border-t-blue-500 overflow-hidden flex flex-col h-full group">
            <div className="p-6 flex-grow">
                <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                        <div
                            className="h-12 w-12 rounded-full flex items-center justify-center text-white font-bold text-lg shadow-md"
                            style={{ background: avatarGradient(user.name) }}
                        >
                            {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 text-lg group-hover:text-blue-600 transition-colors">{user.name}</h3>
                            <div className="flex items-center text-amber-500 text-sm mt-0.5">
                                <Star className="h-3.5 w-3.5 fill-current" />
                                <span className="ml-1 font-semibold">{user.averageRating?.toFixed(1) || 'New'}</span>
                                {user.role === 'admin' && <span className="ml-2 text-xs bg-purple-100 text-purple-700 px-1.5 py-0.5 rounded font-medium"> Admin</span>}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="space-y-5">
                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-green-500 mr-2"></span> Offers
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {user.skillsHave.map((skill, index) => (
                                <span key={index} className="bg-green-50 text-green-700 px-2.5 py-1 rounded-full text-xs font-medium border border-green-100 hover:bg-green-100 transition-colors">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    <div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2 flex items-center">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mr-2"></span> Wants
                        </p>
                        <div className="flex flex-wrap gap-2">
                            {user.skillsWant.map((skill, index) => (
                                <span key={index} className="bg-blue-50 text-blue-700 px-2.5 py-1 rounded-full text-xs font-medium border border-blue-100 hover:bg-blue-100 transition-colors">
                                    {skill}
                                </span>
                            ))}
                        </div>
                    </div>

                    {user.bio && (
                        <p className="text-sm text-gray-600 line-clamp-2 italic border-l-2 border-gray-100 pl-3">"{user.bio}"</p>
                    )}
                </div>
            </div>

            <div className="px-6 pb-6 pt-2">
                <button
                    onClick={() => onRequestSwap(user)}
                    className="w-full btn bg-gray-50 text-gray-800 hover:bg-blue-600 hover:text-white border border-gray-200 hover:border-blue-600 transition-all duration-200 flex items-center justify-center space-x-2 py-2.5 rounded-lg active:scale-95 text-sm font-semibold"
                >
                    <User className="h-4 w-4" />
                    <span>Request Swap</span>
                </button>
            </div>
        </div>
    );
};

export default SkillCard;
