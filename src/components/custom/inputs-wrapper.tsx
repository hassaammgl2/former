import React from "react";
import { Sheet, SheetTrigger } from "@/components/ui/sheet";
import { MoreVertical } from "lucide-react";
import { Label } from "../ui/label";
import { useBuilderStore } from "@/store/builderStore";
import { cn } from "@/lib/utils";

const InputsWrapper = ({
  children,
  data,
  configs,
}: {
  children: React.ReactNode;
  data: Field;
  configs: React.ReactNode;
}) => {
  const { selectField, selectedFieldId } = useBuilderStore();
  return (
    <Sheet>
      <div
        onClick={() => selectField(data.id)}
        className={cn(
          "rounded-md border p-4 dark:hover:border-white hover:border-black",
          data.id === selectedFieldId
            ? "border-2  dark:border-white border-black"
            : "",
        )}
      >
        <Label className="mb-2 text-md">
          {data.label}
          {data.required && (
            <span className="text-red-500 font-extrabold">*</span>
          )}
          <SheetTrigger>
            <MoreVertical className="size-4" />
          </SheetTrigger>
        </Label>
        {children}
        {configs}
      </div>
    </Sheet>
  );
};

export default InputsWrapper;
