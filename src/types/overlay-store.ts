import type { TNodesAbstract } from "./jsx";

export interface OverlayStore {
	overlaysAreActive: boolean;
	nodeKey: string;
	overlayContentRects: DOMRect[];
	overlayPaddingRects: DOMRect[];
	setOverlay: (nodeKey: string, type: "content" | "padding", overlayRects: DOMRect[]) => void;
	clearOverlay: () => void;
}
