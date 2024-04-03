import type { NextApiRequest, NextApiResponse } from "next";
import { z } from "zod";
import { getServerAuthSession } from "~/server/auth";
import { pusher } from "~/server/common/pusher";
import { db } from "~/server/db";

export const PusherAuthRequest = z.object({
  socket_id: z.string().min(1),
  channel_id: z
    .string()
    .min(1)
    .transform((v) => parseInt(v)),
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method !== "POST") return res.status(405).end();

  const session = await getServerAuthSession({ req, res });
  if (!session || !session.user) return res.status(401).end();

  const pusherAuthRequest = await PusherAuthRequest.safeParseAsync(req.body);
  if (!pusherAuthRequest.success)
    return res.status(400).json(pusherAuthRequest.error);

  const { socket_id, channel_id } = pusherAuthRequest.data;

  const chatRoom = await db.query.chatRooms.findFirst({
    with: {
      participants: {
        where: (participants, { eq }) =>
          eq(participants.userId, session.user.id),
      },
    },
  });

  if (!chatRoom || chatRoom.roomId !== channel_id) return res.status(404).end();

  const authenticatedUser = pusher.authenticateUser(socket_id, session.user);
  return res.json(authenticatedUser);
}
