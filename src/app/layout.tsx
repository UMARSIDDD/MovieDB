import type { Metadata } from "next";
import Navbar from "../components/Navbar";
import "./globals.css";
import Providers from "../components/Providers";


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
