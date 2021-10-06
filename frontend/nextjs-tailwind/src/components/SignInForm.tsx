import { useSigninCheck, useUser } from 'reactfire';

const SignInForm = (): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();
  const { data: user } = useUser();

  const checkUser = () => {
    if (status === 'loading') {
      return <>Loading...</>;
    }
  };
  return <>{checkUser()}</>;
};

export default SignInForm;
