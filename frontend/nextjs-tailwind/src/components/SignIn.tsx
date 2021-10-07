import { useSigninCheck, useUser } from 'reactfire';
import SignInForm from './SignInForm';

const SignIn = (): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const { data: user } = useUser();

  const checkUser = () => {
    if (status === 'loading') {
      return <>Loading...</>;
    }

    if (signInCheckResult.signedIn === true && user) {
      return (
        <div className="flex flex-col">
          <p>
            Hello {user.displayName}, thank you for signing in with email:{' '}
            {user.email}
          </p>
        </div>
      );
    } else {
      return <SignInForm />;
    }
  };
  return <>{checkUser()}</>;
};

export default SignIn;
