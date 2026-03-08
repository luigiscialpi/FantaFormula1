import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
    appId: 'com.fantaformula1.app',
    appName: 'FantaFormula1',
    webDir: 'dist',
    server: {
        androidScheme: 'https',
    },
    plugins: {
        SplashScreen: {
            launchShowDuration: 3000,
            launchAutoHide: true,
            backgroundColor: '#e10600',
            androidSplashResourceName: 'splash',
            androidAdaptableSplashResourceName: 'splash',
        },
        StatusBar: {
            style: 'light',
            backgroundColor: '#e10600',
        },
    },
    ios: {
        contentInset: 'always',
    },
    android: {
        allowMixedContent: true,
    },
};

export default config;
