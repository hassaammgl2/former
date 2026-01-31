import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Copy, ExternalLink } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import FormCanvas from "./_components/FormCanvas"
import FieldsSettings from "./_components/FieldsSettings"
import FieldsSelectMenu from "./_components/FieldsSelectMenu"
import Header from "./_components/header"

export default function BuilderPage() {

    return (
        <div className="h-screen flex flex-col bg-background">
            {/* Header */}
            <Header />

            {/* Builder content */}
            <div className="flex-1 flex overflow-hidden">
                {/* Left panel - Field palette */}
                <FieldsSelectMenu />

                {/* Center - Canvas */}
                <FormCanvas />

                {/* Right panel - Field settings */}
                <FieldsSettings
                />
            </div>

            {/* Publish success dialog */}
            <Dialog
            // open={showPublishDialog} onOpenChange={setShowPublishDialog}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Form Published!</DialogTitle>
                        <DialogDescription>
                            Your form is now live and accepting submissions.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="flex items-center gap-2 p-3 bg-muted rounded-lg">
                        <Input
                            // value={publicUrl}
                            readOnly
                            className="flex-1 bg-transparent border-0"
                        />
                        <Button size="sm" >
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex justify-end gap-2">
                        <Button variant="outline" >
                            Close
                        </Button>
                        <Button asChild>
                            <a href={"google.com"} target="_blank" rel="noopener noreferrer">
                                <ExternalLink className="h-4 w-4 mr-2" />
                                View form
                            </a>
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    )
}