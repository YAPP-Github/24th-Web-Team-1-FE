import { z } from "zod";

import { EMAIL_CONTROL } from "@subscription/constants/subscribe";

export const emailSubscribeSchema = z.object({
    email: z
    .string()
    .min(1, { message: EMAIL_CONTROL.INVALID_EMAIL })
    .email(EMAIL_CONTROL.INVALID_EMAIL)
})