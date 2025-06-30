// ========================================
// Navbar Component - Main Navigation Bar
// ========================================
// Provides navigation menu, user authentication status, and responsive mobile menu
// Handles login/logout functionality and user profile display

import React, { useState } from 'react';
import {
    HelpCircle,
    Award,
    User,
    Settings,
    ChevronDown,
    Menu,
    X,
    LogOut
} from 'lucide-react';

const Navbar = ({ isNavbarVisible, onLoginClick, hideLoginButton = false, user, onLogout }) => {
    // ========================================
    // State Management
    // ========================================

    const [hoveredNav, setHoveredNav] = useState(null);        // Currently hovered navigation item
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // Mobile menu visibility

    // ========================================
    // Navigation Items Configuration
    // ========================================
    // Defines the main navigation menu items with icons and descriptions

    const navItems = [
        {
            name: 'Questions',
            icon: <HelpCircle className="w-4 h-4" />,
            description: 'Browse coding questions and challenges'
        },
        {
            name: 'Contests',
            icon: <Award className="w-4 h-4" />,
            description: 'Participate in competitive programming'
        },
        {
            name: 'User Profile',
            icon: <User className="w-4 h-4" />,
            description: 'Manage your profile and achievements'
        },
        {
            name: 'Admin Panel',
            icon: <Settings className="w-4 h-4" />,
            description: 'Administrative tools and controls'
        }
    ];

    // ========================================
    // Computed Values
    // ========================================

    // Determine if navbar should be visible (with fallback)
    const shouldShowNavbar = isNavbarVisible !== undefined ? isNavbarVisible : true;

    // Check if user is authenticated
    const isAuthenticated = !!user;

    // ========================================
    // Event Handlers
    // ========================================

    /**
     * Handle login button click
     * Uses provided callback or falls back to window.location
     */
    const handleLoginClick = () => {
        if (onLoginClick) {
            onLoginClick();
        } else {
            window.location.href = '/login';
        }
    };

    /**
     * Handle logout button click
     * Calls the provided logout callback
     */
    const handleLogout = () => {
        if (onLogout) {
            onLogout();
        }
    };

    /**
     * Toggle mobile menu visibility
     */
    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // ========================================
    // Component Render
    // ========================================

    return (
        <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${shouldShowNavbar
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-full'
            }`}>
            {/* Navigation Bar Container */}
            <div className="bg-black/90 border-b border-green-400/20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

                    {/* Main Navigation Row */}
                    <div className="flex justify-between items-center h-16">

                        {/* Logo Section */}
                        <div className="flex items-center space-x-3">
                            <img
                                src="/logo.png"
                                alt="CodeForge Logo"
                                className="w-8 h-8 object-contain"
                            />
                            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                                CodeForge
                            </span>
                        </div>

                        {/* Desktop Navigation Menu */}
                        <div className="hidden md:flex items-center space-x-6">
                            {navItems.map((item, index) => (
                                <div
                                    key={item.name}
                                    className="relative group"
                                    onMouseEnter={() => setHoveredNav(index)}
                                    onMouseLeave={() => setHoveredNav(null)}
                                >
                                    {/* Navigation Item Button */}
                                    <button className="flex items-center space-x-1 text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium py-2">
                                        {item.icon}
                                        <span>{item.name}</span>
                                        <ChevronDown className="w-3 h-3 transition-transform duration-200 group-hover:rotate-180" />
                                    </button>

                                    {/* Dropdown Tooltip */}
                                    {hoveredNav === index && (
                                        <div className="absolute top-full left-0 mt-2 w-48 bg-gray-900/95 border border-green-400/30 rounded-lg shadow-xl shadow-green-400/10 p-3">
                                            <div className="text-green-400 font-medium text-sm mb-1">{item.name}</div>
                                            <div className="text-gray-300 text-xs">{item.description}</div>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>

                        {/* Desktop Authentication Section */}
                        <div className="hidden md:flex items-center space-x-4">
                            {isAuthenticated ? (
                                // Authenticated User Display
                                <>
                                    {/* User Profile Info */}
                                    <div className="flex items-center space-x-2 text-gray-300">
                                        <div className="w-8 h-8 bg-green-400/20 rounded-full flex items-center justify-center">
                                            <User className="w-4 h-4 text-green-400" />
                                        </div>
                                        <div className="text-sm">
                                            <div className="font-medium">{user?.name || user?.username}</div>
                                            {user?.isAdmin && (
                                                <div className="text-xs text-green-400">Admin</div>
                                            )}
                                        </div>
                                    </div>

                                    {/* Logout Button */}
                                    <button
                                        onClick={handleLogout}
                                        className="flex items-center space-x-1 text-gray-300 hover:text-red-400 transition-colors duration-200"
                                    >
                                        <LogOut className="w-4 h-4" />
                                        <span className="text-sm">Logout</span>
                                    </button>
                                </>
                            ) : (
                                // Login Button (if not hidden)
                                !hideLoginButton && (
                                    <button
                                        onClick={handleLoginClick}
                                        className="bg-gradient-to-r from-green-400 to-emerald-500 text-black px-4 py-2 rounded-full font-semibold hover:scale-105 hover:shadow-lg hover:shadow-green-400/30 transition-all duration-200"
                                    >
                                        Login / SignUp
                                    </button>
                                )
                            )}
                        </div>

                        {/* Mobile Menu Toggle Button */}
                        <button
                            className="md:hidden text-gray-300 hover:text-green-400 transition-colors p-2"
                            onClick={toggleMobileMenu}
                        >
                            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>

                    {/* Mobile Menu Dropdown */}
                    {isMobileMenuOpen && (
                        <div className="md:hidden border-t border-gray-700/50 py-4">
                            <div className="space-y-3">

                                {/* Mobile Navigation Items */}
                                {navItems.map((item) => (
                                    <div key={item.name} className="flex items-center space-x-3 text-gray-300 hover:text-green-400 transition-colors px-4 py-2">
                                        {item.icon}
                                        <span className="font-medium">{item.name}</span>
                                    </div>
                                ))}

                                {/* Mobile Authentication Section */}
                                {isAuthenticated ? (
                                    // Authenticated User Mobile Display
                                    <>
                                        <div className="px-4 py-2 border-t border-gray-700/50">
                                            {/* User Profile Info */}
                                            <div className="flex items-center space-x-2 text-gray-300 mb-2">
                                                <div className="w-6 h-6 bg-green-400/20 rounded-full flex items-center justify-center">
                                                    <User className="w-3 h-3 text-green-400" />
                                                </div>
                                                <div className="text-sm">
                                                    <div className="font-medium">{user?.name || user?.username}</div>
                                                    {user?.isAdmin && (
                                                        <div className="text-xs text-green-400">Admin</div>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Logout Button */}
                                            <button
                                                onClick={handleLogout}
                                                className="w-full flex items-center justify-center space-x-2 text-red-400 hover:text-red-300 transition-colors py-2"
                                            >
                                                <LogOut className="w-4 h-4" />
                                                <span>Logout</span>
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    // Login Button Mobile (if not hidden)
                                    !hideLoginButton && (
                                        <div className="pt-3 border-t border-gray-700/50 mt-3">
                                            <button
                                                onClick={handleLoginClick}
                                                className="w-full bg-gradient-to-r from-green-400 to-emerald-500 text-black px-4 py-2 rounded-full font-semibold hover:scale-105 transition-all duration-200"
                                            >
                                                Login / SignUp
                                            </button>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
