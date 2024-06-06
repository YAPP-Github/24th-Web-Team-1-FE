//type
import React from 'react';
export interface SubscribePopupProps {
    isOpen: boolean
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
    title: React.ReactNode
    content: React.ReactNode
    footer?: React.ReactNode
    description?: string
}

export interface SubscribeButtonProps {
    /**
    * button content
    */
    label: string
    /**
    * click event
    */
    handleClick: () => void
    /**
    * button variant : "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    */
    variant: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
    /**
    * for styling
    */
    className: string
}