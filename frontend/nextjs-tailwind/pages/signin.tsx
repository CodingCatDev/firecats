import dynamic from 'next/dynamic';
const SignIn = dynamic<any>(() => import('@/components/SignIn'), {
  ssr: false,
});
const Home = (): JSX.Element => {
  return <SignIn />;
};
export default Home;
