import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMySwaps } from '../redux/swapSlice';
import RequestCard from '../components/RequestCard';
import api from '../services/api';

const Requests = () => {
    const dispatch = useDispatch();
    const { swaps, isLoading } = useSelector((state) => state.swap);
    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        dispatch(getMySwaps());
    }, [dispatch]);

    // Using local function to handle status update instead of slice action for simplicity
    const handleUpdateStatus = async (id, status) => {
        try {
            await api.put(`/swaps/${id}`, { status });
            dispatch(getMySwaps()); // Refresh
        } catch (error) {
            alert('Failed to update status');
        }
    };

    if (isLoading) return <div className="p-8 text-center">Loading requests...</div>;

    const receivedRequests = swaps.filter(s => s.receiver._id === user?._id);
    const sentRequests = swaps.filter(s => s.requester._id === user?._id);

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-8">My Swap Requests</h1>

            <div className="space-y-8">
                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Received Requests (Inbox)</h2>
                    {receivedRequests.length === 0 && <p className="text-gray-500 italic">No received requests.</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {receivedRequests.map(req => (
                            <RequestCard
                                key={req._id}
                                request={req}
                                isSentByMe={false}
                                onUpdateStatus={handleUpdateStatus}
                            />
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">Sent Requests (Outbox)</h2>
                    {sentRequests.length === 0 && <p className="text-gray-500 italic">No sent requests.</p>}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {sentRequests.map(req => (
                            <RequestCard
                                key={req._id}
                                request={req}
                                isSentByMe={true}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Requests;
