import dynamic from 'next/dynamic';

const FirebaseFirestoreProvider = dynamic<any>(
  () =>
    import('@/components/firebase/wrappers').then(
      (mod) => mod.FirebaseFirestoreProvider
    ),
  {
    ssr: false,
  }
);

const CatAdmin = dynamic<any>(() => import('@/components/CatAdmin'), {
  ssr: false,
});

const ClientSidePage = (): JSX.Element => {
  return (
    <FirebaseFirestoreProvider>
      <CatAdmin />
    </FirebaseFirestoreProvider>
  );
};
export default ClientSidePage;
