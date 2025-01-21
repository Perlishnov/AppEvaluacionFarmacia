import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { TwitterIcon, GithubIcon } from "@/components/icons";
import { Logo } from "@/components/icons";

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Logo y enlaces iniciales */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <Link
            className="flex justify-start items-center gap-1"
            color="foreground"
            href="/"
          >
            <Logo />
            <p className="font-bold text-inherit">ACME</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      {/* Iconos y botones al final */}
      <NavbarContent className="hidden sm:flex basis-1/5 sm:basis-full" justify="end">
        <NavbarItem className="hidden sm:flex gap-2">
          <Link
            isExternal
            href="https://github.com/Perlishnov/AppEvaluacionFarmacia"
            title="GitHub"
          >
            <GithubIcon className="text-default-500" />
          </Link>
          <Link isExternal href="https://twitter.com" title="Twitter">
            <TwitterIcon className="text-default-500" />
          </Link>
        </NavbarItem>
        <NavbarItem className="flex gap-4">
          <Button
            as={Link}
            href="/register"
            size="sm"
            color="primary"
            className="bg-blue-600 text-white hover:bg-blue-700 x-6 py-2 text-sm font-semibold rounded-full shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            Registrarse
          </Button>
          <Button
            as={Link}
            href="/login"
            size="sm"
            color="secondary"
            className="bg-gray-600 text-white hover:bg-gray-700x-6 py-2 text-sm font-semibold rounded-full shadow-md transition-all duration-200 transform hover:scale-105 hover:shadow-lg"
          >
            Logearse
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
