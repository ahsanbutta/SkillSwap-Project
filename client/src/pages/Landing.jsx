import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Globe, Shield, Zap, BookOpen, Users } from 'lucide-react';

const Landing = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-white">
                <div className="mx-auto max-w-7xl">
                    <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
                        <svg className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2" fill="currentColor" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
                            <polygon points="50,0 100,0 50,100 0,100" />
                        </svg>

                        <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                            <div className="sm:text-center lg:text-left">
                                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                    <span className="block xl:inline">Unlock your potential</span>{' '}
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Share & Learn Skills</span>
                                </h1>
                                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                    Join the world's most dynamic skill-swapping community. Trade your expertise for knowledge, connect with mentors, and grow faster together.
                                </p>
                                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                    <div className="rounded-md shadow">
                                        <Link
                                            to="/register"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 md:py-4 md:text-lg transition-transform hover:scale-105"
                                        >
                                            Get Started <ArrowRight className="ml-2 h-5 w-5" />
                                        </Link>
                                    </div>
                                    <div className="mt-3 sm:mt-0 sm:ml-3">
                                        <Link
                                            to="/login"
                                            className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-blue-100 hover:bg-blue-200 md:py-4 md:text-lg"
                                        >
                                            Sign In
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </main>
                    </div>
                </div>
                <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center">
                    <div className="text-white opacity-20 transform -rotate-12">
                        <div className="grid grid-cols-2 gap-8">
                            <div className="h-32 w-32 rounded-2xl bg-white/20 backdrop-blur-lg"></div>
                            <div className="h-32 w-32 rounded-2xl bg-white/20 backdrop-blur-lg mt-12"></div>
                            <div className="h-32 w-32 rounded-2xl bg-white/20 backdrop-blur-lg -mt-12"></div>
                            <div className="h-32 w-32 rounded-2xl bg-white/20 backdrop-blur-lg"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Features Grid */}
            <div className="py-24 bg-gray-50" id="features">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="lg:text-center">
                        <h2 className="text-base text-blue-600 font-semibold tracking-wide uppercase">Why SkillSwap?</h2>
                        <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
                            A smarter way to exchange knowledge
                        </p>
                        <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
                            Forget expensive courses. Learn directly from peers who are experts in their fields.
                        </p>
                    </div>

                    <div className="mt-16">
                        <dl className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
                            {[
                                {
                                    name: 'Global Community',
                                    description: 'Connect with thousands of learners from over 50 countries.',
                                    icon: Globe,
                                },
                                {
                                    name: 'Verified Experts',
                                    description: 'Our rating system ensures you swap with trusted individuals.',
                                    icon: Shield,
                                },
                                {
                                    name: 'Instant Matching',
                                    description: 'Our smart algorithm finds the perfect swap partner for your skills.',
                                    icon: Zap,
                                },
                                {
                                    name: 'Diverse Categories',
                                    description: 'From Coding to Cooking, find any skill you want to learn.',
                                    icon: BookOpen,
                                },
                            ].map((feature) => (
                                <div key={feature.name} className="relative bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
                                    <dt>
                                        <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-gradient-to-r from-blue-500 to-indigo-600 text-white">
                                            <feature.icon className="h-6 w-6" aria-hidden="true" />
                                        </div>
                                        <p className="ml-16 text-lg leading-6 font-medium text-gray-900">{feature.name}</p>
                                    </dt>
                                    <dd className="mt-2 ml-16 text-base text-gray-500">{feature.description}</dd>
                                </div>
                            ))}
                        </dl>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-indigo-700">
                <div className="max-w-2xl mx-auto text-center py-16 px-4 sm:py-20 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                        <span className="block">Ready to dive in?</span>
                        <span className="block text-indigo-200">Start swapping skills today.</span>
                    </h2>
                    <p className="mt-4 text-lg leading-6 text-indigo-200">
                        Join our community and start your learning journey. It's free to join and explore.
                    </p>
                    <Link
                        to="/register"
                        className="mt-8 w-full inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 sm:w-auto"
                    >
                        Sign up for free
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Landing;
