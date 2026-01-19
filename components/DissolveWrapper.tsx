'use client';

import dynamic from 'next/dynamic';
import React from 'react';

// Wrapper to handle dynamic import with ssr: false
// This must be in a Client Component in Next.js App Router
const DissolveTransition = dynamic(() => import('./DissolveTransition'), {
    ssr: false,
});

export default function DissolveWrapper(props: any) {
    return <DissolveTransition {...props} />;
}
