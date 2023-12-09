import { TRPCError } from "@trpc/server";
import { publicProcedure, router } from "../trpc";

import { AccessToken } from "livekit-server-sdk";

import z from "zod";

export const roomRouter = router({
  join: publicProcedure
    .input(
      z.object({
        name: z.string(),
        room: z.string(),
      })
    )
    .mutation(({ input: { name, room } }) => {
      const apiKey = process.env.LIVEKIT_API_KEY;
      const apiSecret = process.env.LIVEKIT_API_SECRET;
      const wsUrl = process.env.NEXT_PUBLIC_LIVEKIT_URL;

      if (!apiKey || !apiSecret || !wsUrl) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Server not configured properly.",
        });
      }

      const at = new AccessToken(apiKey, apiSecret, { identity: name });

      at.addGrant({
        room,
        roomJoin: true,
        canPublish: true,
        canSubscribe: true,
      });

      return {
        token: at.toJwt(),
      };
    }),
});
