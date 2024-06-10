import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog"
export interface ExternalControlOpenDialogProps {
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
  title: React.ReactNode
  content: React.ReactNode
  footer?: React.ReactNode
  description?: string
}

export default function ExternalControlOpenDialog({ isOpen, setIsOpen,  title, content, footer, description }: ExternalControlOpenDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[380px] w-full rounded z-50">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {
            description && (
              <DialogDescription>
                {description}
              </DialogDescription>
            )
          }
        </DialogHeader>
        {content}
        {
          footer && (
            <DialogFooter className="sm:justify-start mt-[20px]">
              {footer}
            </DialogFooter>
          )
        }
      </DialogContent>
    </Dialog>
  )
}
