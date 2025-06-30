// ========================================
// HomePageLander Component - Landing Page Container
// ========================================
// Combines the landing page hero section with the main homepage content
// Acts as a wrapper component that manages the complete landing experience

import React from 'react'
import Landing from '../components/Landing'
import Home from '../components/Home'

/**
 * HomePageLander Component
 * 
 * This component serves as the main landing page that combines:
 * - Landing: The hero section with 3D elements and call-to-action
 * - Home: The main homepage with features, cards, and footer
 * 
 * @param {Function} onLoginClick - Callback to navigate to login page
 * @param {boolean} hideLoginButton - Whether to hide the login button in navbar
 * @param {Object} user - Current authenticated user data
 * @param {Function} onLogout - Callback to handle user logout
 */
function HomePageLander({ onLoginClick, hideLoginButton = false, user, onLogout }) {
    return (
        <div>
            {/* Hero Landing Section */}
            <Landing />

            {/* Main Homepage Content */}
            <Home
                onLoginClick={onLoginClick}
                hideLoginButton={hideLoginButton}
                user={user}
                onLogout={onLogout}
            />
        </div>
    )
}

export default HomePageLander
