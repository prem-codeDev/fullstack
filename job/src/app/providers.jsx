'use client';

import { QueryClient ,QueryClientProvider } from "@tanstack/react-query"
import { ReactQueryDevTool } from '@tanstack/react-query-devtools';
import { useState } from 'react';

export default function Providers({ children }) {
    const [queryClient] = useState(()=> new QueryClient());

    return (
        <QueryClientProvider client={queryClient}>
                {children}
                <ReactQueryDevTool initialIsOpen={false} />
        </QueryClientProvider>
    )
}