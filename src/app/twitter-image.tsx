import { Logo } from "@/components/icons/Logo";
import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "VBuild - Open-source Visual UI Builder";
export const size = {
	width: 1200,
	height: 675,
};

export const contentType = "image/png";

export default async function Image() {
	return new ImageResponse(
		<div
			style={{
				background: "linear-gradient(to bottom right, #1a1a1a, #2a2a2a)",
				width: "100%",
				height: "100%",
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "48px",
				fontFamily: "Inter",
				color: "white",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
				<Logo
					style={{
						width: "200px",
						height: "200px",
						fill: "white",
						marginRight: "1rem",
					}}
				/>
				<h1 style={{ fontSize: "135px", margin: "0", fontWeight: "bold" }}>
					VBuild
				</h1>
			</div>
			<div
				style={{
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
					gap: "16px",
					marginBottom: "30px",
				}}
			>
				<p
					style={{
						fontSize: "36px",
						textAlign: "center",
						margin: "0",
					}}
				>
					Open-source Visual UI Builder for React
				</p>
				<p
					style={{
						fontSize: "36px",
						textAlign: "center",
						margin: "0",
					}}
				>
					Design and export components you own
				</p>
			</div>
			<div
				style={{
					display: "flex",
					justifyContent: "space-between",
					width: "90%",
					marginBottom: "30px",
				}}
			>
				<Feature icon="🎨" text="Craft beautiful UI with pre-built components" />
				<Feature icon="🛠️" text="Tailwind + shadcn/ui first" />
				<Feature icon="⚡" text="Export components as Code" />
			</div>
		</div>,
		{
			...size,
		},
	);
}

function Feature({ icon, text }: { icon: string; text: string }) {
	return (
		<div
			style={{
				display: "flex",
				flexDirection: "column",
				alignItems: "center",
				gap: "16px",
				backgroundColor: "rgba(255, 255, 255, 0.1)",
				padding: "24px",
				borderRadius: "12px",
				width: "30%",
			}}
		>
			<span style={{ fontSize: "48px" }}>{icon}</span>
			<span
				style={{ fontSize: "24px", textAlign: "center", fontWeight: "500" }}
			>
				{text}
			</span>
		</div>
	);
}
