import Link from 'next/link';

const NavLinks = () => {
  return (
    <nav className="flex flex-1 justify-start">
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
    </nav>
  );
};

export default NavLinks;
