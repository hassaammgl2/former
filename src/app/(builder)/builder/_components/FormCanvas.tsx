"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Monitor, Smartphone } from "lucide-react";
import { useState } from "react";
import { useBuilderStore } from "@/store/builderStore";
import { ScrollArea } from "@/components/ui/scroll-area";
import FieldFactory from "@/lib/field-factory";

const widths = {
  mobile: "w-[375px]",
  desktop: "w-[1024px]",
};

type DeviceType = "mobile" | "desktop";

export default function FormCanvas() {
  const [device, setDevice] = useState<DeviceType>("desktop");
  const { fields, meta } = useBuilderStore();

  return (
    <div className="flex flex-col gap-4 px-4">
      {/* Toolbar */}
      <Tabs value={device} onValueChange={(v) => setDevice(v as DeviceType)}>
        <TabsList className="mx-auto flex gap-2">
          <TabsTrigger value="desktop" className="px-3 py-2">
            <Monitor className="h-4 w-4" />
          </TabsTrigger>

          <TabsTrigger value="mobile" className="px-3 py-2">
            <Smartphone className="size-4" />
          </TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Preview Canvas */}
      <ScrollArea className="flex justify-center items-center bg-muted p-6 rounded-xl">
        <div
          className={`${widths[device]} mx-auto bg-white rounded-xl shadow border transition-all`}
        >
          <Card className="border-0 shadow-none">
            <CardHeader>
              <CardTitle>{meta.title}</CardTitle>
              <CardDescription>{meta.description}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              {fields.map((i) => (
                <FieldFactory key={i.id} field={i} />
              ))}
            </CardContent>
          </Card>
        </div>
      </ScrollArea>
    </div>
  );
}
