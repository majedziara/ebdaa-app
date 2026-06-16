import Image from "next/image";
import Link from "next/link";
import { NavbarScroll } from "./navbar-scroll";
import NavLinks from "./NavLinks";
import MenuButton from "./MenuButton";

export default function Navbar() {
  return (
    <>
      <NavbarScroll />

      <div className="px-12 flex fixed w-screen backdrop-blur-xl navbar flex-col max-md:bg-background/80 max-md:border-b max-md:border-border max-md:py-1">
        <div className="flex flex-row justify-between items-center">
          <Link href="#home" className="logo h-20">
            <Image
              priority
              src="/logo.svg"
              alt="logo"
              height={50}
              width={100}
              className="h-full w-auto"
            />
          </Link>

          <div className="max-md:hidden flex-1 flex items-center justify-center gap-12">
            <NavLinks />
          </div>

          <div className="md:hidden flex items-center">
            <MenuButton />
          </div>
        </div>

        <div className="md:hidden mobile-navbar flex-col gap-5 items-center pb-4">
          <NavLinks />
        </div>
      </div>
    </>
  );
}
