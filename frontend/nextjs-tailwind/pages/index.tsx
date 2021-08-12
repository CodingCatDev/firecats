import Layout from '@/layout/Layout';

import dynamic from 'next/dynamic';

const User = dynamic(() => import('@/components/firebase/User'), {
  ssr: false,
});

const Home = (): JSX.Element => {
  return (
    <Layout>
      <User />
    </Layout>
  );
};
export default Home;
