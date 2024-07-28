"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CodeDisplay } from "@/components/CodeDisplay";
import { create } from "zustand";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";

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

interface ButtonStore {
	styles: {
		[key: string]: {
			bgColor: string;
			textColor: string;
			fontSize: string;
			fontWeight: string;
			borderColor: string;
			borderWidth: string;
			borderStyle: string;
			rounded: string;
			paddingX: string;
			height: string;
			shadow: string;
			opacity: string;
		};
	};
	currentStyle: string;
	setStyle: (styleName: string, property: string, value: string) => void;
	setCurrentStyle: (styleName: string) => void;
}

const useButtonStore = create<ButtonStore>((set) => ({
	styles: {
		default: {
			bgColor: "bg-primary",
			textColor: "text-primary-foreground",
			fontSize: "text-sm",
			fontWeight: "font-medium",
			borderColor: "border-transparent",
			borderWidth: "border",
			borderStyle: "border-solid",
			rounded: "rounded-md",
			paddingX: "px-4",
			height: "h-10",
			shadow: "shadow-none",
			opacity: "opacity-100",
		},
		destructive: {
			bgColor: "bg-destructive",
			textColor: "text-destructive-foreground",
			fontSize: "text-sm",
			fontWeight: "font-medium",
			borderColor: "border-transparent",
			borderWidth: "border",
			borderStyle: "border-solid",
			rounded: "rounded-md",
			paddingX: "px-4",
			height: "h-10",
			shadow: "shadow-none",
			opacity: "opacity-100",
			// ... (fill in other properties)
		},
		outline: {
			bgColor: "bg-background",
			textColor: "text-foreground",
			borderColor: "border-input",
			borderWidth: "border",
			borderStyle: "border-solid",
			rounded: "rounded-md",
			paddingX: "px-4",
			height: "h-10",
			shadow: "shadow-none",
			opacity: "opacity-100",
			fontSize: "text-sm",
			fontWeight: "font-medium",
			// ... (fill in other properties)
		},
		secondary: {
			bgColor: "bg-secondary",
			textColor: "text-secondary-foreground",
			fontSize: "text-sm",
			fontWeight: "font-medium",
			borderColor: "border-transparent",
			borderWidth: "border",
			borderStyle: "border-solid",
			rounded: "rounded-md",
			paddingX: "px-4",
			height: "h-10",
			shadow: "shadow-none",
			opacity: "opacity-100",
			// ... (fill in other properties)
		},
		ghost: {
			bgColor: "bg-transparent",
			textColor: "text-foreground",
			fontSize: "text-sm",
			fontWeight: "font-medium",
			borderColor: "border-transparent",
			borderWidth: "border",
			borderStyle: "border-solid",
			rounded: "rounded-md",
			paddingX: "px-4",
			height: "h-10",
			shadow: "shadow-none",
			opacity: "opacity-100",
			// ... (fill in other properties)
		},
		link: {
			bgColor: "bg-transparent",
			textColor: "text-primary",
			fontSize: "text-sm",
			fontWeight: "font-medium",
			borderColor: "border-transparent",
			borderWidth: "border",
			borderStyle: "border-solid",
			rounded: "rounded-md",
			paddingX: "px-4",
			height: "h-10",
			shadow: "shadow-none",
			opacity: "opacity-100",
			// ... (fill in other properties)
		},
		custom: {
			bgColor: "bg-black",
			textColor: "text-white",
			fontSize: "text-sm",
			fontWeight: "font-medium",
			borderColor: "border-transparent",
			borderWidth: "border",
			borderStyle: "border-solid",
			rounded: "rounded-md",
			paddingX: "px-4",
			height: "h-10",
			shadow: "shadow-none",
			opacity: "opacity-100",
		},
	},
	currentStyle: "default",
	setStyle: (styleName, property, value) =>
		set((state) => ({
			styles: {
				...state.styles,
				[styleName]: {
					...state.styles[styleName],
					[property]: value,
				},
			},
		})),
	setCurrentStyle: (styleName) => set({ currentStyle: styleName }),
}));

export default function Home() {
	const { styles, currentStyle, setStyle, setCurrentStyle } = useButtonStore();
	const [buttonText, setButtonText] = useState("Hello world");

	// Group Visibility
	const [visibleGroups, setVisibleGroups] = useState({
		text: true,
		size: true,
		background: true,
		border: true,
		effects: false,
		hover: false,
	});

	const currentStyleFull = styles[currentStyle];

	const buttonClasses = cn(
		currentStyleFull.textColor,
		currentStyleFull.fontSize,
		currentStyleFull.fontWeight,
		currentStyleFull.bgColor,
		currentStyleFull.borderColor,
		currentStyleFull.borderWidth,
		currentStyleFull.borderStyle,
		currentStyleFull.rounded,
		currentStyleFull.paddingX,
		currentStyleFull.shadow,
		currentStyleFull.opacity,
		currentStyleFull.height,
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
        custom: "${currentStyleFull.textColor} ${currentStyleFull.fontSize} ${currentStyleFull.fontWeight} ${currentStyleFull.bgColor} ${currentStyleFull.borderColor} ${currentStyleFull.borderWidth} ${currentStyleFull.borderStyle} ${currentStyleFull.rounded} ${currentStyleFull.shadow} ${currentStyleFull.opacity}",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
        custom: "${currentStyleFull.paddingX} ${currentStyleFull.height}",
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
				<div
					className="p-6 w-[500px] overflow-y-auto"
				>
					<Accordion defaultValue={[currentStyle]} type="multiple" className="w-full">
						{Object.entries(styles).map(([styleName, styleProps]) => {
							const buttonClasses = cn(
								styleProps.textColor,
								styleProps.fontSize,
								styleProps.fontWeight,
								styleProps.bgColor,
								styleProps.borderColor,
								styleProps.borderWidth,
								styleProps.borderStyle,
								styleProps.rounded,
								styleProps.paddingX,
								styleProps.shadow,
								styleProps.opacity,
								styleProps.height,
							);

							return (
								<AccordionItem value={styleName} key={styleName}>
									<AccordionTrigger>{styleName}</AccordionTrigger>
									<AccordionContent>
										<div className="flex items-center space-x-2 pt-2">
											<Button className={buttonClasses}>{buttonText}</Button>
											<span className="text-sm text-gray-500">{styleName}</span>
										</div>
									</AccordionContent>
								</AccordionItem>
							);
						})}
					</Accordion>
				</div>
				<div className="p-6 border-l border-border flex-1 space-y-6 overflow-y-auto">
					<Tabs defaultValue="toggles">
						<TabsList className="grid w-full grid-cols-2">
							<TabsTrigger value="toggles">Editor</TabsTrigger>
							<TabsTrigger value="code">Code</TabsTrigger>
						</TabsList>
						<TabsContent value="toggles" className="space-y-3">
							<div className="mb-4">
								<Label>Current Style</Label>
								<select
									value={currentStyle}
									onChange={(e) => setCurrentStyle(e.target.value)}
									className="w-full p-2 border rounded"
								>
									{Object.keys(styles).map((style) => (
										<option key={style} value={style}>
											{style}
										</option>
									))}
								</select>
							</div>
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
									value={currentStyleFull.textColor}
									onChange={(value) =>
										setStyle(currentStyle, "textColor", value)
									}
								/>
								<GenericSliderSelector
									label="Font Size"
									options={fontSizesOptions}
									value={currentStyleFull.fontSize}
									onChange={(value) =>
										setStyle(currentStyle, "fontSize", value)
									}
									width="w-20"
								/>
								<FontWeightComponent
									label="Font Weight"
									fontWeight={currentStyleFull.fontWeight}
									setFontWeight={(value) =>
										setStyle(currentStyle, "fontWeight", value)
									}
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
									value={currentStyleFull.paddingX}
									onChange={(value) =>
										setStyle(currentStyle, "paddingX", value)
									}
								/>
								<GenericSliderSelector
									label="Height"
									options={heightOptions}
									value={currentStyleFull.height}
									onChange={(value) => setStyle(currentStyle, "height", value)}
								/>
							</CollapsibleGroup>

							{/* Background Group */}
							<CollapsibleGroup
								title="Background"
								isVisible={visibleGroups.background}
							>
								<ColorPicker
									label="Background Color"
									value={currentStyleFull.bgColor}
									onChange={(value) => setStyle(currentStyle, "bgColor", value)}
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
									borderWidth={currentStyleFull.borderWidth}
									setBorderWidth={(value) =>
										setStyle(currentStyle, "borderWidth", value)
									}
								/>
								<BorderType
									label="Border Style"
									borderStyle={currentStyleFull.borderStyle}
									setBorderStyle={(value) =>
										setStyle(currentStyle, "borderStyle", value)
									}
								/>
								<ColorPicker
									label="Border Color"
									value={currentStyleFull.borderColor}
									onChange={(value) =>
										setStyle(currentStyle, "borderColor", value)
									}
								/>
								<GenericSliderSelector
									label="Rounded"
									options={roundedOptions}
									value={currentStyleFull.rounded}
									onChange={(value) => setStyle(currentStyle, "rounded", value)}
									width="w-24"
								/>
							</CollapsibleGroup>

							{/* Effects Group */}
							<CollapsibleGroup
								title="Effects"
								isVisible={visibleGroups.effects}
							>
								<Shadow
									label="Shadow"
									shadow={currentStyleFull.shadow}
									setShadow={(value) => setStyle(currentStyle, "shadow", value)}
								/>
								<GenericSliderSelector
									label="Opacity"
									options={opacityOptions}
									value={currentStyleFull.opacity}
									onChange={(value) => setStyle(currentStyle, "opacity", value)}
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
