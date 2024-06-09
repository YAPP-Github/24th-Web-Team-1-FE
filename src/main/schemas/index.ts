import { EMAIL_CONTROL } from "@main/constants/main"
import { z } from "zod"

export const emailSubscribeSchema = z.object({
    email: z
    .string()
    .min(1, { message: EMAIL_CONTROL.INVALID_EMAIL })
    .email(EMAIL_CONTROL.INVALID_EMAIL)
})