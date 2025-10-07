import PortalDefaultLogo from "@/components/_shared/PortalDefaultLogo";
import { useTheme } from "@/components/theme/theme-provider";
import Image from "next/image";
import Link from "next/link";
import { RiFacebookFill, RiInstagramFill, RiLinkedinFill, RiTwitterXFill } from "react-icons/ri";

interface IconProps {
  className: string;
  "aria-hidden": boolean;
}

const LighterThemeFooter: React.FC = () => {
  const portalLogo =
    process?.env?.NEXT_PUBLIC_PORTAL_LOGO || "/images/logos/site-logo.svg";
  const navigation = {
    about: [
      { name: "About Lincolnshire Open Data", href: "/about" },
      { name: "Sign up to our newsletter", href: "https://www.lincolnshire.gov.uk/countycatchup", target: "_blank" },
    ],
    useful: [
      { name: "Organizations", href: "/organizations" },
      { name: "Groups", href: "/groups" },
      { name: "Login", href: "https://cloud.portaljs.com/auth/signin" },
    ],
    getStarted: [
      {
        name: "Find data",
        href: "/search",
      },

    ],
    social: [
      {
        name: "facebook",
        href: "https://en-gb.facebook.com/lincolnshirecc/",
        // eslint-disable-next-line
        icon: (props: IconProps) => (
          <RiFacebookFill {...props} />
        ),
      },
      {
        name: "x",
        href: "https://twitter.com/lincolnshirecc?lang=en",
        // eslint-disable-next-line
        icon: (props: IconProps) => (
          <RiTwitterXFill {...props} />
        ),
      },
      {
        name: "linkedin",
        href: "https://www.linkedin.com/company/lincolnshire-county-council",
        // eslint-disable-next-line
        icon: (props: IconProps) => (
          <RiLinkedinFill {...props} />
        ),
      },
      {
        name: "instagram",
        href: "https://www.instagram.com/lincolnshirecc",
        // eslint-disable-next-line
        icon: (props: IconProps) => (
          <RiInstagramFill {...props} />
        ),
      },
    ],
  };

  return (
    <footer className="bg-accent-50  mt-[155px]">
      <div
        className={`custom-container flex flex-col flex-wrap py-10 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap`}
      >
        <div className="justify-between w-full text-center md:text-left lg:flex">
          <div className="w-full lg:w-1/3 md:w-1/2">
            <h2 className="mt-4 mb-4 font-roboto font-black">INFO</h2>
            <ul className="space-y-4 text-sm list-none">
              {navigation.about.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-roboto font-normal hover:text-accent transition-all"
                    target={item.target ? item.target : "_self"}
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/3 md:w-1/2">
            <h2 className="mt-4 mb-4 font-roboto font-black">USEFUL LINKS</h2>
            <ul className="space-y-4 text-sm list-none">
              {navigation.useful.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-roboto font-normal hover:text-accent transition-all"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="w-full lg:w-1/3 md:w-1/2">
            <h2 className="mt-4 mb-4 font-roboto font-black">GET STARTED</h2>
            <ul className="space-y-4 text-sm list-none">
              {navigation.getStarted.map((item) => (
                <li key={item.name}>
                  <a
                    href={item.href}
                    className="font-roboto font-normal hover:text-accent transition-all"
                  >
                    {item.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="w-full md:w-1/2 flex flex-col justify-between text-center md:text-left">
          <h2 className="mt-4 mb-4 font-roboto font-black">
            STAY UP TO DATE WITH THE NEWS
          </h2>
          <div className="flex mt-5 space-x-5 justify-center md:justify-start">
            {navigation.social.map((item) => (
              <a
                key={item.name}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                className="transition-all hover:text-accent"
              >
                <span className="sr-only">{item.name}</span>
                <item.icon className="flex h-6 w-6" aria-hidden={true} />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div
        className={`custom-container flex flex-col justify-center flex-wrap py-6 mx-auto md:items-center lg:items-start md:flex-row md:flex-nowrap`}
      >
        <Link href="/" className="block mx-auto">
          <Image src={portalLogo} alt="logo" height={75} width={225} />
        </Link>
      </div>
    </footer>
  );
};

export default LighterThemeFooter;
