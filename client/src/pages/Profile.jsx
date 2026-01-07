import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import api from '../services/api';
import { updateUser } from '../redux/authSlice';

const Profile = () => {
    const { user } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name,
        bio: user?.bio,
        skillsHave: user?.skillsHave.join(', '),
        skillsWant: user?.skillsWant.join(', ')
    });

    const handleSave = async () => {
        try {
            const updatedProfileData = {
                ...formData,
                skillsHave: typeof formData.skillsHave === 'string' ? formData.skillsHave.split(',').map(s => s.trim()) : formData.skillsHave,
                skillsWant: typeof formData.skillsWant === 'string' ? formData.skillsWant.split(',').map(s => s.trim()) : formData.skillsWant
            };

            const response = await api.put('/users/profile', updatedProfileData);

            // Dispatch update to Redux store so UI updates immediately
            // We need to import the action first, but for now assuming it's exported from the slice
            // Dynamic import or ensure usage is correct. 
            // Better to dispatch a thunk, but direct action works if API call is here.

            // Re-fetch user data to be safe or use response
            dispatch(updateUser(response.data));

            alert('Profile updated successfully!');
            setIsEditing(false);
        } catch (error) {
            console.error(error);
            alert('Failed to update profile');
        }
    };

    return (
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="card">
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <button
                        onClick={() => isEditing ? handleSave() : setIsEditing(true)}
                        className={`btn ${isEditing ? 'btn-primary' : 'btn-secondary'}`}
                    >
                        {isEditing ? 'Save Changes' : 'Edit Profile'}
                    </button>
                </div>

                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Display Name</label>
                        {isEditing ? (
                            <input
                                className="input-field mt-1"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-lg">{user?.name}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Email</label>
                        <p className="mt-1 text-gray-600">{user?.email}</p>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Bio</label>
                        {isEditing ? (
                            <textarea
                                className="input-field mt-1"
                                value={formData.bio}
                                onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                            />
                        ) : (
                            <p className="mt-1 text-gray-600">{user?.bio || 'No bio yet.'}</p>
                        )}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Skills Offered</label>
                            {isEditing ? (
                                <input
                                    className="input-field mt-1"
                                    value={formData.skillsHave}
                                    onChange={(e) => setFormData({ ...formData, skillsHave: e.target.value })}
                                />
                            ) : (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {user?.skillsHave.map(s => (
                                        <span key={s} className="bg-green-100 text-green-800 px-2 py-1 rounded text-sm">{s}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700">Skills Wanted</label>
                            {isEditing ? (
                                <input
                                    className="input-field mt-1"
                                    value={formData.skillsWant}
                                    onChange={(e) => setFormData({ ...formData, skillsWant: e.target.value })}
                                />
                            ) : (
                                <div className="flex flex-wrap gap-2 mt-2">
                                    {user?.skillsWant.map(s => (
                                        <span key={s} className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-sm">{s}</span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
