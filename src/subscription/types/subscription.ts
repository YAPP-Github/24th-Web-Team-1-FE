import { z } from "zod";

import { unSubscribeSchema } from "@subscription/schemas";

export type UnsubscribeFormData = z.infer<typeof unSubscribeSchema>;