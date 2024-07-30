import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "shadcn/ui editor",
	description: "Editor for quickly customizing shadcn/ui components",
	keywords: [
		"shadcn",
		"ui",
		"editor",
		"shadcn-ui",
		"shadcn-editor",
		"react",
		"nextjs",
		"tailwind",
		"tailwindcss",
		"tailwindui",
		"tailwindui-editor",
	],
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en">
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
