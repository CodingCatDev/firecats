import { useForm, useWatch } from 'react-hook-form';
import toast, { Toaster } from 'react-hot-toast';

import { UserInfo } from 'firebase/auth';
import {
  addDoc,
  collection,
  doc,
  DocumentData,
  Query,
  setDoc,
  Timestamp,
} from 'firebase/firestore';
import { useFirestore } from 'reactfire';
import { colors } from '@/utils/css';
import { Cat } from '@/models/cat.model';
import { Dispatch, SetStateAction, useEffect } from 'react';
export default function CatForm({
  user,
  cat,
  setCat,
  update,
  q,
}: {
  user: UserInfo;
  cat?: Cat;
  setCat?: Dispatch<SetStateAction<Cat | null>>;
  update: ((query?: Query<DocumentData> | undefined) => void) | undefined;
  q: Query<Cat>;
}) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm();
  const firestore = useFirestore();

  useEffect(() => {
    if (!cat) {
      return;
    }
    setValue('name', cat.name);
    setValue('type', cat.type);
    setValue('colors', cat.colors);
  }, [cat]);

  const onCancel = () => {
    if (setCat) {
      toast.success('Cancelled Edit');
      setCat(null);
    }
  };

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
    if (update) update(q);
    reset({ name: '', type: '', colors: [] });
    toast.success('Cat Added successfully!');
  };

  const updateCat = async ({
    name,
    type,
    colors,
  }: {
    name: string;
    type: string;
    colors: [string];
  }) => {
    if (!cat || !cat.id) {
      toast.success('Cat Missing, look in the trees!');
      return;
    }
    await setDoc(
      doc(firestore, 'cats', cat.id),
      {
        name,
        type,
        colors,
      },
      { merge: true }
    );

    if (setCat) {
      toast.success('Cat Updated Successfully!');
      setCat(null);
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(cat ? updateCat : addCat)}
        className="flex justify-between w-full"
      >
        <div className="flex flex-wrap space-x-2">
          <div className="flex flex-col">
            <input
              {...register('name', { required: true })}
              placeholder="Cat's Name"
              type="text"
            />
            {errors.name?.type === 'required' && (
              <div className="text-error-900">Name is required</div>
            )}
          </div>
          <div className="flex flex-col">
            <input
              {...register('type', { required: true })}
              placeholder="Cat Type"
              type="text"
            />
            {errors.type?.type === 'required' && (
              <div className="text-error-900">Type is required</div>
            )}
          </div>
          <div className="flex flex-col">
            <select
              {...register('colors', { required: true })}
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
        </div>
        {cat && (
          <button
            className="btn-secondary"
            onClick={onCancel}
            disabled={Object.keys(errors).length > 0 ? true : false}
          >
            Cancel
          </button>
        )}
        <button
          type="submit"
          className="btn-primary"
          disabled={Object.keys(errors).length > 0 ? true : false}
        >
          {cat ? 'Update' : 'Submit'}
        </button>
      </form>
      <Toaster position="bottom-center" reverseOrder={false} />
    </>
  );
}
