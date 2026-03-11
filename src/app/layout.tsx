import type { Metadata } from "next";
import "./globals.css";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: {
    default: "Tennessee Custom Cabinets | Handcrafted Cabinetry in Middle Tennessee",
    template: "%s | Tennessee Custom Cabinets",
  },
  description:
    "Premium handcrafted custom cabinets serving Middle Tennessee, including Nashville, Franklin, Brentwood, Murfreesboro, and surrounding areas. Kitchen, bathroom, and built-in cabinetry built to last.",
  keywords: [
    "custom cabinets Tennessee",
    "custom cabinets Nashville",
    "custom cabinets Franklin TN",
    "custom cabinets Brentwood TN",
    "custom cabinets Murfreesboro",
    "handcrafted cabinetry Middle Tennessee",
    "kitchen cabinets Nashville",
    "bathroom cabinets Tennessee",
    "built-in cabinets Nashville",
    "custom woodwork Middle Tennessee",
  ],
  authors: [{ name: "Tennessee Custom Cabinets" }],
  creator: "Tennessee Custom Cabinets",
  metadataBase: new URL("https://tennesseecustomcabinets.com"),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Tennessee Custom Cabinets",
    title: "Tennessee Custom Cabinets | Handcrafted Cabinetry in Middle Tennessee",
    description:
      "Premium handcrafted custom cabinets serving Nashville, Franklin, Brentwood, Murfreesboro, and Middle Tennessee.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Tennessee Custom Cabinets | Handcrafted Cabinetry in Middle Tennessee",
    description:
      "Premium handcrafted custom cabinets serving Nashville, Franklin, Brentwood, Murfreesboro, and Middle Tennessee.",
  },
  icons: {
    icon: "/TN-custom-cabinets-logo.PNG",
    apple: "/TN-custom-cabinets-logo.PNG",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <Nav />
        {children}
        <Footer />
      </body>
    </html>
  );
}
