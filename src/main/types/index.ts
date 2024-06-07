import { emailSubscribeSchema } from '@main/schemas';
import React from 'react';
import { z } from 'zod';

export type variantType = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
export type EmailSubscribeFormData = z.infer<typeof emailSubscribeSchema>;