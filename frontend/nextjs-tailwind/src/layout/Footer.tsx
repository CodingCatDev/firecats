import Mail from '@/components/global/icons/socials/Mail';
import Facebook from '@/components/global/icons/socials/Facebook';
import GitHub from '@/components/global/icons/socials/GitHub';
import LinkedIn from '@/components/global/icons/socials/LinkedIn';
import Medium from '@/components/global/icons/socials/Medium';
import Twitter from '@/components/global/icons/socials/Twitter';
import YouTube from '@/components/global/icons/socials/YouTube';
import Link from 'next/link';
import { Site, SocialLink, SocialType } from '@/models/site.model';

interface MyColors extends TailwindColorConfig {
  readonly primary: TailwindColorGroup;
  readonly secondary: TailwindColorGroup;
}
interface MyConfig extends TailwindConfig {
  theme: {
    colors: MyColors;
  };
}
import resolveConfig from 'tailwindcss/resolveConfig';
import tailwindConfig from '../../tailwind.config';
import {
  TailwindColorConfig,
  TailwindColorGroup,
  TailwindConfig,
} from 'tailwindcss/tailwind-config';
const fullConfig = resolveConfig(tailwindConfig as MyConfig) as MyConfig;

export default function Footer({
  site,
}: {
  site: Site | null;
  hideWave?: boolean;
}): JSX.Element {
  function socialLinkPicker(sl: SocialLink) {
    switch (sl.type) {
      case SocialType.facebook:
        return <Facebook fill={fullConfig?.theme?.colors?.primary[500]} />;
      case SocialType.github:
        return <GitHub fill={fullConfig?.theme?.colors?.primary[500]} />;
      case SocialType.linkedin:
        return <LinkedIn fill={fullConfig?.theme?.colors?.primary[500]} />;
      case SocialType.mail:
        return <Mail fill={fullConfig?.theme?.colors?.primary[500]} />;
      case SocialType.medium:
        return <Medium fill={fullConfig?.theme?.colors?.primary[500]} />;
      case SocialType.twitter:
        return <Twitter fill={fullConfig?.theme?.colors?.primary[500]} />;
      case SocialType.youtube:
        return <YouTube fill={fullConfig?.theme?.colors?.primary[500]} />;
    }
  }

  return (
    <>
      <footer className="px-4 pt-10 pb-4 bg-purple-900 rounded-b-lg lg:grid-cols-2 lg:px-10 text-basics-900 bg-secondary-500">
        <div className="flex justify-between">
          {/* LOGO & COPYRIGHT */}
          <section className="grid grid-cols-1 justify-items-start">
            <div className="flex">
              <section className="grid">
                <div className="grid ">
                  <h4 className="text-2xl leading-tight sm:text-4xl">
                    {site?.title}
                  </h4>
                  <p className="text-xl font-bold">{site?.slogan}</p>
                  <p className="w-full text-sm font-light leading-5">
                    and developed by{' '}
                    <a
                      href="https://alexpatterson.dev/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="links-secondary"
                    >
                      Alex Patterson
                    </a>
                    .
                  </p>
                </div>
              </section>
            </div>
            {/* SOCIALS */}
            <section className="flex flex-wrap items-end justify-center gap-8 mt-4">
              {site?.socialLinks?.map((sl, i) => (
                <a
                  key={i}
                  href={sl.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  className={`social-links`}
                >
                  {socialLinkPicker(sl)}
                </a>
              ))}
            </section>
          </section>
          {/* HELPFUL LINKS */}
          <section className="flex flex-col">
            <h4 className="text-3xl">Links</h4>
            <div className="grid w-64 grid-cols-2 gap-4">
              {site?.pageLinks?.map((pageLink, i) => (
                <div key={`helpful-link-${i}`}>
                  {pageLink.slug.includes('://') ||
                  pageLink.slug.includes('mailto') ? (
                    <a
                      href={pageLink.slug}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="links-secondary"
                    >
                      {pageLink.title}
                    </a>
                  ) : (
                    <Link href={pageLink.slug}>
                      <a href={pageLink.slug} className="links-secondary">
                        {pageLink.title}
                      </a>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </section>
        </div>
        <p className="mt-10 text-sm font-light leading-5 text-center">
          Copyright &#169; {new Date().getFullYear()} CodingCatDev, LLC.
          <br />
          All Rights Reserved
        </p>
      </footer>
      <style jsx>{`
        .social-links:hover {
          filter: brightness(1.2);
        }
      `}</style>
    </>
  );
}
