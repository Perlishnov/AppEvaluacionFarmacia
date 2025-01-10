import { Link } from "@nextui-org/link";

import { Navbar } from "@/components/navbar";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex flex-col h-screen">
      <Navbar />
      <main className="container mx-auto max-w-7xl px-6 flex-grow pt-16">
        {children}
      </main>
      <footer className="w-full bg-gray-100 border-t border-gray-200 py-6">
      <div className="container mx-auto max-w-7xl px-6">
        {/* Sección de enlaces principales */}
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="mb-4 sm:mb-0">
            <Link
              href="/privacy-policy"
              className="text-sm text-gray-600 hover:text-primary"
            >
              Política de Privacidad
            </Link>
            <span className="mx-2 text-gray-400">|</span>
            <Link
              href="/terms-of-service"
              className="text-sm text-gray-600 hover:text-primary"
            >
              Términos de Servicio
            </Link>
          </div>

          {/* Redes Sociales */}
          <div className="flex space-x-4">
            <Link
              isExternal
              href="https://facebook.com"
              title="Facebook"
              className="text-gray-600 hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M22.675 0H1.325C.595 0 0 .594 0 1.325v21.351C0 23.406.594 24 1.325 24H12v-9.293H9.273V11.21H12V8.706c0-2.738 1.645-4.23 4.105-4.23 1.194 0 2.433.211 2.433.211v2.73h-1.371c-1.351 0-1.768.84-1.768 1.701v2.092h3.001l-.48 3.498H15.4V24h7.275C23.406 24 24 23.406 24 22.676V1.325C24 .594 23.406 0 22.675 0z" />
              </svg>
            </Link>
            <Link
              isExternal
              href="https://twitter.com"
              title="Twitter"
              className="text-gray-600 hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M24 4.557a9.83 9.83 0 01-2.828.775 4.932 4.932 0 002.165-2.723 9.864 9.864 0 01-3.127 1.195 4.916 4.916 0 00-8.38 4.482A13.957 13.957 0 011.671 3.15a4.918 4.918 0 001.523 6.573 4.903 4.903 0 01-2.229-.616c-.054 2.281 1.581 4.415 3.949 4.89a4.928 4.928 0 01-2.224.084 4.923 4.923 0 004.604 3.417 9.867 9.867 0 01-6.1 2.104c-.396 0-.788-.023-1.175-.067a13.945 13.945 0 007.557 2.212c9.056 0 14.01-7.507 14.01-14.01 0-.213-.005-.426-.014-.637A10.012 10.012 0 0024 4.557z" />
              </svg>
            </Link>
            <Link
              isExternal
              href="https://instagram.com"
              title="Instagram"
              className="text-gray-600 hover:text-primary"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="20"
                height="20"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.849.07 1.366.062 2.633.33 3.608 1.305.975.975 1.243 2.242 1.305 3.608.058 1.265.069 1.645.069 4.849s-.011 3.584-.069 4.849c-.062 1.366-.33 2.633-1.305 3.608-.975.975-2.242 1.243-3.608 1.305-1.265.058-1.645.069-4.849.069s-3.584-.011-4.849-.069c-1.366-.062-2.633-.33-3.608-1.305-.975-.975-1.243-2.242-1.305-3.608C2.175 15.646 2.163 15.266 2.163 12s.012-3.584.07-4.849c.062-1.366.33-2.633 1.305-3.608.975-.975 2.242-1.243 3.608-1.305C8.416 2.175 8.796 2.163 12 2.163zm0-2.163C8.687 0 8.248.013 7.067.072 5.879.131 4.726.392 3.803 1.316 2.879 2.239 2.618 3.392 2.559 4.581c-.059 1.181-.072 1.62-.072 4.939s.013 3.758.072 4.939c.059 1.189.32 2.342 1.243 3.265.923.923 2.076 1.184 3.265 1.243 1.181.059 1.62.072 4.939.072s3.758-.013 4.939-.072c1.189-.059 2.342-.32 3.265-1.243.923-.923 1.184-2.076 1.243-3.265.059-1.181.072-1.62.072-4.939s-.013-3.758-.072-4.939c-.059-1.189-.32-2.342-1.243-3.265-.923-.923-2.076-1.184-3.265-1.243C15.758.013 15.319 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zm0 10.162a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Powered By Section */}
        <div className="mt-6 flex justify-center items-center">
          <Link
            isExternal
            className="flex items-center gap-1 text-current"
            href="https://nextui-docs-v2.vercel.app?utm_source=next-pages-template"
            title="nextui.org homepage"
          >
            <span className="text-default-600">Powered by</span>
            <p className="text-primary">NextUI</p>
          </Link>
        </div>
      </div>
    </footer>
    </div>
  );
}
