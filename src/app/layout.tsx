import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	metadataBase: new URL("https://vbuild.alwurts.com"),
	title: {
		default: "VBuild - Open-source Visual UI Builder",
		template: "%s | VBuild",
	},
	description:
		"VBuild is an open-source visual UI builder that empowers developers to create stunning React applications with Tailwind CSS and Shadcn/UI components.",
	authors: [{ name: "Alwurts", url: "https://alwurts.com" }],
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
	],
	openGraph: {
		type: "website",
		locale: "en_US",
		url: "https://vbuild.alwurts.com",
		siteName: "VBuild",
		title: "VBuild - Open-source Visual UI Builder",
		description:
			"Create stunning React applications with Tailwind CSS and Shadcn/UI components using VBuild's open-source visual UI builder.",
		images: [
			{
				url: "https://vbuild.alwurts.com/opengraph-image.png",
				width: 1200,
				height: 630,
				alt: "VBuild - Open-source Visual UI Builder",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "VBuild - Open-source Visual UI Builder",
		description:
			"Create stunning React applications with Tailwind CSS and Shadcn/UI components using VBuild's open-source visual UI builder.",
		images: ["https://vbuild.alwurts.com/twitter-image.png"],
		creator: "@alwurts",
	},
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
