import { Cat } from '@/models/cat.model';

const CatCard = ({ cat }: { cat: Cat }): JSX.Element => {
  return (
    <>
      <div className="p-2 rounded bg-primary-500 text-basics-50">
        {cat.name ? (
          <>
            <h2>Name: {cat?.name}</h2>
            {cat.type && <p>Type: {cat?.type}</p>}
            {cat.colors && (
              <ul className="grid grid-flow-col p-2 rounded bg-secondary-500 justify-items-center">
                {cat?.colors?.map((color) => (
                  <li key={color} className="p-1 rounded bg-secondary-400">
                    {color}
                  </li>
                ))}
              </ul>
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
