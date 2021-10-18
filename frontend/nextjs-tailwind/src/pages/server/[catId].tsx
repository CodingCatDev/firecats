import http from 'http';
import cookie from 'cookie';

import Layout from '@/layout/Layout';
import { catById, validateAdminUser } from '@/services/serversideApi';
import { Cat } from '@/models/cat.model';

export default function AdminDashboard({
  cat,
}: {
  cat: Cat | null;
}): JSX.Element {
  return (
    <>
      <p className="text-3xl text-primary-900">
        You have reached the super secret admin page that shows all of the cats
        data!
      </p>
      <p className="text-xl break-all">{JSON.stringify(cat)}</p>
    </>
  );
}

export async function getServerSideProps({
  params,
  req,
}: {
  params: { catId: string };
  req: http.IncomingMessage;
}): Promise<
  | {
      props: {
        cat: Cat | null;
      };
    }
  | { redirect: { destination: string; permanent: boolean } }
  | { notFound: boolean }
> {
  const cookies = cookie.parse(req.headers.cookie || '');
  const auth = cookies.auth;
  // Check for user authentication from cookie
  let validUser = true;
  if (auth) {
    const user = JSON.parse(auth) as {
      uid: string;
      email: string;
      token: string;
    };
    validUser = await validateAdminUser(user.token);
  } else {
    validUser = false;
  }

  if (!validUser) {
    console.log('User is not valid, or unauthenticated');

    return {
      redirect: {
        destination: `/?invaliduser=true`,
        permanent: false,
      },
    };
  }

  const cat = await catById(params.catId);

  if (!cat) {
    return {
      notFound: true,
    };
  }

  if (cat && cat?.createdAt) {
    cat.createdDate = cat.createdAt.toDate().toDateString();
    delete cat.createdAt;
  }

  return {
    props: {
      cat,
    },
  };
}
