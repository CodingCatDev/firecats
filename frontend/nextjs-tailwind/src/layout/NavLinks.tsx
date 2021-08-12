import Link from 'next/link';

const NavLinks = () => {
  return (
    <nav className="flex flex-1 justify-start">
      <Link href="/">
        <a>
          <div className="flex items-center content-center flex-shrink-0 h-full underline pr-2">
            <h2 className="hidden text-2xl lg:block">Home</h2>
          </div>
        </a>
      </Link>
      <Link href="/clientside">
        <a>
          <div className="flex items-center content-center flex-shrink-0 h-full underline">
            <h2 className="hidden text-2xl lg:block">Cats</h2>
          </div>
        </a>
      </Link>
    </nav>
  );
};

export default NavLinks;
