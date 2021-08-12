import { AppTopbar } from '@/layout/AppTopbar';
import Footer from '@/layout/Footer';
import { FirebaseAppProvider } from 'reactfire';
import { config } from '@/config/firebase';

const Layout = ({ children }: { children: any }): JSX.Element => {
  return (
    <FirebaseAppProvider firebaseConfig={config}>
      <AppTopbar />
      <div className="grid grid-cols-1 justify-items-center calc-height-wrapper lg:mx-auto lg:w-80 lg:max-w-8xl lg:justify-items-stretch">
        <main className="grid justify-center w-full grid-cols-1 gap-10 bg-primary-50 dark:bg-basics-700">
          {children}
        </main>

        <Footer />
      </div>
    </FirebaseAppProvider>
  );
};

export default Layout;
