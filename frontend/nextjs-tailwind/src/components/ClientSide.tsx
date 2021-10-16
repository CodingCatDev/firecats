import Link from 'next/link';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import { collection } from 'firebase/firestore';

const ClientSide = (): JSX.Element => {
  // Access to Firestore Library
  const firestore = useFirestore();
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
    <div className="p-6">
      <table className="w-full table-auto">
        <thead>
          <tr>
            <th className="text-left">id</th>
            <th className="text-left">type</th>
            <th className="text-left">name</th>
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
                  <a className="underline cursor-pointer">{d.id}</a>
                </Link>
              </td>
              <td>{d?.type}</td>
              <td>{d?.name}</td>
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
