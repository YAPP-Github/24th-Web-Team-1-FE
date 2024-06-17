import { z } from "zod"

import { UNSUBSCRIBE_FORM } from "@workbook/constants/cancel"

export const unSubscribeSchema = z.object({
    reason: z
    .string()
    .max(255, { message: UNSUBSCRIBE_FORM.WORD_LIMIT })

})