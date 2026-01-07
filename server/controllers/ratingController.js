import Rating from '../models/Rating.js';
import User from '../models/User.js';

// @desc    Rate a user
// @route   POST /api/ratings
// @access  Private
export const createRating = async (req, res) => {
    const { ratedUserId, rating, comment } = req.body;

    try {
        // Prevent self-rating
        if (ratedUserId === req.user.id) {
            return res.status(400).json({ message: 'Cannot rate yourself' });
        }

        const existingRating = await Rating.findOne({
            rater: req.user.id,
            ratedUser: ratedUserId
        });

        if (existingRating) {
            return res.status(400).json({ message: 'You have already rated this user' });
        }

        const newRating = await Rating.create({
            rater: req.user.id,
            ratedUser: ratedUserId,
            rating,
            comment
        });

        // Update user's average rating
        const allRatings = await Rating.find({ ratedUser: ratedUserId });
        const avg = allRatings.reduce((acc, item) => item.rating + acc, 0) / allRatings.length;

        await User.findByIdAndUpdate(ratedUserId, { averageRating: avg, rating: avg });

        res.status(201).json(newRating);

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// @desc    Get ratings for a user
// @route   GET /api/ratings/:userId
// @access  Public
export const getUserRatings = async (req, res) => {
    try {
        const ratings = await Rating.find({ ratedUser: req.params.userId })
            .populate('rater', 'name')
            .sort({ createdAt: -1 });
        res.status(200).json(ratings);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
