import React from 'react';
import { Star } from 'lucide-react';

const RatingStars = ({ rating, setRating, readOnly = false }) => {
    return (
        <div className="flex items-center space-x-1">
            {[1, 2, 3, 4, 5].map((star) => (
                <Star
                    key={star}
                    className={`h-5 w-5 cursor-pointer transition-colors ${star <= rating
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                    onClick={() => !readOnly && setRating(star)}
                />
            ))}
        </div>
    );
};

export default RatingStars;
