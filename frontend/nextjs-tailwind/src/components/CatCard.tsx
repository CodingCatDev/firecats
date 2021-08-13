import 'firebase/firestore';
import { Cat } from '@/models/cat.model';

const CatCard = ({ cat }: { cat: Cat }): JSX.Element => {
  return (
    <>
      <div className="rounded p-2 bg-primary-500 text-basics-50">
        <h2>Name: {cat.name}</h2>
        <p>Name: {cat.type}</p>
        <ul className="grid grid-flow-col bg-secondary-500 rounded p-2 justify-items-center">
          {cat.colors.map((color) => (
            <li key={color} className="bg-secondary-400 rounded p-1">
              {color}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CatCard;
