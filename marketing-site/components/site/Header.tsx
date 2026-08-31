import Image from "next/image";
import Link from "next/link";
import { NavLinks } from "@/components/site/NavLinks";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-surface-page border-b border-border-default">
      <div className="max-w-site mx-auto flex items-center justify-between gap-6 px-6 py-3.5">
        <Link href="/" aria-label="KLR Build LLC — home">
          <Image
            src="/klr-logo.png"
            alt="KLR Build LLC — Designed with intent. Built to endure."
            width={113}
            height={44}
            priority
          />
        </Link>
        <NavLinks />
      </div>
    </header>
  );
}
