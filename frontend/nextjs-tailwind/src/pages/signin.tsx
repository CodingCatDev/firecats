import dynamic from 'next/dynamic';

const SignIn = dynamic<any>(() => import('@/components/auth/SignIn'), {
  ssr: false,
});
const SigninPage = (): JSX.Element => {
  return <SignIn />;
};

export default SigninPage;
