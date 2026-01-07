import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createSwap } from '../redux/swapSlice';
import SkillCard from '../components/SkillCard';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import { X } from 'lucide-react';

const Dashboard = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.auth);

    const [users, setUsers] = useState([]);
    const [search, setSearch] = useState('');
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedUser, setSelectedUser] = useState(null);
    const [swapForm, setSwapForm] = useState({
        skillsHave: '',
        skillsWant: '',
        message: ''
    });

    useEffect(() => {
        if (!user) {
            navigate('/login');
            return;
        }

        const fetchUsers = async () => {
            try {
                const res = await api.get('/users');
                // Filter out self
                setUsers(res.data.filter(u => u._id !== user._id));
            } catch (err) {
                console.error(err);
            }
        };

        fetchUsers();
    }, [user, navigate]);

    const handleRequestSwap = (targetUser) => {
        setSelectedUser(targetUser);
        setSwapForm({
            skillsHave: user.skillsHave[0] || '', // Default to first skill
            skillsWant: targetUser.skillsHave[0] || '', // Default to their first skill (which i want)
            message: `Hi ${targetUser.name}, I'd like to learn ${targetUser.skillsHave[0]} from you!`
        });
        setModalOpen(true);
    };

    const submitSwapRequest = () => {
        dispatch(createSwap({
            receiverId: selectedUser._id,
            ...swapForm
        }));
        setModalOpen(false);
        alert('Swap Request Sent!');
    };

    const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.skillsHave.some(s => s.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-gray-900 mb-4">Find Swap Partners</h1>
                <input
                    type="text"
                    placeholder="Search by name or skill..."
                    className="input-field max-w-md"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredUsers.map(u => (
                    <SkillCard key={u._id} user={u} onRequestSwap={handleRequestSwap} />
                ))}
            </div>

            {/* Simple Modal */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
                    <div className="bg-white rounded-xl max-w-md w-full p-6 relative">
                        <button onClick={() => setModalOpen(false)} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                            <X className="h-6 w-6" />
                        </button>
                        <h2 className="text-xl font-bold mb-4">Swap with {selectedUser?.name}</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skill you want (From {selectedUser?.name})</label>
                                <select
                                    className="input-field"
                                    value={swapForm.skillsWant}
                                    onChange={(e) => setSwapForm({ ...swapForm, skillsWant: e.target.value })}
                                >
                                    {selectedUser?.skillsHave.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Skill you offer</label>
                                <select
                                    className="input-field"
                                    value={swapForm.skillsHave}
                                    onChange={(e) => setSwapForm({ ...swapForm, skillsHave: e.target.value })}
                                >
                                    {user?.skillsHave.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <textarea
                                className="input-field h-24"
                                placeholder="Message..."
                                value={swapForm.message}
                                onChange={(e) => setSwapForm({ ...swapForm, message: e.target.value })}
                            />

                            <button onClick={submitSwapRequest} className="w-full btn btn-primary">
                                Send Request
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
