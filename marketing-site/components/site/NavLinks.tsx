"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  ["Home", "/"],
  ["Services", "/services"],
  ["Projects", "/projects"],
  ["Process", "/process"],
  ["About", "/about"],
  ["Contact", "/contact"],
] as const;

export function NavLinks() {
  const pathname = usePathname();
  return (
    <nav aria-label="Primary" className="flex flex-wrap justify-end gap-x-7 gap-y-1">
      {links.map(([label, href]) => {
        const active = href === "/" ? pathname === "/" : pathname.startsWith(href);
        return (
          <Link
            key={href}
            href={href}
            aria-current={active ? "page" : undefined}
            className={`font-label text-[0.875rem] font-semibold tracking-wide uppercase no-underline pb-1 border-b-2 transition-colors hover:text-navy ${
              active ? "text-navy border-tan" : "text-text-secondary border-transparent"
            }`}
          >
            {label}
          </Link>
        );
      })}
    </nav>
  );
}
