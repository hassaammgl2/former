"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Undo,
  Redo,
  Eye,
  Save,
  Copy,
  ExternalLink,
  MoreHorizontal,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useBuilderStore } from "@/store/builderStore";
import { useState } from "react";
import axios from "axios";
import { useSession } from "@/services/better-auth/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Header = () => {
  const router = useRouter();
  const {
    meta,
    setMeta,
    isDirty,
    history,
    undo,
    redo,
    historyIndex,
    status,
    fields,
    setIsDirty,
  } = useBuilderStore();

  async function poll(jobId: string) {
    try {
      const { data } = await axios.get(`/api/jobs/${jobId}`);

      if (data.status === "COMPLETED") {
        toast.success("Form saved successfully.");
        setIsSaving(false);
        setIsDirty(false);
        return;
      }

      if (data.status === "FAILED") {
        toast.error(data.error ?? "Failed to save form.");
        setIsSaving(false);
        setIsDirty(false);
        return;
      }

      setTimeout(() => poll(jobId), 2000);
    } catch (error) {
      console.error(error);

      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message ?? "Request failed.");
      } else {
        toast.error("Something went wrong.");
      }

      setIsSaving(false);
      setIsDirty(false);
    }
  }

  const { data: sessionData, error: sessionError } = useSession();
  if (sessionError) {
    router.push("/sign-in");
  }
  const [isSaving, setIsSaving] = useState(false);
  const handleSave = async () => {
    setIsSaving(true);
    try {
      const data: ISaveForm = {
        userId: sessionData?.user.id as string,
        meta,
        fields: fields,
      };
      try {
        const { data: response } = await axios.post("/api/forms/save", {
          ...data,
        });

        const { status, message, bgJobId } = response;

        if (!status) {
          throw new Error(message ?? "Failed to save form");
        }

        console.log("Job created:", bgJobId);
        poll(bgJobId);
        setIsDirty(true);
      } catch (error) {
        if (axios.isAxiosError(error)) {
          console.error("Axios Error:", error.response?.data ?? error.message);

          toast.error(error.response?.data?.message ?? "Request failed");
        } else if (error instanceof Error) {
          console.error(error.message);

          toast.error(error.message);
        } else {
          console.error("Unknown error occurred");

          toast.error("Something went wrong");
        }
      }
    } catch (error) {
      console.log(error);
      setIsSaving(false);
      setIsDirty(false);
    }
  };

  return (
    <header className="flex h-14 items-center justify-between border-b border-border px-4 bg-background shrink-0 ">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon-sm" asChild>
          <Link href="/forms">
            <ArrowLeft className="size-4" />
          </Link>
        </Button>
        <div className="flex items-center gap-2">
          <Input
            value={meta.title}
            onChange={(e) => setMeta({ ...meta, title: e.target.value })}
            className="h-8 w-48 border-transparent hover:border-input focus:border-input bg-transparent font-bold"
          />
          <Badge
            variant="secondary"
            className={cn(
              status === "published" && "bg-success/10 text-success",
            )}
          >
            {status === "published" ? "Published" : "Draft"}
          </Badge>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {/* Undo/Redo */}
        <div className="flex items-center border-r border-border pr-2 mr-2">
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => undo()}
            disabled={history.length === 0}
          >
            <Undo className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon-sm"
            onClick={() => redo()}
            disabled={historyIndex + 1 === history.length}
          >
            <Redo className="h-4 w-4" />
          </Button>
        </div>

        {/* Preview button */}
        <Button variant="outline" size="sm">
          <Eye className="h-4 w-4 mr-2" />
          Preview
        </Button>

        {/* Save button */}
        <Button
          variant="outline"
          size="sm"
          onClick={handleSave}
          disabled={isSaving || !isDirty}
        >
          <Save className="h-4 w-4 mr-2" />
          {isSaving ? "Saving..." : "Save"}
        </Button>

        {/* Publish/Unpublish */}
        {/* {status === 'draft' ? ( */}
        {status === "published" ? (
          <Button
            size="sm"
            // onClick={handlePublish}
          >
            Publish
          </Button>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="default">
                Published
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
              // onClick={handleCopyUrl}
              >
                <Copy className="h-4 w-4 mr-2" />
                Copy link
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                {/* <a href={publicUrl} target="_blank" rel="noopener noreferrer"> */}
                <a
                  href={"google.com"}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ExternalLink className="h-4 w-4 mr-2" />
                  View live form
                </a>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
              // onClick={handleUnpublish}
              >
                Unpublish
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )}

        {/* More options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>
              <Settings2 className="h-4 w-4 mr-2" />
              Form settings
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Copy className="h-4 w-4 mr-2" />
              Duplicate form
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Header;
