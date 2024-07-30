import type { Config } from "tailwindcss";

const config = {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px",
			},
		},
		extend: {
			colors: {
				border: "hsl(var(--border))",
				input: "hsl(var(--input))",
				ring: "hsl(var(--ring))",
				background: "hsl(var(--background))",
				foreground: "hsl(var(--foreground))",
				primary: {
					DEFAULT: "hsl(var(--primary))",
					foreground: "hsl(var(--primary-foreground))",
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive))",
					foreground: "hsl(var(--destructive-foreground))",
				},
				muted: {
					DEFAULT: "hsl(var(--muted))",
					foreground: "hsl(var(--muted-foreground))",
				},
				accent: {
					DEFAULT: "hsl(var(--accent))",
					foreground: "hsl(var(--accent-foreground))",
				},
				popover: {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				card: {
					DEFAULT: "hsl(var(--card))",
					foreground: "hsl(var(--card-foreground))",
				},

				//
				"border-editor": "hsl(var(--border-editor))",
				"input-editor": "hsl(var(--input-editor))",
				"ring-editor": "hsl(var(--ring-editor))",
				"background-editor": "hsl(var(--background-editor))",
				"foreground-editor": "hsl(var(--foreground-editor))",
				"primary-editor": {
					DEFAULT: "hsl(var(--primary-editor))",
					foreground: "hsl(var(--primary-foreground-editor))",
				},
				"secondary-editor": {
					DEFAULT: "hsl(var(--secondary-editor))",
					foreground: "hsl(var(--secondary-foreground))",
				},
				"destructive-editor": {
					DEFAULT: "hsl(var(--destructive-editor))",
					foreground: "hsl(var(--destructive-foreground-editor))",
				},
				"muted-editor": {
					DEFAULT: "hsl(var(--muted-editor))",
					foreground: "hsl(var(--muted-foreground-editor))",
				},
				"accent-editor": {
					DEFAULT: "hsl(var(--accent-editor))",
					foreground: "hsl(var(--accent-foreground-editor))",
				},
				"popover-editor": {
					DEFAULT: "hsl(var(--popover))",
					foreground: "hsl(var(--popover-foreground))",
				},
				"card-editor": {
					DEFAULT: "hsl(var(--card-editor))",
					foreground: "hsl(var(--card-foreground-editor))",
				},
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)",
				"lg-editor": "var(--radius-editor)",
				"md-editor": "calc(var(--radius-editor) - 2px)",
				"sm-editor": "calc(var(--radius-editor) - 4px)",
			},
			keyframes: {
				"accordion-down": {
					from: { height: "0" },
					to: { height: "var(--radix-accordion-content-height)" },
				},
				"accordion-up": {
					from: { height: "var(--radix-accordion-content-height)" },
					to: { height: "0" },
				},
			},
			animation: {
				"accordion-down": "accordion-down 0.2s ease-out",
				"accordion-up": "accordion-up 0.2s ease-out",
			},
		},
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
