import { signOut } from '@firebase/auth';
import dynamic from 'next/dynamic';
import { useAuth, useSigninCheck, useUser } from 'reactfire';

const FirebaseAuth = dynamic<any>(
  () => import('@/components/auth/FirebaseAuth'),
  {
    ssr: false,
  }
);

const SignIn = (): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const { data: user } = useUser();
  const auth = useAuth();

  const checkUser = () => {
    if (status === 'loading') {
      return <>Loading...</>;
    }

    if (signInCheckResult.signedIn === true && user) {
      return (
        <div className="flex flex-col m-20">
          <h1 className="w-full pb-10 text-3xl font-extrabold tracking-tight sm:text-4xl">
            Hello {user.displayName}, thank you for signing in with email:{' '}
            <span className="text-primary-900">{user.email}</span>
          </h1>

          <button className="btn-primary" onClick={() => signOut(auth)}>
            Sign Out
          </button>
        </div>
      );
    } else {
      return <FirebaseAuth />;
    }
  };
  return <>{checkUser()}</>;
};

export default SignIn;
