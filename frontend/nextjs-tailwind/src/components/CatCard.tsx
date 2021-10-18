import { Cat } from '@/models/cat.model';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { doc } from '@firebase/firestore';
import CatColor from './CatColor';

const CatCard = ({ servercat }: { servercat: Cat }): JSX.Element => {
  const firestore = useFirestore();
  const catsRef = doc(firestore, `cats/${servercat.id}`);

  const { data: cat, status } = useFirestoreDocData(catsRef, {
    idField: 'id',
    initialData: servercat,
  });

  return (
    <>
      <div className="p-2 m-4 rounded bg-primary-500 text-basics-50">
        {cat.name ? (
          <>
            <h2>Name: {cat?.name}</h2>
            {cat.type && <p>Type: {cat?.type}</p>}
            {cat.colors && (
              <>
                <p className="text-xl text-center">Colors</p>
                <hr className="mb-1"></hr>
                <ul className="flex flex-wrap max-w-lg p-2 m-auto rounded bg-secondary-500 justify-items-center">
                  {cat?.colors?.map((color: any) => (
                    <li key={color} className="m-1">
                      <CatColor color={color} />
                    </li>
                  ))}
                </ul>
              </>
            )}
          </>
        ) : (
          <>You Should really name your cat!</>
        )}
      </div>
    </>
  );
};

export default CatCard;
