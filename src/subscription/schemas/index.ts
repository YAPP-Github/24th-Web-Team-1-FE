import { z } from "zod"

import { EMAIL_CONTROL } from "@subscription/constants/subscribe"
import { UNSUBSCRIBE_FORM } from "@subscription/constants/unsubscribe"

export const unSubscribeSchema = z.object({
    opinion: z
    .string()
    .max(255, { message: UNSUBSCRIBE_FORM.WORD_LIMIT })

})

export const emailSubscribeSchema = z.object({
    email: z
    .string()
    .min(1, { message: EMAIL_CONTROL.INVALID_EMAIL })
    .email(EMAIL_CONTROL.INVALID_EMAIL)
})