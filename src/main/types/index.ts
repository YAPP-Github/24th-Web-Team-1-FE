import { emailSubscribeSchema } from '@main/schemas';
import React from 'react';
import { z } from 'zod';
export interface SubscribePopupProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: React.ReactNode
    content: React.ReactNode
    footer?: React.ReactNode
    description?: string
}

export type variantType = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"

export interface SubscribeButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    /**
    * button content
    */
    label: string
    /**
    * click event
    */
    handleClick?: () => void
    /**
    * button variant : "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    */
    variant: variantType
    /**
    * for styling
    */
    className: string
}

export type EmailSubscribeFormData = z.infer<typeof emailSubscribeSchema>;