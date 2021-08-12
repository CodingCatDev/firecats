import Layout from '@/layout/Layout';
import { Cat } from '@/models/cat.model';
import dynamic from 'next/dynamic';

// Serverside only
import { catById, getCats } from '@/services/serversideApi';

const Cats = ({ cat }: { cat: Cat }): JSX.Element => {
  return <Layout>{JSON.stringify(cat)}</Layout>;
};
export default Cats;

export async function getStaticPaths(): Promise<{
  paths: { params: { catId: string } }[];
  fallback: boolean;
}> {
  const paths: { params: { catId: string } }[] = [];
  const cats = await getCats();
  for (const cat of cats) {
    if (cat.id)
      paths.push({
        params: {
          catId: cat.id,
        },
      });
  }
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({
  params,
  preview,
}: {
  params: { catId: string };
  preview: boolean;
}): Promise<
  | {
      props: {
        cat: Cat | null;
      };
    }
  | { redirect: { destination: string; permanent: boolean } }
  | { notFound: boolean }
> {
  const cat = await catById(params.catId);
  if (!cat) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      cat,
    },
  };
}
