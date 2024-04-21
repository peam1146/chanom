export enum MessageEvents {
  MESSAGE = "message",
  REACTION = "reaction",
  REPLIES = "replies",
  CREATE_COMMUNITY = "create_community",
  REGISTER_COMMUNITY = "register_community",
  USER_ACTIVE = "user_active",
  PING = "ping",
}

export type Message = {
  event: MessageEvents;
  data: string;
  roomID: string;
  createdAt?: string;
};
