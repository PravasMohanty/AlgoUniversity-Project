// ========================================
// Home Component - Main Homepage Layout
// ========================================
// Contains the main homepage with navbar, hero section, cards, and footer
// Handles scroll-based navbar visibility and scroll-to-top functionality

import React, { useState, useEffect, useRef, useCallback } from 'react';
import Navbar from './Navbar';
import Homepage from './Homepage';
import Cards from './Cards';
import Footer from './Footer';

const Home = ({ onLoginClick, hideLoginButton = false, user, onLogout }) => {
    // ========================================
    // State Management
    // ========================================

    const [isNavbarVisible, setIsNavbarVisible] = useState(true);  // Controls navbar visibility
    const heroRef = useRef(null);                                   // Reference to hero section
    const scrollTimeoutRef = useRef(null);                          // Throttling reference for scroll events

    // ========================================
    // Scroll to Top on Component Mount
    // ========================================
    // Ensures page starts at the top when component loads

    useEffect(() => {
        const scrollToTop = () => {
            // Multiple methods for better browser compatibility
            window.scrollTo(0, 0);
            document.documentElement.scrollTop = 0;
            document.body.scrollTop = 0;

            // Force re-render to ensure scroll position is set
            setTimeout(() => {
                window.scrollTo(0, 0);
            }, 100);
        };

        // Execute immediately and after a short delay for reliability
        scrollToTop();
        setTimeout(scrollToTop, 50);
    }, []);

    // ========================================
    // Scroll Event Handler with Throttling
    // ========================================
    // Optimized scroll handler to control navbar visibility

    const handleScroll = useCallback(() => {
        // Throttle scroll events to improve performance
        if (scrollTimeoutRef.current) return;

        scrollTimeoutRef.current = setTimeout(() => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

            // For now, keep navbar always visible for testing
            setIsNavbarVisible(true);

            // Original logic (commented out for testing):
            // if (scrollTop > 50) {
            //     setIsNavbarVisible(true);
            // } else {
            //     setIsNavbarVisible(false);
            // }

            scrollTimeoutRef.current = null;
        }, 16); // ~60fps throttling (16ms)
    }, []);

    // ========================================
    // Scroll Event Listener Setup
    // ========================================
    // Adds and removes scroll event listener

    useEffect(() => {
        // Add scroll event listener with passive option for better performance
        window.addEventListener('scroll', handleScroll, { passive: true });

        // Initial check for navbar visibility
        handleScroll();

        // Cleanup function
        return () => {
            window.removeEventListener('scroll', handleScroll);
            if (scrollTimeoutRef.current) {
                clearTimeout(scrollTimeoutRef.current);
            }
        };
    }, [handleScroll]);

    // ========================================
    // Component Render
    // ========================================

    return (
        <div className="bg-black text-white overflow-x-hidden min-h-screen scrollbar-hide">


            {/* Hero Section */}
            <Homepage heroRef={heroRef} />

            {/* Feature Cards Section */}
            <Cards />

            {/* Footer */}
            <Footer />

            {/* Custom CSS to hide scrollbars */}
            <style>{`
                .scrollbar-hide {
                    -ms-overflow-style: none;  /* Internet Explorer 10+ */
                    scrollbar-width: none;  /* Firefox */
                }
                .scrollbar-hide::-webkit-scrollbar { 
                    display: none;  /* Safari and Chrome */
                }
                
                /* Hide scrollbar for the entire page */
                html, body {
                    scrollbar-width: none; /* Firefox */
                    -ms-overflow-style: none; /* Internet Explorer 10+ */
                }
                
                html::-webkit-scrollbar, body::-webkit-scrollbar {
                    display: none; /* Safari and Chrome */
        }
      `}</style>
        </div>
    );
};

export default Home;