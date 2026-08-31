import Image from "next/image";
import Link from "next/link";

const links = [
  ["Home", "#home"],
  ["Services", "#services"],
  ["Value", "#value"],
  ["Process", "#process"],
  ["Contact", "#contact"],
] as const;

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-surface-page border-b border-border-default">
      <div className="max-w-site mx-auto flex items-center justify-between px-6 py-3.5">
        <Link href="#home" aria-label="KLR Build LLC — home">
          <Image
            src="/klr-logo.png"
            alt="KLR Build LLC — Designed with intent. Built to endure."
            width={113}
            height={44}
            priority
          />
        </Link>
        <nav aria-label="Primary" className="flex gap-7">
          {links.map(([label, href]) => (
            <a
              key={label}
              href={href}
              className="font-label text-[0.875rem] font-semibold tracking-wide uppercase text-text-secondary no-underline pb-1 border-b-2 border-transparent transition-colors hover:text-navy"
            >
              {label}
            </a>
          ))}
        </nav>
      </div>
    </header>
  );
}
