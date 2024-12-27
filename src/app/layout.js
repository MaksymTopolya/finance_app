import { Geist, Geist_Mono } from "next/font/google";
import useServerDarkMode from "@/hooks/useServerDarkMode";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: {
    template: "%s | Expense Tracker",
    default: "Expense Tracker",
  },
};

export default function RootLayout({ children }) {
  const theme = useServerDarkMode("dark");

  return (
    <html lang="en" className={theme}>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col px-8`}
      >
        {children}
      </body>
    </html>
  );
}
