import { ReactionProps } from "@/app/home/types";

export enum UserEvents {
  USER_ACTIVE = "user_active",
  PING = "ping",
}

export enum CommunityEvents {
  CREATE = "create_community",
  ACTIVE = "community_active",
  REGISTER = "register_community",
}

export enum ChatEvents {
  MESSAGE = "message",
  REACTION = "reaction",
  REPLY = "reply",
}

export type Message = {
  event: string;
  data: string;
  roomID?: string;
  room?: string;
  createdAt?: string;
};

export type MessageData = {
  user: string;
  message: string;
  reply?: string;
  reactions?: Array<ReactionProps>;
};
