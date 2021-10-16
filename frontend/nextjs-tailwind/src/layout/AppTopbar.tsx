import NavLinks from '@/layout/NavLinks';
import dynamic from 'next/dynamic';

const UserMenu = dynamic(() => import('@/components/global/UserMenu'), {
  ssr: false,
});
export const AppTopbar = (): JSX.Element => {
  return (
    <header className="flex justify-between w-full h-20 p-4 rounded-t-lg lg:px-2 lg:mx-auto lg:w-80 lg:max-w-8xl bg-basics-50">
      <NavLinks />
      <UserMenu />
    </header>
  );
};
