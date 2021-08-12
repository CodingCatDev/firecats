import FirebaseAuth from '@/components/firebase/FirebaseAuth';
import { useSigninCheck } from 'reactfire';
import 'firebase/auth';

const User = (): JSX.Element => {
  const { status, data: signInCheckResult } = useSigninCheck();

  const checkUser = () => {
    if (status === 'loading') {
      return <>Loading...</>;
    }

    if (signInCheckResult.signedIn === true) {
      return <>SignedIn</>;
    } else {
      return <FirebaseAuth />;
    }
  };
  return <>{checkUser()}</>;
};

export default User;
