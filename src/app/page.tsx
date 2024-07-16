"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Slider } from "@/components/ui/slider";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeDisplay } from "@/components/CodeDisplay";

import {
	textColorsOptions,
	fontSizesOptions,
	fontWeightsOptions,
	bgColorsOptions,
	borderColorsOptions,
	borderWidthsOptions,
	borderStylesOptions,
	roundedOptions,
	paddingXOptions,
	shadowOptions,
	opacityOptions,
	heightOptions,
	textToBgColor,
} from "@/lib/tailwindClasses";

export default function Home() {
	// Text
	const [buttonText, setButtonText] = useState("Hello world");
	const [textColor, setTextColor] = useState("text-white");
	const [fontSize, setFontSize] = useState("text-base");
	const [fontWeight, setFontWeight] = useState("font-normal");

	// Background
	const [bgColor, setBgColor] = useState("bg-black");

	// Border
	const [borderColor, setBorderColor] = useState("border-transparent");
	const [borderWidth, setBorderWidth] = useState("border");
	const [borderStyle, setBorderStyle] = useState("border-solid");
	const [rounded, setRounded] = useState("rounded");

	// Size
	const [paddingX, setPaddingX] = useState("px-4");
	const [height, setHeight] = useState("h-10");

	// Effects
	const [shadow, setShadow] = useState("shadow-none");
	const [opacity, setOpacity] = useState("opacity-100");

	// Group Visibility
	const [visibleGroups, setVisibleGroups] = useState({
		text: true,
		background: true,
		border: true,
		size: true,
		effects: true,
		hover: true,
	});

	const buttonClasses = cn(
		textColor,
		fontSize,
		fontWeight,
		bgColor,
		borderColor,
		borderWidth,
		borderStyle,
		rounded,
		paddingX,
		shadow,
		opacity,
		height,
	);

	const buttonCode = `import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90",
        destructive:
          "bg-destructive text-destructive-foreground hover:bg-destructive/90",
        outline:
          "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
        custom: "${textColor} ${fontSize} ${fontWeight} ${bgColor} ${borderColor} ${borderWidth} ${borderStyle} ${rounded} ${shadow} ${opacity}",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        custom: "${paddingX} ${height}",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }

// Usage:
<Button variant="custom" size="custom">${buttonText}</Button>`;

	const toggleGroup = (group: keyof typeof visibleGroups) => {
		setVisibleGroups((prev) => ({ ...prev, [group]: !prev[group] }));
	};

	return (
		<div className="w-full h-screen flex justify-center items-center p-6 bg-stone-300">
			<Card className="w-full max-w-7xl h-full flex gap-6">
				<div className="p-6 flex-1 flex items-center justify-center">
					<Button className={buttonClasses}>{buttonText}</Button>
				</div>
				<div className="p-6 border-l border-border w-7/12 space-y-6 overflow-y-auto">
					<Tabs defaultValue="toggles">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="toggles">Editor</TabsTrigger>
							<TabsTrigger value="code">Code</TabsTrigger>
						</TabsList>
						<TabsContent value="toggles">
							{/* Text Group */}
							<ToggleableGroup
								title="Text"
								isVisible={visibleGroups.text}
								onToggle={() => toggleGroup("text")}
							>
								<div className="space-y-4">
									<Label htmlFor="buttonText">Button Text</Label>
									<Input
										id="buttonText"
										value={buttonText}
										onChange={(e) => setButtonText(e.target.value)}
									/>
								</div>
								<SliderSelector
									label="Text Color"
									options={textColorsOptions}
									value={textColor}
									onChange={setTextColor}
									showColor
								/>
								<SliderSelector
									label="Font Size"
									options={fontSizesOptions}
									value={fontSize}
									onChange={setFontSize}
								/>
								<SliderSelector
									label="Font Weight"
									options={fontWeightsOptions}
									value={fontWeight}
									onChange={setFontWeight}
								/>
							</ToggleableGroup>

							{/* Background Group */}
							<ToggleableGroup
								title="Background"
								isVisible={visibleGroups.background}
								onToggle={() => toggleGroup("background")}
							>
								<SliderSelector
									label="Background Color"
									options={bgColorsOptions}
									value={bgColor}
									onChange={setBgColor}
									showColor
								/>
							</ToggleableGroup>

							{/* Border Group */}
							<ToggleableGroup
								title="Border"
								isVisible={visibleGroups.border}
								onToggle={() => toggleGroup("border")}
							>
								<SliderSelector
									label="Border Color"
									options={borderColorsOptions}
									value={borderColor}
									onChange={setBorderColor}
									showColor
								/>
								<SliderSelector
									label="Border Width"
									options={borderWidthsOptions}
									value={borderWidth}
									onChange={setBorderWidth}
								/>
								<SliderSelector
									label="Border Style"
									options={borderStylesOptions}
									value={borderStyle}
									onChange={setBorderStyle}
								/>
								<SliderSelector
									label="Rounded"
									options={roundedOptions}
									value={rounded}
									onChange={setRounded}
								/>
							</ToggleableGroup>

							{/* Size Group */}
							<ToggleableGroup
								title="Size"
								isVisible={visibleGroups.size}
								onToggle={() => toggleGroup("size")}
							>
								<SliderSelector
									label="Padding (X)"
									options={paddingXOptions}
									value={paddingX}
									onChange={setPaddingX}
								/>
								<SliderSelector
									label="Height"
									options={heightOptions}
									value={height}
									onChange={setHeight}
								/>
							</ToggleableGroup>

							{/* Effects Group */}
							<ToggleableGroup
								title="Effects"
								isVisible={visibleGroups.effects}
								onToggle={() => toggleGroup("effects")}
							>
								<SliderSelector
									label="Shadow"
									options={shadowOptions}
									value={shadow}
									onChange={setShadow}
								/>
								<SliderSelector
									label="Opacity"
									options={opacityOptions}
									value={opacity}
									onChange={setOpacity}
								/>
							</ToggleableGroup>
						</TabsContent>
						<TabsContent value="code">
							<CodeDisplay code={buttonCode} />
						</TabsContent>
					</Tabs>
				</div>
			</Card>
		</div>
	);
}

const ToggleableGroup = ({
	title,
	isVisible,
	onToggle,
	children,
}: {
	title: string;
	isVisible: boolean;
	onToggle: () => void;
	children: React.ReactNode;
}) => {
	return (
		<div className="space-y-4">
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
			<div
				className="flex items-center justify-between cursor-pointer"
				onClick={onToggle}
			>
				<h3 className="text-lg font-semibold">{title}</h3>
				{isVisible ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
			</div>
			{isVisible && children}
		</div>
	);
};

const SliderSelector = ({
	label,
	options,
	value,
	onChange,
	showColor = false,
}: {
	label: string;
	options: string[];
	value: string;
	onChange: (value: string) => void;
	showColor?: boolean;
}) => {
	const handleChange = (value: number[]) => {
		onChange(options[value[0]]);
	};

	return (
		<div className="space-y-4">
			<div className="flex items-center justify-between">
				<Label>{label}</Label>
				<div className="flex items-center space-x-2">
					{showColor && (
						<div className={cn("w-6 h-6 rounded", textToBgColor(value))} />
					)}
					<span className="text-sm font-medium">{value}</span>
				</div>
			</div>
			<Slider
				min={0}
				max={options.length - 1}
				step={1}
				value={[options.indexOf(value)]}
				onValueChange={handleChange}
			/>
		</div>
	);
};