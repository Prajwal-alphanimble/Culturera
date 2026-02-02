'use client';

import React from 'react';

interface SectionTransitionProps {
    fromColor: string;
    toColor: string;
    height?: string;
    className?: string;
}

/**
 * A smooth gradient transition between two section colors.
 * Place this between sections to create seamless color blending.
 */
export default function SectionTransition({
    fromColor,
    toColor,
    height = '20vh',
    className = '',
}: SectionTransitionProps) {
    return (
        <div
            className={`w-full pointer-events-none ${className}`}
            style={{
                height,
                background: `linear-gradient(to bottom, ${fromColor}, ${toColor})`,
            }}
        />
    );
}
