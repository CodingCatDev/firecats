import { useAuth, useUser } from 'reactfire';
import 'firebase/auth';
import useOutsideClick from '@/hooks/useOutsideClick';
import Image from 'next/image';
import { useRef, useState } from 'react';
import Link from 'next/link';

const UserMenu = (): JSX.Element => {
  const auth = useAuth();
  const { data: user } = useUser();
  const [show, setShow] = useState(false);
  const ref = useRef<any>();

  useOutsideClick(ref, () => {
    if (show) setShow(false);
  });

  return (
    <div className="flex">
      {user ? (
        <>
          <div
            className="relative w-8 h-8 cursor-pointer"
            onClick={() => setShow(!show)}
          >
            {user.photoURL ? (
              <Image
                loader={({ src }) => src}
                height={96}
                width={96}
                src={user.photoURL}
                alt={user.displayName ? user.displayName : 'A Good Description'}
                unoptimized={true}
                className="rounded"
              />
            ) : (
              <>Placeholder</>
            )}
            {show && (
              <div
                className="absolute right-0 flex flex-col p-1 border rounded-xl bg-basics-50 text-basics-900 min-w-max"
                ref={ref}
              >
                {user && <div>{user.displayName}</div>}
                <button className="btn-primary" onClick={() => auth.signOut()}>
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </>
      ) : (
        <Link href="/signin">
          <a className="btn-primary">Sign In</a>
        </Link>
      )}
    </div>
  );
};

export default UserMenu;
