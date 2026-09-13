import { IBM_Plex_Sans, Outfit } from "next/font/google";
import SiteShell from "@/components/layout/SiteShell";
import { site } from "@/lib/site";
import "./globals.css";

const sans = IBM_Plex_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

const display = Outfit({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
});

export const metadata = {
  title: {
    default: site.name,
    template: `%s | ${site.name}`,
  },
  description: site.description,
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${sans.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-background font-sans text-foreground">
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
