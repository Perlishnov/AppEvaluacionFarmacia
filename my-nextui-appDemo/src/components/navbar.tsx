import { Button } from "@nextui-org/button";
import { Link } from "@nextui-org/link";
import {
  Navbar as NextUINavbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
} from "@nextui-org/navbar";
import { GithubIcon } from "@/components/icons";

const scrollToSection = (id) => {
  const section = document.getElementById(id);
  if (section) {
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export const Navbar = () => {
  return (
    <NextUINavbar maxWidth="xl" position="sticky">
      {/* Brand and Logo */}
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-2 max-w-fit">
          <Link
            className="flex justify-start items-center gap-2"
            color="foreground"
            href="/"
          >
            {/* Logo */}
            <img
              src="/Logo.png"
              alt="Logo"
              className="h-8 w-auto" // Adjust the size here
            />
          </Link>
        </NavbarBrand>
        {/* Navigation Links */}
        <div className="hidden lg:flex gap-4 justify-start ml-4">
          <NavbarItem>
            <Link
              href="#hero"
              onClick={() => scrollToSection("hero")}
              className="text-sm font-medium text-gray-700 hover:text-[#4E5BA6] transition-colors"
            >
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="#features"
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium text-gray-700 hover:text-[#4E5BA6] transition-colors"
            >
              Funcionalidades
            </Link>
          </NavbarItem>
          <NavbarItem>
            <button
              onClick={() => scrollToSection("benefits")}
              className="text-sm font-medium text-gray-700 hover:text-[#4E5BA6] transition-colors"
            >
              Beneficios
            </button>
          </NavbarItem>
          <NavbarItem>
            <Link
              href="#opinions"
              onClick={() => scrollToSection("opinions")}
              className="text-sm font-medium text-gray-700 hover:text-[#4E5BA6] transition-colors"
            >
              Opiniones
            </Link>
          </NavbarItem>
        </div>
      </NavbarContent>

      {/* Buttons */}
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        <NavbarItem>
          <Link
            isExternal
            href="https://github.com/Perlishnov/AppEvaluacionFarmacia"
            title="GitHub"
          >
            <GithubIcon className="text-default-500 hover:text-black transition-all" />
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/register"
            size="sm"
            className="px-6 py-2 text-sm font-semibold bg-[#4E5BA6] text-white rounded-full shadow-md transition-all duration-200 transform hover:scale-105 hover:bg-[#3A4784] hover:shadow-lg"
          >
            Registrarse
          </Button>
        </NavbarItem>
        <NavbarItem>
          <Button
            as={Link}
            href="/login"
            size="sm"
            className="px-6 py-2 text-sm font-semibold bg-[#C8CCE5] text-gray-700 hover:text-white rounded-full shadow-md transition-all duration-200 transform hover:scale-105 hover:bg-[#4E5BA6] hover:shadow-lg"
          >
            Iniciar Sesion
          </Button>
        </NavbarItem>
      </NavbarContent>
    </NextUINavbar>
  );
};
