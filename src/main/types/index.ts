
import { z } from 'zod';

import { emailSubscribeSchema } from '@main/schemas';

export type variantType = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link"
export type EmailSubscribeFormData = z.infer<typeof emailSubscribeSchema>;