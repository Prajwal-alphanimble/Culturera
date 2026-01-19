'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Wrapper to handle dynamic import with ssr: false
const ScrollDissolve = dynamic(() => import('./ScrollDissolve'), {
    ssr: false,
});

export default function ScrollDissolveWrapper(props: any) {
    return <ScrollDissolve {...props} />;
}
