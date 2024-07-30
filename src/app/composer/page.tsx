"use client";

import { Button } from "@/components/ui-editor/button";
import { Card } from "@/components/ui-editor/card";
import { Input } from "@/components/ui-editor/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui-editor/select";
import { Separator } from "@/components/ui-editor/separator";
import type React from "react";
import { useState } from "react";

// Define types
type ComponentType = "Button" | "Card" | "Input" | "Div" | "Text";

interface ComponentItem {
  id: string;
  type: ComponentType;
  props: Record<string, any>;
  children: ComponentItem[];
}

const ComponentSelector = ({ onAdd }: { onAdd: (type: ComponentType) => void }) => {
  const components: ComponentType[] = ["Button", "Card", "Input", "Div", "Text"];

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Add Component</h2>
      <Select onValueChange={(value) => onAdd(value as ComponentType)}>
        <SelectTrigger>
          <SelectValue placeholder="Select component" />
        </SelectTrigger>
        <SelectContent>
          {components.map((comp) => (
            <SelectItem key={comp} value={comp}>
              {comp}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

const Canvas = () => {
  const [components, setComponents] = useState<ComponentItem[]>([]);
  const [selectedComponentId, setSelectedComponentId] = useState<string | null>(null);

  const addComponent = (type: ComponentType) => {

    const newComponent: ComponentItem = {
      id: Date.now().toString(),
      type,
      props: {},
      children: [],
    };
    console.log("newComponent", newComponent);
    setComponents((prev) => [...prev, newComponent]);
  };

  const removeComponent = (id: string) => {
    setComponents((prev) => prev.filter((comp) => comp.id !== id));
    if (selectedComponentId === id) {
      setSelectedComponentId(null);
    }
  };

  const updateComponent = (id: string, updates: Partial<ComponentItem>) => {
    setComponents((prev) =>
      prev.map((comp) => (comp.id === id ? { ...comp, ...updates } : comp))
    );
  };

  const renderComponent = (component: ComponentItem) => {
    const isSelected = selectedComponentId === component.id;
    const commonProps = {
      onClick: (e: React.MouseEvent) => {
        e.stopPropagation();
        setSelectedComponentId(component.id);
      },
      className: `border-2 ${isSelected ? 'border-blue-500' : 'border-transparent'}`,
    };

    switch (component.type) {
      case "Button":
        return <Button key={component.id} {...commonProps} {...component.props}>{component.props.text || "Button"}</Button>;
      case "Card":
        return (
          <Card key={component.id} {...commonProps} {...component.props}>
            {component.children.map(renderComponent)}
          </Card>
        );
      case "Input":
        return <Input key={component.id} {...commonProps} {...component.props} />;
      case "Div":
        return (
          <div key={component.id} {...commonProps} {...component.props}>
            {component.children.map(renderComponent)}
          </div>
        );
      case "Text":
        return <p key={component.id} {...commonProps} {...component.props}>{component.props.content || "Text"}</p>;
      default:
        return null;
    }
  };

  const selectedComponent = components.find(comp => comp.id === selectedComponentId);

  return (
    <div className="flex h-screen">
      <div className="w-64 p-4 bg-gray-100">
        <ComponentSelector onAdd={addComponent} />
        <Separator className="my-4" />
        {selectedComponent && (
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Edit Component</h2>
            <Input
              placeholder="Text/Content"
              value={selectedComponent.props.text || selectedComponent.props.content || ""}
              onChange={(e) =>
                updateComponent(selectedComponent.id, {
                  props: { ...selectedComponent.props, [selectedComponent.type === "Text" ? "content" : "text"]: e.target.value },
                })
              }
            />
            <Button onClick={() => removeComponent(selectedComponent.id)} variant="destructive">
              Remove
            </Button>
          </div>
        )}
      </div>
      <div className="flex-1 p-4 bg-white" onClick={() => setSelectedComponentId(null)}>
        {components.map(renderComponent)}
      </div>
    </div>
  );
};

export default function Editor() {
  return <Canvas />;
}