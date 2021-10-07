import { Cat } from '@/models/cat.model';

const CatCard = ({ cat }: { cat: Cat }): JSX.Element => {
  return (
    <>
      <div className="p-2 rounded bg-primary-500 text-basics-50">
        <h2>Name: {cat.name}</h2>
        <p>Name: {cat.type}</p>
        <ul className="grid grid-flow-col p-2 rounded bg-secondary-500 justify-items-center">
          {cat.colors.map((color) => (
            <li key={color} className="p-1 rounded bg-secondary-400">
              {color}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CatCard;
