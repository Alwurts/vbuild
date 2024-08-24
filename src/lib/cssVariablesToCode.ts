import "highlight.js/styles/vs2015.css";

import type { CSSVariableNames } from "@/types/style";

export function cssVariablesToCode(
	cssVariables: { [K in CSSVariableNames]: string },
): string {
	const lightModeVars = Object.entries(cssVariables)
		.map(([key, value]) => `    --${key}: ${value};`)
		.join("\n");

	const darkModeVars = Object.entries(cssVariables)
		.map(([key, value]) => `    --${key}: ${value};`)
		.join("\n");
	return `@layer base {
  :root {
${lightModeVars}
  }

  .dark {
${darkModeVars}
  }
}

@layer base {
  * {
    @apply border-border;
  }
  body {
    @apply bg-background text-foreground;
  }
}`;
}
