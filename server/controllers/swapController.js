import SwapRequest from '../models/SwapRequest.js';

// @desc    Create new swap request
// @route   POST /api/swaps
// @access  Private
export const createSwapRequest = async (req, res) => {
    const { receiverId, skillsHave, skillsWant, message } = req.body;

    if (!receiverId || !skillsHave || !skillsWant) {
        return res.status(400).json({ message: 'Please provide all required fields' });
    }

    try {
        const swapRequest = await SwapRequest.create({
            requester: req.user.id,
            receiver: receiverId,
            skillsHave,
            skillsWant,
            message
        });

        res.status(201).json(swapRequest);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get my swap requests (both sent and received)
// @route   GET /api/swaps
// @access  Private
export const getMySwaps = async (req, res) => {
    try {
        const swaps = await SwapRequest.find({
            $or: [{ requester: req.user.id }, { receiver: req.user.id }]
        })
            .populate('requester', 'name email')
            .populate('receiver', 'name email')
            .sort({ createdAt: -1 });

        res.status(200).json(swaps);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Update swap request status
// @route   PUT /api/swaps/:id
// @access  Private
export const updateSwapStatus = async (req, res) => {
    const { status } = req.body;

    try {
        const swap = await SwapRequest.findById(req.params.id);

        if (!swap) {
            return res.status(404).json({ message: 'Swap request not found' });
        }

        // Ensure user is part of the swap
        if (swap.receiver.toString() !== req.user.id && swap.requester.toString() !== req.user.id) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        if (status) {
            swap.status = status;
        }

        const updatedSwap = await swap.save();
        res.status(200).json(updatedSwap);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
