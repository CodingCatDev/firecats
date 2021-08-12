import Link from 'next/link';
import NavLinks from '@/layout/NavLinks';

export const AppTopbar = (): JSX.Element => {
  return (
    <header className="flex justify-between w-full h-20 p-4 lg:px-0 lg:mx-auto lg:w-80 lg:max-w-8xl">
      Header
      <Link href="/">
        <a>
          <div className="flex items-center content-center flex-shrink-0 h-full">
            <h2 className="hidden text-2xl lg:block">
              {/* TODO: Add Title */}
              Home
            </h2>
          </div>
        </a>
      </Link>
      <NavLinks />
    </header>
  );
};
