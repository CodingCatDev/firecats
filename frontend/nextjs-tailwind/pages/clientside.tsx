import dynamic from 'next/dynamic';

const ClientSide = dynamic(() => import('@/components/ClientSide'), {
  ssr: false,
});

const Home = (): JSX.Element => {
  return <ClientSide />;
};
export default Home;
