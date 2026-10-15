import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ToastProvider } from "@/components/toast-provider";
import { TrackerProvider } from "@/components/tracker-provider";
import { applyThemeScript } from "@/lib/theme-script";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Student Opportunity Hub Pakistan",
    template: "%s | Student Opportunity Hub Pakistan",
  },
  description:
    "Discover scholarships, internships, and free courses for Pakistani students. Save opportunities, check eligibility, and track your applications — all in one place.",
  keywords: [
    "Pakistan scholarships",
    "student internships Pakistan",
    "free courses Pakistan",
    "HEC scholarships",
    "opportunities for Pakistani students",
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: applyThemeScript() }} />
      </head>
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <TrackerProvider>
          <ToastProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
          </ToastProvider>
        </TrackerProvider>
      </body>
    </html>
  );
}
