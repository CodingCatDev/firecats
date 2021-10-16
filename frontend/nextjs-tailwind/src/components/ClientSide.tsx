import Link from 'next/link';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import { collection } from 'firebase/firestore';

import CatFormInput from '@/components/CatFormInput';

const ClientSide = (): JSX.Element => {
  // Access to Firestore Library
  const firestore = useFirestore();
  const { data: user } = useUser();
  const catsRef = collection(firestore, 'cats');

  const { data, status } = useFirestoreCollectionData(catsRef, {
    idField: 'id',
  });

  // easily check the loading status
  if (status === 'loading') {
    return <p>Fetching cats...</p>;
  }

  if (!data) {
    return <p>No cats yet!</p>;
  }

  return (
    <div className="flex flex-wrap p-6">
      {user && <CatFormInput user={user} />}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">name</th>
            <th className="text-left">type</th>
            <th className="text-left">colors</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d: any, i: number) => (
            <tr
              key={d.id}
              className={i % 2 === 0 ? 'bg-secondary-200' : 'bg-primary-200'}
            >
              <td>
                <Link href={`static/${d.id}`}>
                  <a className="underline cursor-pointer">{d.name}</a>
                </Link>
              </td>
              <td>{d?.type}</td>
              <td>
                <table>
                  <tbody>
                    {d?.colors?.map((c: any) => (
                      <tr key={`${d.id}-${c}`}>
                        <td>{c}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientSide;
