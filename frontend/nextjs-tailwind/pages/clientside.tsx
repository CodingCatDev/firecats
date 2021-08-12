import Layout from '@/layout/Layout';
import dynamic from 'next/dynamic';

const ClientSide = dynamic(() => import('@/components/firebase/ClientSide'), {
  ssr: false,
});

const Home = (): JSX.Element => {
  return (
    <Layout>
      <ClientSide />
    </Layout>
  );
};
export default Home;
