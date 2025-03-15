
import type { Metadata } from "next";
import { Exo_2 } from "next/font/google";
import { Geist } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/shared/header";
import { Footer } from "@/components/shared/footer";
import { ThemeProvider } from "next-themes";
import 'katex/dist/katex.min.css';

// Подключаем шрифт Nunito
const nunito = Exo_2({
  subsets: ['cyrillic'],
  variable: '--font-nunito',
  weight: ["300", "400", "500", "600", "700",],
});

// Подключаем локальный GeistSans (можно заменить на Google Fonts)
const geistSans = Geist({
  subsets: ['latin'],
  variable: '--font-geist-sans',
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
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
          themes={["light", "dark"]}
        >
          <div className="sticky top-0 z-50  backdrop-blur-md supports-[backdrop-filter]:bg-background/60"><Header /></div>
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

