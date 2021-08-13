import Link from 'next/link';
import { useFirestore, useFirestoreCollectionData } from 'reactfire';
import 'firebase/firestore';

const ClientSide = (): JSX.Element => {
  // Access to Firestore Library
  const catsRef = useFirestore().collection('cats');

  const { data } = useFirestoreCollectionData(catsRef, { idField: 'id' });

  // easily check the loading status
  if (status === 'loading') {
    return <p>Fetching cats...</p>;
  }

  if (!data) {
    return <p>No cats yet!</p>;
  }

  return (
    <>
      <table className="table-auto">
        <thead>
          <tr>
            <th>id</th>
            <th>type</th>
            <th>name</th>
            <th>colors</th>
          </tr>
        </thead>
        <tbody>
          {data.map((d: any, i: number) => (
            <tr
              key={d.id}
              className={i % 2 === 0 ? 'bg-secondary-300' : 'bg-primary-300'}
            >
              <td>
                <Link href={`static/${d.id}`}>
                  <a className="underline cursor-pointer">{d.id}</a>
                </Link>
              </td>
              <td>{d.type}</td>
              <td>{d.name}</td>
              <td>
                <table>
                  <tbody>
                    {d.colors.map((c: any) => (
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
    </>
  );
};

export default ClientSide;
