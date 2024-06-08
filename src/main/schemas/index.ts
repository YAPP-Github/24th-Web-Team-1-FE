import { INVALID_EMAIL } from "@main/constants/main"
import { z } from "zod"

export const emailSubscribeSchema = z.object({
    email: z
    .string()
    .min(1, { message: INVALID_EMAIL })
    .email(INVALID_EMAIL)
})