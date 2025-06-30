import React, { useRef, useEffect, useState, Suspense } from 'react';
import TopOverlay from './TopOverlay';

// Lazy load Spline to reduce initial bundle size
const Spline = React.lazy(() => import('@splinetool/react-spline'));

export default function Landing() {
    const nextSectionRef = useRef(null);
    const [isSplineLoaded, setIsSplineLoaded] = useState(false);
    const [isVisible, setIsVisible] = useState(true);

    // Performance toggle - set to false to disable Spline completely
    const ENABLE_SPLINE = true; // Set to false to disable 3D scene for better performance

    // Performance optimization: Only load Spline when component is visible
    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsVisible(entry.isIntersecting);
            },
            { threshold: 0.1 }
        );

        if (nextSectionRef.current) {
            observer.observe(nextSectionRef.current);
        }

        return () => observer.disconnect();
    }, []);

    // Ensure this component doesn't interfere with scroll position
    useEffect(() => {
        // Prevent any unwanted scrolling on component mount
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }, []);

    const handleClick = () => {
        if (nextSectionRef.current) {
            nextSectionRef.current.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };

    // Loading fallback for Spline
    const SplineFallback = () => (
        <div className="h-screen w-full bg-gradient-to-br from-green-900/20 to-emerald-900/20 flex items-center justify-center">
            <div className="text-green-400 text-xl">Loading...</div>
        </div>
    );

    // Static background when Spline is disabled
    const StaticBackground = () => (
        <div className="h-screen w-full bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20 flex items-center justify-center">
            <div className="text-center">
                <div className="text-green-400 text-6xl font-bold mb-4">CodeForge</div>
                <div className="text-gray-300 text-xl">Your Coding Journey Starts Here</div>
            </div>
        </div>
    );

    return (
        <div className="bg-black text-white">
            {/* First Page with Spline */}
            <div className="h-screen overflow-hidden">
                <main
                    onClick={handleClick}
                    className="relative h-screen w-full overflow-hidden cursor-pointer"
                >
                    {/* Only render Spline when enabled, visible and loaded */}
                    {ENABLE_SPLINE && isVisible ? (
                        <Suspense fallback={<SplineFallback />}>
                            <Spline
                                scene="https://prod.spline.design/L9-srgtbCQ5i9onH/scene.splinecode"
                                onLoad={() => setIsSplineLoaded(true)}
                                style={{
                                    // Performance optimizations
                                    willChange: 'transform',
                                    transform: 'translateZ(0)', // Force hardware acceleration
                                }}
                            />
                        </Suspense>
                    ) : (
                        <StaticBackground />
                    )}
                    <TopOverlay />
                </main>
            </div>

            {/* Target section for scroll */}
            <div ref={nextSectionRef} className="h-0 w-full"></div>
        </div>
    );
}