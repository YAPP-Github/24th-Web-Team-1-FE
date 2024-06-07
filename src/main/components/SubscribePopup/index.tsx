import React from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog"
import { SubscribePopupProps } from "@main/types";

export default function SubscribePopup({ isOpen, setIsOpen,  title, content, footer, description }: SubscribePopupProps) {
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-[380px] w-full rounded">
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
