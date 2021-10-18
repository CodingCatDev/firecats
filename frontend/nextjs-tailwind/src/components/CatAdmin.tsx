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
import usePaginatedCollection from '@/hooks/usePaginatedCollection';
import CatFormInput from '@/components/CatFormInput';
import { Cat } from '@/models/cat.model';
import CatColor from './CatColor';
import { useEffect, useState } from 'react';
import DeleteConfirmDialog from '@/components/global/DeleteConfirmDialog';

const ClientSide = (): JSX.Element => {
  // Access to Firestore Library
  const firestore = useFirestore();
  const { data: user } = useUser();
  const catsRef = collection(firestore, 'cats') as CollectionReference<Cat>;
  const [cat, setCat] = useState<Cat | null>(null);

  const {
    status,
    data: snapshot,
    prevDisabled,
    nextDisabled,
    prev,
    next,
    cursor,
    update,
    limit,
    loading,
    page,
  } = usePaginatedCollection({
    query: query<Cat>(catsRef),
    limit: 10,
    orderBy: { field: 'name', direction: 'asc' },
  });

  const [cats, setCats] = useState<Cat[] | undefined>();

  useEffect(() => {
    setCats(
      snapshot?.docs?.map((d) => {
        return {
          ...d.data(),
          id: d.id,
        };
      })
    );
  }, [snapshot]);

  const [isOpen, setIsOpen] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [deleteText, setDeleteText] = useState('');
  const [deleteCat, setDeleteCat] = useState<Cat>();
  const onDelete = async (cat: Cat) => {
    if (!cat || !cat.id) {
      return;
    }
    setIsOpen(true);
    setIsDeleted(false);
    setDeleteText(`Cat Name: ${cat.name}, of type: ${cat.type}`);
    setDeleteCat(cat);
  };

  useEffect(() => {
    if (isDeleted && deleteCat && deleteCat.id) {
      deleteDoc(doc(firestore, 'cats', deleteCat.id));
    }
  }, [deleteCat, firestore, isDeleted]);

  // easily check the loading status
  if (status === 'loading') {
    return <p>Fetching cats...</p>;
  }

  if (!cats) {
    return <p>No cats yet!</p>;
  }

  return (
    <>
      <DeleteConfirmDialog
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setIsDeleted={setIsDeleted}
        text={deleteText}
      />
      <div className="flex flex-wrap p-6">
        {user && !cat && <CatFormInput user={user} />}
        {user && cat && <CatFormInput user={user} cat={cat} setCat={setCat} />}
        <table className="w-full mt-4 table-auto">
          <thead>
            <tr className="bg-secondary-300">
              <th className="p-2 text-left uppercase">name</th>
              <th className="text-left uppercase">type</th>
              <th className="text-left uppercase">colors</th>
              <th className="text-left uppercase"></th>
            </tr>
          </thead>
          <tbody>
            {cats.map((d: any, i: number) => (
              <tr
                key={d.id}
                className={
                  i % 2 === 0
                    ? 'bg-primary-400 text-white'
                    : 'bg-primary-500 text-white'
                }
              >
                <td>
                  <div className="flex justify-between p-2">
                    <Link href={`static/${d.id}`}>
                      <a className="flex justify-between ">
                        <div className="underline cursor-pointer">{d.name}</div>
                      </a>
                    </Link>
                  </div>
                </td>
                <td>{d?.type}</td>
                <td>
                  <div className="flex flex-wrap max-w-lg">
                    {d?.colors?.map((c: string, i: number) => (
                      <div className="m-1" key={`${i}-${c}`}>
                        <CatColor color={c} />
                      </div>
                    ))}
                  </div>
                </td>
                <td>
                  <div className="flex">
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
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => onDelete(d)}
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
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ClientSide;
