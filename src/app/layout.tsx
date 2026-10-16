import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { ToastProvider } from "@/components/toast-provider";
import { TrackerProvider } from "@/components/tracker-provider";
import { applyThemeScript } from "@/lib/theme-script";
import { APP_NAME, SITE_URL } from "@/lib/constants";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
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
  applicationName: APP_NAME,
  authors: [{ name: "Safwan Qureshi" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: APP_NAME,
    title: APP_NAME,
    description:
      "Discover scholarships, internships, and free courses for Pakistani students. Save opportunities, check eligibility, and track your applications — all in one place.",
    url: SITE_URL,
  },
  twitter: {
    card: "summary",
    title: APP_NAME,
    description:
      "Discover scholarships, internships, and free courses for Pakistani students — with an eligibility checker and application tracker.",
  },
  robots: { index: true, follow: true },
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
