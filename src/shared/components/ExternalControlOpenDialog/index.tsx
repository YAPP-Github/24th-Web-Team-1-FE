import React, { useEffect } from "react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@shared/components/ui/dialog";
export interface ExternalControlOpenDialogProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title: React.ReactNode;
  content: React.ReactNode;
  footer?: React.ReactNode;
  description?: string;
}

export default function ExternalControlOpenDialog({
  isOpen,
  setIsOpen,
  title,
  content,
  footer,
  description,
}: ExternalControlOpenDialogProps) {

  useEffect(function removeAttribute() {
    const intervalId = setInterval(() => {
      document.body.removeAttribute('data-scroll-locked');
    }, 100);
    return () => clearInterval(intervalId);
  } , []);
  
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="z-50 w-full max-w-[380px] rounded">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {content}
        {footer && (
          <DialogFooter className="mt-[20px] sm:justify-start">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
