import NavLinks from '@/layout/NavLinks';
import dynamic from 'next/dynamic';

const UserMenu = dynamic(() => import('@/components/UserMenu'), {
  ssr: false,
});
export const AppTopbar = (): JSX.Element => {
  return (
    <header className="flex justify-start w-full h-20 p-4 lg:px-0 lg:mx-auto lg:w-80 lg:max-w-8xl">
      <NavLinks />
      <UserMenu />
    </header>
  );
};
