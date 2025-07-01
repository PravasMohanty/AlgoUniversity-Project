// Login.jsx - Enhanced with clear spacing, structure, and comments

import React, { useState, useEffect } from 'react';
import {
    Mail, Lock, Eye, EyeOff, Github, Twitter, Linkedin,
    ArrowLeft, Key, User, Loader2
} from 'lucide-react';
import apiService from '../src/services/api';
import { Link } from 'react-router-dom';

// ---------------------------
// Login Component
// ---------------------------
const Login = ({ onBack, onLoginSuccess, isRegister = false }) => {
    // State declarations
    const [showPassword, setShowPassword] = useState(false);   // Toggles password visibility
    const [loading, setLoading] = useState(false);             // Controls loading spinner on submit
    const [error, setError] = useState(null);                  // Global error (like failed login)

    // Form field values
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: '',
        username: '',
        adminKey: ''
    });

    // Field-specific validation errors
    const [formErrors, setFormErrors] = useState({});

    // Clear error states when switching modes
    useEffect(() => {
        setError(null);
        setFormErrors({});
    }, [isRegister]);

    // Updates form field and clears individual errors while typing
    const handleInputChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });

        if (formErrors[e.target.name]) {
            setFormErrors({
                ...formErrors,
                [e.target.name]: ''
            });
        }
    };

    // Client-side validation before submit
    const validateForm = () => {
        const errors = {};

        if (isRegister) {
            if (!formData.name.trim()) errors.name = 'Name is required';
            if (!formData.username.trim()) errors.username = 'Username is required';
            else if (formData.username.length < 3) errors.username = 'Username must be at least 3 characters';
        }

        if (isRegister) {
            if (!formData.email.trim()) errors.email = 'Email is required';
            else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Email is invalid';
        } else {
            if (!formData.username.trim()) errors.username = 'Username is required';
        }

        if (!formData.password) errors.password = 'Password is required';
        else if (formData.password.length < 8) errors.password = 'Password must be at least 8 characters';

        if (isRegister && formData.password !== formData.confirmPassword)
            errors.confirmPassword = 'Passwords do not match';

        setFormErrors(errors);
        return Object.keys(errors).length === 0;
    };

    // Form submit logic: login or register
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return;

        try {
            setLoading(true);
            setError(null);

            if (!isRegister) {
                const response = await apiService.login({
                    username: formData.username,
                    password: formData.password
                });

                if (response.success && response.token && response.user) {
                    apiService.setToken(response.token);
                    if (onLoginSuccess) onLoginSuccess(response.user);
                    if (onBack) onBack();
                }
            } else {
                const response = await apiService.register({
                    name: formData.name,
                    username: formData.username,
                    email: formData.email,
                    password: formData.password,
                    adminKey: formData.adminKey || undefined
                });

                if (response.success && response.token && response.user) {
                    apiService.setToken(response.token);
                    if (onLoginSuccess) onLoginSuccess(response.user);
                    if (onBack) onBack();
                }
            }
        } catch (err) {
            setError(err.message);
            console.error('Authentication failed:', err);
        } finally {
            setLoading(false);
        }
    };

    // Toggles password visibility
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Handle custom or fallback back navigation
    const handleBackClick = () => {
        if (onBack) onBack();
        else window.history.back();
    };

    return (
        <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
            {/* Background Image */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                style={{
                    backgroundImage: 'url(/LoginBack.jpg)',
                    filter: 'brightness(0.3)'
                }}
            />

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/50" />

            {/* Back Button */}
            <button
                onClick={handleBackClick}
                className="absolute top-4 left-4 z-20 text-white hover:text-green-400 transition-colors duration-200 flex items-center space-x-1 text-sm"
            >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
            </button>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-sm mx-4">
                {/* Logo */}
                <div className="text-center mb-6">
                    <div className="flex items-center justify-center space-x-2 mb-3">
                        <img
                            src="/logo.png"
                            alt="CodeForge Logo"
                            className="w-8 h-8 object-contain"
                        />
                        <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                            CodeForge
                        </span>
                    </div>
                    <h1 className="text-xl font-bold text-white mb-1">
                        {!isRegister ? 'Welcome Back' : 'Create Account'}
                    </h1>
                    <p className="text-sm text-gray-300">
                        {!isRegister ? 'Sign in to continue your coding journey' : 'Join the community of coders worldwide'}
                    </p>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-md">
                        <p className="text-red-400 text-sm">{error}</p>
                    </div>
                )}

                {/* Form */}
                <div className="bg-black/40 backdrop-blur-md border border-green-400/20 rounded-xl p-6 shadow-2xl">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {isRegister && (
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">
                                    Full Name
                                </label>
                                <div className="relative">
                                    <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="text"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        className={`w-full pl-8 pr-3 py-2 bg-gray-900/50 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors text-sm ${formErrors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-green-400 focus:ring-green-400'
                                            }`}
                                        placeholder="Enter your full name"
                                        required={isRegister}
                                    />
                                </div>
                                {formErrors.name && (
                                    <p className="text-red-400 text-xs mt-1">{formErrors.name}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type="text"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleInputChange}
                                    className={`w-full pl-8 pr-3 py-2 bg-gray-900/50 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors text-sm ${formErrors.username ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-green-400 focus:ring-green-400'
                                        }`}
                                    placeholder={!isRegister ? "Enter your username" : "Choose a username"}
                                    required
                                />
                            </div>
                            {formErrors.username && (
                                <p className="text-red-400 text-xs mt-1">{formErrors.username}</p>
                            )}
                        </div>

                        {isRegister && (
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">
                                    Email Address
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        className={`w-full pl-8 pr-3 py-2 bg-gray-900/50 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors text-sm ${formErrors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-green-400 focus:ring-green-400'
                                            }`}
                                        placeholder="Enter your email"
                                        required={isRegister}
                                    />
                                </div>
                                {formErrors.email && (
                                    <p className="text-red-400 text-xs mt-1">{formErrors.email}</p>
                                )}
                            </div>
                        )}

                        <div>
                            <label className="block text-xs font-medium text-gray-300 mb-1">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleInputChange}
                                    className={`w-full pl-8 pr-10 py-2 bg-gray-900/50 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors text-sm ${formErrors.password ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-green-400 focus:ring-green-400'
                                        }`}
                                    placeholder="Enter your password"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={togglePasswordVisibility}
                                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                            {formErrors.password && (
                                <p className="text-red-400 text-xs mt-1">{formErrors.password}</p>
                            )}
                        </div>

                        {isRegister && (
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleInputChange}
                                        className={`w-full pl-8 pr-3 py-2 bg-gray-900/50 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-1 transition-colors text-sm ${formErrors.confirmPassword ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-600 focus:border-green-400 focus:ring-green-400'
                                            }`}
                                        placeholder="Confirm your password"
                                        required={isRegister}
                                    />
                                </div>
                                {formErrors.confirmPassword && (
                                    <p className="text-red-400 text-xs mt-1">{formErrors.confirmPassword}</p>
                                )}
                            </div>
                        )}

                        {isRegister && (
                            <div>
                                <label className="block text-xs font-medium text-gray-300 mb-1">
                                    Admin Code
                                </label>
                                <div className="relative">
                                    <Key className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="adminKey"
                                        value={formData.adminKey}
                                        onChange={handleInputChange}
                                        className="w-full pl-8 pr-3 py-2 bg-gray-900/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-green-400 focus:ring-1 focus:ring-green-400 transition-colors text-sm"
                                        placeholder="Optional"
                                        required={false}
                                    />
                                </div>
                            </div>
                        )}

                        {!isRegister && (
                            <div className="flex items-center justify-between">
                                <label className="flex items-center">
                                    <input type="checkbox" className="rounded border-gray-600 text-green-400 focus:ring-green-400 bg-gray-900/50 w-3 h-3" />
                                    <span className="ml-2 text-xs text-gray-300">Remember me</span>
                                </label>
                                <a href="#" className="text-xs text-green-400 hover:text-green-300 transition-colors">
                                    Forgot password?
                                </a>
                            </div>
                        )}

                        <button
                            type="submit"
                            className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black py-2 rounded-full font-semibold hover:scale-105 transition-all duration-200 flex items-center justify-center"
                            disabled={loading}
                        >
                            {loading ? (
                                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                            ) : null}
                            {!isRegister ? 'Login' : 'Sign Up'}
                        </button>
                    </form>

                    {/* Social Login */}
                    <div className="mt-4">
                        <div className="relative">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-gray-600" />
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-2 bg-black/40 text-gray-400">Or continue with</span>
                            </div>
                        </div>

                        <div className="mt-4 grid grid-cols-3 gap-2">
                            <button className="flex items-center justify-center px-3 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 transition-colors">
                                <Github className="w-4 h-4" />
                            </button>
                            <button className="flex items-center justify-center px-3 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 transition-colors">
                                <Twitter className="w-4 h-4" />
                            </button>
                            <button className="flex items-center justify-center px-3 py-2 border border-gray-600 rounded-md text-gray-300 hover:bg-gray-800/50 hover:border-gray-500 transition-colors">
                                <Linkedin className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Toggle between login and register */}
                    <div className="mt-4 text-center">
                        {!isRegister ? (
                            <span className="text-gray-300 text-sm">
                                Don&apos;t have an account?{' '}
                                <Link to="/auth/register" className="text-green-400 hover:underline">Sign up</Link>
                            </span>
                        ) : (
                            <span className="text-gray-300 text-sm">
                                Already have an account?{' '}
                                <Link to="/auth/login" className="text-green-400 hover:underline">Log in</Link>
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;