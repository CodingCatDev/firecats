import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/layout/Layout';

import { FirebaseAppProvider } from 'reactfire';
import { config } from '@/config/firebase';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </FirebaseAppProvider>
  );
}
export default MyApp;
