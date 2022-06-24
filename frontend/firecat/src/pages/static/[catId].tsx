import { Cat } from '@/models/cat.model';
import CatCard from '@/components/CatCard';
// Serverside only
import { catById, getCats } from '@/services/serversideApi';

const Cats = ({ cat }: { cat: Cat }): JSX.Element => {
  return <CatCard servercat={cat} />;
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
  if (cat?.createdAt) {
    cat.createdDate = cat.createdAt.toDate().toDateString();
    delete cat.createdAt;
  }
  if (!cat) {
    return {
      notFound: true,
    };
  }
  console.log('Static Data', cat);

  return {
    props: {
      cat,
    },
  };
}
