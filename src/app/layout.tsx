import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "VBuild",
  authors: [{ name: "Alwurts", url: "https://alwurts.com" }],
  description:
    "VBuild is an open-source visual UI builder that empowers developers to create stunning React applications with Tailwind CSS and Shadcn/UI components.",
  keywords: [
    "shadcn",
    "ui",
    "editor",
    "shadcn-ui",
    "shadcn-editor",
    "react",
    "React.js",
    "Vite",
    "nextjs",
    "Next.js",
    "visual",
    "visual-ui",
    "visual-editor",
    "visual-ui-builder",
    "visual-ui-editor",
    "tailwind",
    "tailwindcss",
    "tailwindui",
    "tailwindui-editor",
    "vbuild",
    "vbuild-ui",
    "vbuild-editor",
    "wysiwyg",
    "wysiwyg-editor",
    "wysiwyg-ui",
    "wysiwyg-builder",
    "wysiwyg-component-builder",
    "wysiwyg-component-editor",
    "wysiwyg-component-ui",
    "wysiwyg-component-builder",
    "wysiwyg-component-editor",
    "wysiwyg-component-ui",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="">
      <body className={inter.className}>
        {children}
        <Script
          defer
          src="https://umami.alwurts.com/script.js"
          data-website-id="30e492b4-4593-4c30-828d-dd88e8af6ca9"
        />
      </body>
    </html>
  );
}
