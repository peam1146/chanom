export enum ChatEvents {
  CREATE = "create",
  DELETE = "delete",
}

export enum MessageEvents {
  MESSAGE = "message",
  REACTION = "reaction",
  REPLIES = "replies",
}

export enum UserEvents {
  JOIN = "join",
  LEAVE = "leave",
}

export type Message = {
  event: MessageEvents;
  data: string;
  roomID: string;
};
