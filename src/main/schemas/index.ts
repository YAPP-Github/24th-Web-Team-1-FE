import { z } from "zod"

export const emailSubscribeSchema = z.object({
    email: z
    .string()
    .min(1, { message: "올바른 이메일 형식이 아니에요." })
    .email("올바른 이메일 형식이 아니에요.")
})