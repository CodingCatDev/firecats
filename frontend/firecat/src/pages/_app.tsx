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

const FirebaseFirestoreProvider = dynamic<any>(
  () =>
    import('@/components/firebase/wrappers').then(
      (mod) => mod.FirebaseFirestoreProvider
    ),
  {
    ssr: false,
  }
);

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <FirebaseProvider>
      <FirebaseAuthProvider>
        <FirebaseFirestoreProvider>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </FirebaseFirestoreProvider>
      </FirebaseAuthProvider>
    </FirebaseProvider>
  );
}
export default MyApp;
