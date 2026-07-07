"use client";

import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState } from "react";

import {
  Plus,
  Search,
  Filter,
  MoreHorizontal,
  Copy,
  Trash2,
  Edit,
  Archive,
  ExternalLink,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";
import Link from "next/link";
import axios from "axios";
import { useSession } from "@/services/better-auth/auth-client";
import { useRouter } from "next/navigation";
import moment from "moment";

interface Form {
  id: string;
  ownerId: string;
  name: string;
  description: string;
  status: "draft" | "published" | "archived";
  createdAt: string;
  updatedAt: string;
  submissionsCount: number;
  isPublic: boolean;
  isArchived: boolean;
  versions: [];
  submissions: [];
  user: {
    id: string;
    name: string;
    email: string;
    emailVerified: boolean;
    image: null | string;
    createdAt: string;
    updatedAt: string;
  };
}

export default function FormsPage() {
  const router = useRouter();
  const [forms, setForms] = useState<Form[]>([]);
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const filteredForms = forms.filter((form) => {
    const matchesSearch = form?.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || form?.status === statusFilter;
    return matchesSearch && matchesStatus;
  });
  const { data: sessionData, error: sessionError } = useSession();
  if (sessionError) {
    router.push("/sign-in");
  }

  useEffect(() => {
    if (!sessionData?.user?.id) return;

    axios
      .get(`/api/forms/${sessionData.user.id}`)
      .then((res) => {
        console.log(res.data);
        toast.success(res.data.message);
        setForms(res.data.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [sessionData]);

  // const getStatusBadge = (status: Form["status"]) => {
  //   const variants: Record<
  //     Form["status"],
  //     { label: string; className: string }
  //   > = {
  //     draft: { label: "Draft", className: "bg-muted text-muted-foreground" },
  //     published: {
  //       label: "Published",
  //       className: "bg-success/10 text-success",
  //     },
  //     archived: {
  //       label: "Archived",
  //       className: "bg-muted text-muted-foreground opacity-60",
  //     },
  //   };
  //   const { label, className } = variants[status];
  //   return (
  //     <Badge variant="secondary" className={className}>
  //       {label}
  //     </Badge>
  //   );
  // };

  const handleDuplicate = (id: string) => {
    toast.success("Form duplicated");
  };

  const handleDelete = (id: string) => {
    toast.success("Form deleted");
  };

  const handleArchive = (id: string) => {
    toast.success("Form archived");
  };

  return (
    <div>
      {/* Filters */}
      <div className="flex items-center gap-3 mb-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search forms..."
            // value={searchQuery}
            // onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-36">
            <Filter className="h-4 w-4 mr-2" />
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All status</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
            <SelectItem value="archived">Archived</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Forms list */}
      {filteredForms.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No forms found</p>
          {searchQuery || statusFilter !== "all" ? (
            <Button
              variant="link"
              onClick={() => {
                setSearchQuery("");
                setStatusFilter("all");
              }}
              className="mt-2"
            >
              Clear filters
            </Button>
          ) : (
            <Button asChild className="mt-4">
              <Link href="/builder">Create your first form</Link>
            </Button>
          )}
        </div>
      ) : (
        <div className="rounded-lg border border-border divide-y divide-border">
          {filteredForms.map((form) => (
            <div
              key={form.id}
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center gap-4 min-w-0 flex-1">
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/forms/${form.id}`}
                    className="text-sm font-medium hover:underline truncate block"
                  >
                    {form.name}
                  </Link>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Created {moment(form.createdAt).fromNow()}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Updated {moment(form.updatedAt).fromNow()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                {/* {getStatusBadge(form.status)} */}
                <span className="text-sm text-muted-foreground tabular-nums w-24 text-right">
                  {form.submissionsCount} submissions
                </span>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon-sm">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link
                        href={`/forms/${form.id}`}
                        className="flex items-center gap-2"
                      >
                        <Edit className="h-4 w-4" />
                        Edit
                      </Link>
                    </DropdownMenuItem>
                    {form.status === "published" && (
                      <DropdownMenuItem className="flex items-center gap-2">
                        <ExternalLink className="h-4 w-4" />
                        View live
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuItem
                      onClick={() => handleDuplicate(form.id)}
                      className="flex items-center gap-2"
                    >
                      <Copy className="h-4 w-4" />
                      Duplicate
                    </DropdownMenuItem>
                    {form.status !== "archived" && (
                      <DropdownMenuItem
                        onClick={() => handleArchive(form.id)}
                        className="flex items-center gap-2"
                      >
                        <Archive className="h-4 w-4" />
                        Archive
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(form.id)}
                      className="flex items-center gap-2 text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
