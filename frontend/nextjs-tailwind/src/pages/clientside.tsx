import dynamic from 'next/dynamic';

const CatAdmin = dynamic<any>(() => import('@/components/CatAdmin'), {
  ssr: false,
});

const ClientSidePage = (): JSX.Element => {
  return <CatAdmin />;
};
export default ClientSidePage;
