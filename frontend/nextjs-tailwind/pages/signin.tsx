import dynamic from 'next/dynamic';
import SignIn from '@/components/SignIn';
// const User = dynamic(() => import('@/components/SignIn'), {
//   ssr: false,
// });

const Home = (): JSX.Element => {
  return <SignIn />;
};
export default Home;
