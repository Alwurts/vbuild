"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeDisplay } from "@/components/CodeDisplay";

import {
	fontSizesOptions,
	roundedOptions,
	paddingXOptions,
	opacityOptions,
	heightOptions,
} from "@/lib/tailwindClasses";
import ColorPicker from "@/components/ColorPicker";
import { BorderType } from "@/components/BorderType";
import { BorderWidth } from "@/components/BorderWidth";
import { GenericSliderSelector } from "@/components/GenericSliderSelector";
import { Shadow } from "@/components/Shadow";
import { FontWeight as FontWeightComponent } from "@/components/FontWeight";
import { CollapsibleGroup } from "@/components/CollapsibleGroup";
import { InputTool } from "@/components/InputTool";

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
		size: true,
		background: true,
		border: true,
		effects: false,
		hover: false,
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
						<TabsContent value="toggles" className="space-y-3">
							{/* Text Group */}
							<CollapsibleGroup
								title="Text"
								isVisible={visibleGroups.text}
								className="grid grid-cols-2 gap-6"
							>
								<InputTool
									label="Button Text"
									value={buttonText}
									onChange={setButtonText}
								/>
								<ColorPicker
									label="Text Color"
									value={textColor}
									onChange={setTextColor}
								/>
								<GenericSliderSelector
									label="Font Size"
									options={fontSizesOptions}
									value={fontSize}
									onChange={setFontSize}
									width="w-20"
								/>
								<FontWeightComponent
									label="Font Weight"
									fontWeight={fontWeight}
									setFontWeight={setFontWeight}
								/>
							</CollapsibleGroup>

							{/* Size Group */}
							<CollapsibleGroup
								title="Size"
								isVisible={visibleGroups.size}
								className="grid grid-cols-2 gap-6"
							>
								<GenericSliderSelector
									label="Padding (X)"
									options={paddingXOptions}
									value={paddingX}
									onChange={setPaddingX}
								/>
								<GenericSliderSelector
									label="Height"
									options={heightOptions}
									value={height}
									onChange={setHeight}
								/>
							</CollapsibleGroup>

							{/* Background Group */}
							<CollapsibleGroup
								title="Background"
								isVisible={visibleGroups.background}
							>
								<ColorPicker
									label="Background Color"
									value={bgColor}
									onChange={setBgColor}
								/>
							</CollapsibleGroup>

							{/* Border Group */}
							<CollapsibleGroup
								title="Border"
								isVisible={visibleGroups.border}
								className="grid grid-cols-2 gap-6"
							>
								<BorderWidth
									label="Border Width"
									borderWidth={borderWidth}
									setBorderWidth={setBorderWidth}
								/>
								<BorderType
									label="Border Style"
									borderStyle={borderStyle}
									setBorderStyle={setBorderStyle}
								/>
								<ColorPicker
									label="Border Color"
									value={borderColor}
									onChange={setBorderColor}
								/>
								<GenericSliderSelector
									label="Rounded"
									options={roundedOptions}
									value={rounded}
									onChange={setRounded}
									width="w-24"
								/>
							</CollapsibleGroup>

							{/* Effects Group */}
							<CollapsibleGroup
								title="Effects"
								isVisible={visibleGroups.effects}
							>
								<Shadow label="Shadow" shadow={shadow} setShadow={setShadow} />
								<GenericSliderSelector
									label="Opacity"
									options={opacityOptions}
									value={opacity}
									onChange={setOpacity}
									width="w-24"
								/>
							</CollapsibleGroup>
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
