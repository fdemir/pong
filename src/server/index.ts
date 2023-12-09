import { roomRouter } from "./routes/room";
import { router } from "./trpc";

export const appRouter = router({
  room: roomRouter,
});

export type AppRouter = typeof appRouter;
