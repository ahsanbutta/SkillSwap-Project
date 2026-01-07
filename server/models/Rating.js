import mongoose from 'mongoose'

const ratingSchema = new mongoose.Schema({
    rater: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    ratedUser: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    rating: {
        type: Number,
        required: [true, 'Please add a rating between 1 and 5'],
        min: 1,
        max: 5
    },
    comment: {
        type: String,
        maxlength: 200
    }
}, {
    timestamps: true
});

// Prevent user from rating the same person multiple times (optional, but good logic)
ratingSchema.index({ rater: 1, ratedUser: 1 }, { unique: true });

export default mongoose.model('Rating', ratingSchema);
