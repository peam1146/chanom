import { z } from "zod";

import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";
import { PaginationInput } from "~/server/common/pagination";
import { pusher } from "~/server/common/pusher";
import { chatRoomParticipants, chatRooms } from "~/server/db/schema";

export const CreateDirectChatRoomInput = z.object({
  roomType: z.literal("direct"),
  participantIds: z.array(z.string().min(1)).length(1),
});

export const CreateGroupChatRoomInput = z.object({
  roomType: z.literal("group"),
  participantIds: z.array(z.string().min(1)),
  roomName: z.string().min(1),
});

export const CreateChatRoomInput = z.discriminatedUnion("roomType", [
  CreateDirectChatRoomInput,
  CreateGroupChatRoomInput,
]);

export const chatRoomRouter = createTRPCRouter({
  create: protectedProcedure
    .input(CreateChatRoomInput)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;

      const roomTitle =
        input.roomType === "group" ? input.roomName : "Direct Message";

      const room = await ctx.db.transaction(async (db) => {
        const createdChatRoom = await db
          .insert(chatRooms)
          .values({
            title: roomTitle,
            roomType: input.roomType,
          })
          .returning({ roomId: chatRooms.roomId });

        const roomId = createdChatRoom[0]!.roomId;

        const participants = [
          {
            roomId: roomId,
            userId: userId,
          },
        ];

        input.participantIds.forEach((participantId) => {
          participants.push({
            roomId: roomId,
            userId: participantId,
          });
        });

        await db.insert(chatRoomParticipants).values(participants);
        return createdChatRoom[0]!;
      });

      return room;
    }),

  getChatRooms: protectedProcedure
    .input(PaginationInput)
    .query(async ({ ctx, input }) => {
      const limit = input.limit ?? 50;
      const cursor = input.cursor ?? 0;

      const chatRoom = await ctx.db.query.chatRooms.findMany({
        limit: limit,
        offset: cursor,
        with: {
          participants: {
            where: (participants, { eq }) =>
              eq(participants.userId, ctx.session.user.id),
          },
        },
      });

      const nextCursor = chatRoom.length === limit ? cursor + limit : null;

      return {
        chatRoom,
        nextCursor,
      };
    }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
