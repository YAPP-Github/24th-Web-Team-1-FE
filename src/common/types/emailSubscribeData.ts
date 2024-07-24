import { z } from "zod";

import { emailSubscribeSchema } from "@common/schemas/emailSchema";

export type EmailSubscribeFormData = z.infer<typeof emailSubscribeSchema>;