import type { Metadata } from "next";
import { Header } from "@/components/site/Header";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://klrbuild.com"),
  title: {
    default: "KLR Build | Design-Build Outdoor Living in Oceanside, CA",
    template: "%s | KLR Build",
  },
  description:
    "KLR Build LLC is a family-owned design-build contractor in Oceanside, CA creating patios, hardscape, pools, turf and planting, fire features, and four-season rooms across San Diego County.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Header />
        {children}
      </body>
    </html>
  );
}
