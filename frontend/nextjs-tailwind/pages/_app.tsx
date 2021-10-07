import '../styles/globals.css';
import type { AppProps } from 'next/app';
import dynamic from 'next/dynamic';

import Layout from '@/layout/Layout';

const FirebaseProvider = dynamic<any>(
  () =>
    import('@/components/firebase/wrappers').then(
      (mod) => mod.FirebaseProvider
    ),
  {
    ssr: false,
  }
);

const FirebaseAuthProvider = dynamic<any>(
  () =>
    import('@/components/firebase/wrappers').then(
      (mod) => mod.FirebaseAuthProvider
    ),
  {
    ssr: false,
  }
);

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
