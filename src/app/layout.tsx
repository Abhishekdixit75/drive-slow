import type { Metadata } from "next";
import { Inter, Bebas_Neue, Great_Vibes } from "next/font/google";
import "./globals.css";
import CustomCursor from "@/components/CustomCursor";
import Providers from "@/components/Providers";

const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const bebasNeue = Bebas_Neue({ 
  weight: "400",
  subsets: ["latin"], 
  variable: '--font-bebas-neue' 
});

const greatVibes = Great_Vibes({
  weight: "400",
  subsets: ["latin"],
  variable: '--font-great-vibes'
});

export const metadata: Metadata = {
  title: "DRIVESLOW | Lofi Radio",
  description: "Lofi radio for late nights. Slow drives. Soft vibes. 24/7 streaming to calm your mind.",
  keywords: ["lofi", "radio", "music", "late night", "study beats", "chillhop", "driveslow"],
  authors: [{ name: "DriveSlow Team" }],
  openGraph: {
    title: "DRIVESLOW | Lofi Radio",
    description: "Lofi radio for late nights. Slow drives. Soft vibes.",
    url: "https://driveslow.app", // Example URL
    siteName: "DriveSlow",
    images: [
      {
        url: "/bg.png",
        width: 1200,
        height: 630,
        alt: "DriveSlow Lofi Radio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "DRIVESLOW | Lofi Radio",
    description: "Lofi radio for late nights. Slow drives. Soft vibes.",
    images: ["/bg.png"],
  },
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1, // Prevents zooming on mobile which breaks app-like feel
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${bebasNeue.variable} ${greatVibes.variable} font-sans antialiased bg-black text-white`}>
        <CustomCursor />
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
