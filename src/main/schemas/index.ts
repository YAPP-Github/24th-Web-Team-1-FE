import { z } from "zod"

import { EMAIL_CONTROL } from "@main/constants/main"

export const emailSubscribeSchema = z.object({
    email: z
    .string()
    .min(1, { message: EMAIL_CONTROL.INVALID_EMAIL })
    .email(EMAIL_CONTROL.INVALID_EMAIL)
})