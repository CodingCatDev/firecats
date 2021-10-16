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

const ClientSide = dynamic<any>(() => import('@/components/ClientSide'), {
  ssr: false,
});

const ClientSidePage = (): JSX.Element => {
  return (
    <FirebaseFirestoreProvider>
      <ClientSide />
    </FirebaseFirestoreProvider>
  );
};
export default ClientSidePage;
