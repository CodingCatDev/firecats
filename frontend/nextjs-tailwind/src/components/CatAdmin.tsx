import Link from 'next/link';
import { useFirestore, useFirestoreCollectionData, useUser } from 'reactfire';
import {
  collection,
  CollectionReference,
  deleteDoc,
  doc,
  orderBy,
  query,
} from 'firebase/firestore';

import CatFormInput from '@/components/CatFormInput';
import { Cat } from '@/models/cat.model';
import CatColor from './CatColor';
import { useState } from 'react';

const ClientSide = (): JSX.Element => {
  // Access to Firestore Library
  const firestore = useFirestore();
  const { data: user } = useUser();
  const catsRef = collection(firestore, 'cats') as CollectionReference<Cat>;
  const [cat, setCat] = useState<Cat | null>(null);

  const { data: cats, status } = useFirestoreCollectionData<Cat>(
    query<Cat>(catsRef, orderBy('name', 'asc')),
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

  if (!cats) {
    return <p>No cats yet!</p>;
  }

  return (
    <div className="flex flex-wrap p-6">
      {user && !cat && <CatFormInput user={user} />}
      {user && cat && <CatFormInput user={user} cat={cat} setCat={setCat} />}
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="p-2 text-left">name</th>
            <th className="text-left">type</th>
            <th className="text-left">colors</th>
          </tr>
        </thead>
        <tbody>
          {cats.map((d: any, i: number) => (
            <tr
              key={d.id}
              className={i % 2 === 0 ? 'bg-secondary-200' : 'bg-primary-200'}
            >
              <td>
                <div className="flex justify-between p-2">
                  <Link href={`static/${d.id}`}>
                    <a className="flex justify-between ">
                      <div className="underline cursor-pointer">{d.name}</div>
                    </a>
                  </Link>
                  <div className="flex flex-wrap">
                    <button
                      onClick={() => setCat(d)}
                      className="mx-1 bg-white rounded text-primary-500 hover:bg-secondary-900 hover:text-white"
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
                    <button
                      onClick={() => onDelete(d.id)}
                      className="mx-1 bg-white rounded text-primary-500 hover:bg-error-900 hover:text-white"
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
                  </div>
                </div>
              </td>
              <td>{d?.type}</td>
              <td>
                <div className="flex flex-wrap">
                  {d?.colors?.map((c: string, i: number) => (
                    <div className="mx-1" key={`${i}-${c}`}>
                      <CatColor color={c} />
                    </div>
                  ))}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientSide;
