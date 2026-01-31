import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft,Undo,Redo, Monitor, Smartphone, Eye, Save, Copy, ExternalLink, MoreHorizontal, Settings2 } from "lucide-react"
import Link from "next/link"
import {cn} from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

const status = "published"

const Header = () => {
    return (
        <header className="flex h-14 items-center justify-between border-b border-border px-4 bg-background shrink-0">
            <div className="flex items-center gap-4">
                <Button variant="ghost" size="icon-sm" asChild>
                    <Link href="/forms">
                        <ArrowLeft className="h-4 w-4" />
                    </Link>
                </Button>
                <div className="flex items-center gap-2">
                    <Input
                        // value={formName}
                        // onChange={(e) => setFormName(e.target.value)}
                        className="h-8 w-48 border-transparent hover:border-input focus:border-input bg-transparent font-medium"
                    />
                    <Badge variant="secondary" className={cn(
                        status === 'published' && 'bg-success/10 text-success'
                    )}>
                        {status === 'published' ? 'Published' : 'Draft'}
                    </Badge>
                </div>
            </div>

            <div className="flex items-center gap-2">
                {/* Undo/Redo */}
                <div className="flex items-center border-r border-border pr-2 mr-2">
                    <Button variant="ghost" size="icon-sm" disabled>
                        <Undo className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon-sm" disabled>
                        <Redo className="h-4 w-4" />
                    </Button>
                </div>

                {/* Preview toggles */}
                <div className="flex items-center bg-muted rounded-md p-0.5">
                    <Button
                        // variant={!isMobilePreview ? 'secondary' : 'ghost'}
                        size="icon-sm"
                    // onClick={() => setIsMobilePreview(false)}
                    >
                        <Monitor className="h-4 w-4" />
                    </Button>
                    <Button
                        // variant={isMobilePreview ? 'secondary' : 'ghost'}
                        size="icon-sm"
                    // onClick={() => setIsMobilePreview(true)}
                    >
                        <Smartphone className="h-4 w-4" />
                    </Button>
                </div>

                {/* Preview button */}
                <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-2" />
                    Preview
                </Button>

                {/* Save button */}
                <Button variant="outline" size="sm"
                //  onClick={handleSave} disabled={isSaving}
                >
                    <Save className="h-4 w-4 mr-2" />
                    {/* {isSaving ? 'Saving...' : 'Save'} */}
                    Save
                </Button>

                {/* Publish/Unpublish */}
                {/* {status === 'draft' ? ( */}
                {status === 'published' ? (
                    <Button size="sm"
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
                                <a href={"google.com"} target="_blank" rel="noopener noreferrer">
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
    )
}

export default Header