
import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ThemeProvider } from "next-themes";

// Подключаем шрифт Nunito
const nunito = Nunito({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ['400', '500', '600', '700', '800', '900'],
});

// Подключаем локальный GeistSans (можно заменить на Google Fonts)
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  weight: ['400', '500', '600', '700', '800', '900'],
});

export const metadata: Metadata = {
  title: "Learn Math",
  description: "Documentation of math",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className={`${nunito.variable} ${geistSans.variable} antialiased font-auto min-h-screen flex flex-col`}>
          <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
          themes={["light", "dark", "system"]}
        >
        <Header />
        <main>
          {children}
        </main>
        <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}