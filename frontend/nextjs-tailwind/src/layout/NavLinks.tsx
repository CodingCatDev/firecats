import Link from 'next/link';

const NavLinks = () => {
  return (
    <nav className="flex justify-start">
      <NavButton href="/" text="Home" />
      <NavButton href="/clientside" text="Cats" />
    </nav>
  );
};

export default NavLinks;

const NavButton = ({ href, text }: { href: string; text: string }) => {
  return (
    <Link href={href}>
      <a className="px-2 mr-2 rounded bg-primary-900 text-basics-50 hover:bg-secondary-900">
        <div className="flex items-center content-center flex-shrink-0 h-full">
          <h2 className="text-2xl lg:block text-pr">{text}</h2>
        </div>
      </a>
    </Link>
  );
};
