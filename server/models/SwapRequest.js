import mongoose from 'mongoose'

const swapRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    skillsHave: {
        type: String,
        required: true
    },
    skillsWant: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'rejected', 'completed'],
        default: 'pending'
    },
    message: {
        type: String,
        maxlength: 500
    }
}, {
    timestamps: true
});

export default mongoose.model('SwapRequest', swapRequestSchema);
