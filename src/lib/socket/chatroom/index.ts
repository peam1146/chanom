export function checkRoomID(
  id: string,
  lastMessage: {
    room: string;
    data: string;
    event: string;
  },
): boolean {
  return id === lastMessage.room;
}

export function checkMyMessage(
  myName: string,
  message: {
    data: string;
  },
): boolean {
  return message.data.startsWith(myName);
}
