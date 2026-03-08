import React from 'react';
import { createRoot } from 'react-dom/client';
import { IonApp, setupIonicReact } from '@ionic/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './app/App';

// Import Ionic CSS
import '@ionic/react/css/core.css';
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';
import '@ionic/react/css/padding.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

// Import global styles
import './styles/index.css';

// Initialize Ionic React
// Use 'ios' mode for consistent cross-platform styling
setupIonicReact({
    mode: 'ios',
});

// Create TanStack Query client
const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60 * 5, // 5 minutes
            retry: 1,
            refetchOnWindowFocus: false,
        },
    },
});

// Mount the app
const container = document.getElementById('root');
if (container) {
    const root = createRoot(container);
    root.render(
        <React.StrictMode>
            <IonApp>
                <QueryClientProvider client={queryClient}>
                    <App />
                </QueryClientProvider>
            </IonApp>
        </React.StrictMode>
    );
}
