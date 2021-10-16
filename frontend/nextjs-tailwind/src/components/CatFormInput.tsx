import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

import { UserInfo } from 'firebase/auth';
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { colors } from '@/utils/css';
export default function CatForm({ user }: { user: UserInfo }) {
  const { register, handleSubmit, reset, watch } = useForm();
  const firestore = useFirestore();

  const addCat = async ({
    name,
    type,
    colors,
  }: {
    name: string;
    type: string;
    colors: [string];
  }) => {
    await addDoc(collection(firestore, 'cats'), {
      name,
      type,
      colors,
      createdAt: Timestamp.now(),
      createdBy: user.uid,
    });

    reset({ name, type, colors });

    toast.success('Post updated successfully!');
  };

  return (
    <form
      onSubmit={handleSubmit(addCat)}
      className="flex justify-between w-full"
    >
      <div className="flex flex-wrap space-x-2">
        <input {...register('name')} placeholder="Cat's Name" type="text" />
        <input {...register('type')} placeholder="Cat Type" type="text" />
        <select
          {...register('colors')}
          multiple
          className="px-4 py-2 text-base border rounded-md shadow-md appearance-none max-h-12 text-basics-900 dark:text-basics-900 placeholder-basics-500 dark:placeholder-basics-500 border-basics-200 bg-basics-50 dark:bg-basics-50 focus:outline-none focus:ring-2 focus:ring-secondary-600 focus:border-transparent"
        >
          {Object.keys(colors).map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      <input type="submit" className="btn-primary" />
    </form>
  );
}
