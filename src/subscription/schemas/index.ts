import { z } from "zod"

import { UNSUBSCRIBE_FORM } from "@subscription/constants/unsubscribe"

export const unSubscribeSchema = z.object({
    opinion: z
    .string()
    .max(255, { message: UNSUBSCRIBE_FORM.WORD_LIMIT })

})
