import { FirebaseFirestoreProvider } from '@/components/firebase/wrappers';
import ClientSide from '@/components/ClientSide';

const ClientSidePage = (): JSX.Element => {
  return (
    <FirebaseFirestoreProvider>
      <ClientSide />
    </FirebaseFirestoreProvider>
  );
};
export default ClientSidePage;
