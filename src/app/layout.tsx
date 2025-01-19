import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import Providers from "../lib/Providers";
import "./globals.css";


export const metadata: Metadata = {
  title: "MovieDB - Your Movie Database",
  description: "Discover popular, top-rated, and upcoming movies",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" >
      <body>
        <Providers>
          <Navbar />
          {children}
        </Providers>
      </body>
    </html>
  );
}
