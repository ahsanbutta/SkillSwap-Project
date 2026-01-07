import React, { useState } from 'react';
import { Check, X, Clock, MessageSquare } from 'lucide-react';
import { useDispatch } from 'react-redux';
import api from '../services/api'; // Using api directly to skip creating slice actions for small updates if easier, or move to slice.
// Ideally use slice, but for speed in this context, direct API or passed handler is okay. 
// I'll assume we pass handlers or use simple logic.

const RequestCard = ({ request, isSentByMe, onUpdateStatus }) => {
    const statusColors = {
        pending: 'bg-yellow-100 text-yellow-800',
        accepted: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800'
    };

    return (
        <div className="card">
            <div className="flex justify-between items-start">
                <div>
                    <h3 className="font-semibold text-lg">
                        {isSentByMe
                            ? `To: ${request.receiver.name}`
                            : `From: ${request.requester.name}`}
                    </h3>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                        <Clock className="h-4 w-4 mr-1" />
                        {new Date(request.createdAt).toLocaleDateString()}
                    </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${statusColors[request.status]}`}>
                    {request.status}
                </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase">You Give</p>
                    <p className="font-medium text-gray-900">
                        {isSentByMe ? request.skillsHave : request.skillsWant}
                    </p>
                </div>
                <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-xs text-gray-500 uppercase">You Get</p>
                    <p className="font-medium text-gray-900">
                        {isSentByMe ? request.skillsWant : request.skillsHave}
                    </p>
                </div>
            </div>

            {request.message && (
                <div className="mt-4 text-sm text-gray-600 bg-gray-50 p-3 rounded-lg flex items-start">
                    <MessageSquare className="h-4 w-4 mr-2 mt-0.5 flex-shrink-0" />
                    <p>"{request.message}"</p>
                </div>
            )}

            {!isSentByMe && request.status === 'pending' && (
                <div className="mt-6 flex space-x-3">
                    <button
                        onClick={() => onUpdateStatus(request._id, 'accepted')}
                        className="flex-1 btn bg-green-600 text-white hover:bg-green-700 flex items-center justify-center space-x-1"
                    >
                        <Check className="h-4 w-4" />
                        <span>Accept</span>
                    </button>
                    <button
                        onClick={() => onUpdateStatus(request._id, 'rejected')}
                        className="flex-1 btn bg-red-600 text-white hover:bg-red-700 flex items-center justify-center space-x-1"
                    >
                        <X className="h-4 w-4" />
                        <span>Decline</span>
                    </button>
                </div>
            )}

            {request.status === 'accepted' && (
                <div className="mt-6">
                    <button
                        className="w-full btn btn-secondary"
                        disabled
                    >
                        In Progress - Contact via Email
                    </button>
                    <div className="mt-2 text-center text-xs text-gray-500">
                        {isSentByMe ? request.receiver.email : request.requester.email}
                    </div>
                </div>
            )}
        </div>
    );
};

export default RequestCard;
