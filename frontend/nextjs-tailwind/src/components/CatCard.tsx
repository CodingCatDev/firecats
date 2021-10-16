import { Cat } from '@/models/cat.model';
import { useFirestore, useFirestoreDocData } from 'reactfire';
import { FirebaseFirestoreProvider } from '@/components/firebase/wrappers';
import { doc } from '@firebase/firestore';

const CatCard = ({ servercat }: { servercat: Cat }): JSX.Element => {
  const firestore = useFirestore();
  const catsRef = doc(firestore, `cats/${servercat.id}`);

  const { data: cat, status } = useFirestoreDocData(catsRef, {
    idField: 'id',
    initialData: servercat,
  });

  const getColor = (color: string) => {
    const o: { backgroundColor: string; color?: string } = {
      backgroundColor: color,
    };
    if (color == 'white') {
      o.color = 'black';
    }
    return o;
  };
  console.log(cat);
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
                <ul className="grid max-w-md grid-flow-col p-2 m-auto rounded bg-secondary-500 justify-items-center">
                  {cat?.colors?.map((color: any) => (
                    <li
                      key={color}
                      className="p-1 rounded bg-secondary-400"
                      style={getColor(color)}
                    >
                      {color}
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
