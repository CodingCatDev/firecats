import { useSigninCheck, useUser } from 'reactfire';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
const SignInForm = (): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const { data: user } = useUser();

  const googleSignIn = () => {
    const auth = getAuth();

    const provider = new GoogleAuthProvider();
    // Start a sign in process for an unauthenticated user.
    provider.addScope('profile');
    provider.addScope('email');
    signInWithPopup(auth, provider);
  };

  const checkUser = () => {
    if (status === 'loading') {
      return <>Loading...</>;
    }
    return (
      <>
        <div className="bg-gray-300 ">
          <div className="container flex items-center justify-center h-screen">
            <div className="max-w-6xl p-8 pb-10 bg-white rounded-lg">
              <div className="flex justify-center mb-2">Example Login</div>
              <button
                className="w-full h-12 px-2 text-center text-white rounded bg-primary-800 hover:bg-primary-500"
                onClick={() => googleSignIn()}
              >
                Google Signin
              </button>
            </div>
          </div>
        </div>
      </>
    );
  };
  return <>{checkUser()}</>;
};

export default SignInForm;
