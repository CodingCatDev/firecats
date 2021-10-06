import dynamic from 'next/dynamic';

const User = dynamic(() => import('@/components/SignIn'), {
  ssr: false,
});

const Home = (): JSX.Element => {
  return <User />;
};
export default Home;
