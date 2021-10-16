import Link from 'next/link';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore';

import CatFormInput from '@/components/CatFormInput';

const ClientSide = (): JSX.Element => {
  // Access to Firestore Library
  const firestore = useFirestore();
  const { data: user } = useUser();
  const catsRef = collection(firestore, 'cats');

  const { data, status } = useFirestoreCollectionData(
    query(catsRef, orderBy('name', 'asc')),
    {
      idField: 'id',
    }
  );

  const onDelete = async (id: string) => {
    await deleteDoc(doc(firestore, 'cats', id));
  };

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
                  <a className="flex justify-between ">
                    <div className="underline cursor-pointer">{d.name}</div>
                    <button
                      onClick={() => onDelete(d.id)}
                      className="bg-white rounded text-error-500 hover:bg-error-500 hover:text-white"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                    </button>
                  </a>
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
