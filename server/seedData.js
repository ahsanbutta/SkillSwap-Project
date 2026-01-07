import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from './models/User.js';
import connectDB from './config/db.js';

dotenv.config();

const users = [
    {
        name: "Alex Rivera",
        email: "alex.rivera@example.com",
        password: "password123",
        skillsHave: ["JavaScript", "React", "Node.js"],
        skillsWant: ["Python", "Machine Learning"],
        bio: "Full stack developer looking to get into AI.",
        role: "user"
    },
    {
        name: "Sarah Chen",
        email: "sarah.chen@example.com",
        password: "password123",
        skillsHave: ["Graphic Design", "UI/UX", "Figma"],
        skillsWant: ["HTML", "CSS", "Frontend Development"],
        bio: "Designer with 5 years experience, wanting to code my own designs.",
        role: "user"
    },
    {
        name: "Michael Brown",
        email: "michael.b@example.com",
        password: "password123",
        skillsHave: ["Digital Marketing", "SEO", "Content Writing"],
        skillsWant: ["Video Editing", "Premiere Pro"],
        bio: "Marketing guru helping brands grow.",
        role: "user"
    },
    {
        name: "Emily Davis",
        email: "emily.d@example.com",
        password: "password123",
        skillsHave: ["Spanish", "Translation", "Teaching"],
        skillsWant: ["Guitar", "Music Theory"],
        bio: "Language enthusiast and teacher.",
        role: "user"
    },
    {
        name: "David Kim",
        email: "david.k@example.com",
        password: "password123",
        skillsHave: ["Photography", "Photo Editing", "Lightroom"],
        skillsWant: ["Web Development", "WordPress"],
        bio: "Professional photographer looking to build a portfolio site.",
        role: "user"
    },
    {
        name: "Jessica Lee",
        email: "jessica.l@example.com",
        password: "password123",
        skillsHave: ["Python", "Data Analysis", "SQL"],
        skillsWant: ["Public Speaking", "Communication"],
        bio: "Data scientist wanting to improve soft skills.",
        role: "user"
    },
    {
        name: "Chris Wilson",
        email: "chris.w@example.com",
        password: "password123",
        skillsHave: ["Guitar", "Songwriting", "Music Production"],
        skillsWant: ["Piano", "Singing"],
        bio: "Musician willing to trade guitar lessons for piano basics.",
        role: "user"
    },
    {
        name: "Amanda Martinez",
        email: "amanda.m@example.com",
        password: "password123",
        skillsHave: ["Yoga", "Meditation", "Wellness"],
        skillsWant: ["Accounting", "Finance"],
        bio: "Yoga instructor needing help with small business finance.",
        role: "user"
    },
    {
        name: "Robert Taylor",
        email: "robert.t@example.com",
        password: "password123",
        skillsHave: ["Carpentry", "Woodworking", "DIY"],
        skillsWant: ["3D Printing", "CAD"],
        bio: "Old school craftsman looking to learn modern making tools.",
        role: "user"
    },
    {
        name: "Jennifer Anderson",
        email: "jennifer.a@example.com",
        password: "password123",
        skillsHave: ["Gardening", "Botany", "Permaculture"],
        skillsWant: ["Cooking", "Baking"],
        bio: "Green thumb who loves fresh food.",
        role: "user"
    },
    {
        name: "Kevin Thomas",
        email: "kevin.t@example.com",
        password: "password123",
        skillsHave: ["Flutter", "Dart", "Mobile Dev"],
        skillsWant: ["Swift", "iOS Native"],
        bio: "Cross-platform dev wanting to go native.",
        role: "user"
    },
    {
        name: "Lisa White",
        email: "lisa.w@example.com",
        password: "password123",
        skillsHave: ["Copywriting", "Editing", "Proofreading"],
        skillsWant: ["SEO", "Analytics"],
        bio: "Editor looking to understand the numbers behind content.",
        role: "user"
    },
    {
        name: "Daniel Harris",
        email: "daniel.h@example.com",
        password: "password123",
        skillsHave: ["Video Editing", "After Effects", "Motion Graphics"],
        skillsWant: ["3D Modeling", "Blender"],
        bio: "Video pro expanding into 3D.",
        role: "user"
    },
    {
        name: "Ashley Martin",
        email: "ashley.m@example.com",
        password: "password123",
        skillsHave: ["Social Media Management", "Branding"],
        skillsWant: ["Photography", "Photoshop"],
        bio: "Social media manager needing better visuals.",
        role: "user"
    },
    {
        name: "Brian Thompson",
        email: "brian.t@example.com",
        password: "password123",
        skillsHave: ["Cybersecurity", "Network Admin"],
        skillsWant: ["Ethical Hacking", "Pen Testing"],
        bio: "Sysadmin levelling up security skills.",
        role: "user"
    },
    {
        name: "Megan Garcia",
        email: "megan.g@example.com",
        password: "password123",
        skillsHave: ["Illustration", "Drawing", "Procreate"],
        skillsWant: ["Animation", "Toon Boom"],
        bio: "Illustrator willing to animate.",
        role: "user"
    },
    {
        name: "Joshua Robinson",
        email: "joshua.r@example.com",
        password: "password123",
        skillsHave: ["React Native", "JavaScript"],
        skillsWant: ["Ruby on Rails", "Backend"],
        bio: "Frontend dev going full stack.",
        role: "user"
    },
    {
        name: "Sophia Clark",
        email: "sophia.c@example.com",
        password: "password123",
        skillsHave: ["French", "Italian"],
        skillsWant: ["Coding", "Java"],
        bio: "Polyglot curious about computer languages.",
        role: "user"
    },
    {
        name: "Matthew Rodriguez",
        email: "matthew.r@example.com",
        password: "password123",
        skillsHave: ["Project Management", "Agile", "Scrum"],
        skillsWant: ["Product Management"],
        bio: "PM looking to transition roles.",
        role: "user"
    },
    {
        name: "Lauren Lewis",
        email: "lauren.l@example.com",
        password: "password123",
        skillsHave: ["Interior Design", "Decorating"],
        skillsWant: ["Feng Shui"],
        bio: "Designer looking for new perspectives.",
        role: "user"
    },
    {
        name: "Brandon Lee",
        email: "brandon.l@example.com",
        password: "password123",
        skillsHave: ["Blockchain", "Solidity", "Web3"],
        skillsWant: ["Rust", "Solana"],
        bio: "Crypto dev exploring new chains.",
        role: "user"
    },
    {
        name: "Rachel Walker",
        email: "rachel.w@example.com",
        password: "password123",
        skillsHave: ["Makeup Artistry", "Skincare"],
        skillsWant: ["Hair Styling"],
        bio: "Beauty pro wanting to offer full packages.",
        role: "user"
    },
    {
        name: "Andrew Hall",
        email: "andrew.h@example.com",
        password: "password123",
        skillsHave: ["Investing", "Stocks", "Trading"],
        skillsWant: ["Real Estate"],
        bio: "Trader diversifying portfolio knowledge.",
        role: "user"
    },
    {
        name: "Elizabeth Allen",
        email: "elizabeth.a@example.com",
        password: "password123",
        skillsHave: ["Cooking", "Meal Prep"],
        skillsWant: ["Nutrition", "Dietetics"],
        bio: "Chef wanting to learn the science of food.",
        role: "user"
    },
    {
        name: "Ryan Young",
        email: "ryan.y@example.com",
        password: "password123",
        skillsHave: ["Fitness Training", "Calisthenics"],
        skillsWant: ["Physical Therapy"],
        bio: "Trainer preventing injuries.",
        role: "user"
    },
    {
        name: "Kayla Hernandez",
        email: "kayla.h@example.com",
        password: "password123",
        skillsHave: ["Accounting", "Bookkeeping", "Excel"],
        skillsWant: ["Data Science", "Python"],
        bio: "Accountant automating workflows.",
        role: "user"
    },
    {
        name: "James King",
        email: "james.k@example.com",
        password: "password123",
        skillsHave: ["Chess", "Strategy"],
        skillsWant: ["Poker"],
        bio: "Strategic mind expanding games.",
        role: "user"
    },
    {
        name: "Victoria Wright",
        email: "victoria.w@example.com",
        password: "password123",
        skillsHave: ["Blogging", "WordPress"],
        skillsWant: ["React", "Gatsby"],
        bio: "Blogger going headless.",
        role: "user"
    },
    {
        name: "Justin Lopez",
        email: "justin.l@example.com",
        password: "password123",
        skillsHave: ["Auto Repair", "Mechanics"],
        skillsWant: ["Electric Vehicles"],
        bio: "Mechanic preparing for the future.",
        role: "user"
    }
];

const seedData = async () => {
    try {
        await connectDB();

        // Optional: clear existing users (careful with admin)
        // await User.deleteMany({ role: 'user' }); 

        console.log('Seeding users...');

        for (const user of users) {
            const exists = await User.findOne({ email: user.email });
            if (!exists) {
                await User.create(user);
                console.log(`Created: ${user.name}`);
            } else {
                console.log(`Skipped (Exists): ${user.name}`);
            }
        }

        console.log('Seeding complete!');
        process.exit(0);
    } catch (error) {
        console.error('Error seeding data:', error);
        process.exit(1);
    }
};

seedData();
