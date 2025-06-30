import React from 'react';

function TopOverlay() {
    return (
        <div className="absolute top-0 left-0 h-full w-full flex flex-col justify-center items-center z-20 pointer-events-none">
            <h1 className="text-emerald-100 text-8xl font-bold">Welcome to CodeForge</h1>
            <p className='text-emerald-200 text-3xl'>Where Code Takes Shape.</p>
        </div>
    );
}

export default TopOverlay;
