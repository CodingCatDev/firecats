import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Layout from '@/layout/Layout';

import {
  FirebaseProvider,
  FirebaseAuthProvider,
} from '@/components/firebase/wrappers';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <FirebaseAuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </FirebaseAuthProvider>
    </FirebaseProvider>
  );
}
export default MyApp;
