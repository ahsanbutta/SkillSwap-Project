import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../redux/authSlice';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        skillsHave: '',
        skillsWant: '',
        bio: ''
    });

    const { name, email, password, skillsHave, skillsWant, bio } = formData;

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {
        if (isError) {
            alert(message);
        }

        if (isSuccess || user) {
            navigate('/dashboard');
        }

        dispatch(reset());
    }, [user, isError, isSuccess, message, navigate, dispatch]);

    const onChange = (e) => {
        setFormData((prevState) => ({
            ...prevState,
            [e.target.name]: e.target.value,
        }));
    };

    const onSubmit = (e) => {
        e.preventDefault();

        const userData = {
            name,
            email,
            password,
            skillsHave: skillsHave.split(',').map(skill => skill.trim()),
            skillsWant: skillsWant.split(',').map(skill => skill.trim()),
            bio
        };

        dispatch(register(userData));
    };

    return (
        <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-md">
                <div>
                    <h2 className="text-center text-3xl font-extrabold text-gray-900">
                        Create your account
                    </h2>
                </div>
                <form className="mt-8 space-y-4" onSubmit={onSubmit}>
                    <div className="space-y-4">
                        <input
                            name="name"
                            type="text"
                            required
                            className="input-field"
                            placeholder="Full Name"
                            value={name}
                            onChange={onChange}
                        />
                        <input
                            name="email"
                            type="email"
                            required
                            className="input-field"
                            placeholder="Email address"
                            value={email}
                            onChange={onChange}
                        />
                        <input
                            name="password"
                            type="password"
                            required
                            className="input-field"
                            placeholder="Password (min 6 chars)"
                            value={password}
                            onChange={onChange}
                        />
                        <div>
                            <label className="text-xs text-gray-500 ml-1">Comma separated (e.g. React, Design, Writing)</label>
                            <input
                                name="skillsHave"
                                type="text"
                                required
                                className="input-field"
                                placeholder="Skills you offer"
                                value={skillsHave}
                                onChange={onChange}
                            />
                        </div>
                        <div>
                            <label className="text-xs text-gray-500 ml-1">Comma separated</label>
                            <input
                                name="skillsWant"
                                type="text"
                                required
                                className="input-field"
                                placeholder="Skills you want to learn"
                                value={skillsWant}
                                onChange={onChange}
                            />
                        </div>
                        <textarea
                            name="bio"
                            className="input-field h-24"
                            placeholder="Short bio about yourself..."
                            value={bio}
                            onChange={onChange}
                        />
                    </div>

                    <div>
                        <button
                            type="submit"
                            className="w-full btn btn-primary"
                            disabled={isLoading}
                        >
                            {isLoading ? 'Creating Account...' : 'Sign Up'}
                        </button>
                    </div>
                </form>
                <div className="text-center">
                    <p className="text-sm text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
