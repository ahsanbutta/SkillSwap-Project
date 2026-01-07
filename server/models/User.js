import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            select: false
        },
        skillsHave: {
            type: [String],
            required: true
        },
        skillsWant: {
            type: [String],
            required: true
        },
        credits: {
            type: Number,
            default: 5
        },
        rating: {
            type: Number,
            default: 0
        },
        role: {
            type: String,
            enum: ['user', 'admin'],
            default: 'user'
        },
        bio: {
            type: String,
            default: ''
        }
    },
    { timestamps: true }
);

// Mongoose 5+ / 6+ / 7+ / 8+ async pre hook
userSchema.pre('save', async function () {
    if (!this.isModified('password')) {
        return;
    }
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.comparePassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
