import { z } from "zod";

export const joinSchema = z.object({
	name: z.string(),
	room: z.string(),
});
