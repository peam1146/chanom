import {
  ChatEvents,
  CommunityEvents,
  Message,
  MessageData,
  UserEvents,
} from "@/lib/socket/types";
import { useState, useEffect } from "react";

const useChatHistory = (
  messageHistory: Message[],
  roomID: string,
  myName: string,
) => {
  const [user, setUser] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    const ping = messageHistory.filter((message) => {
      return message.room === roomID && message.event === UserEvents.PING;
    });
    const otherUser = ping.filter((message) => {
      return message.data !== myName ? message.data : "";
    });

    setUser(otherUser[0]?.data ? otherUser[0].data : "");

    setMessages(
      messageHistory.filter((message: Message) => {
        return (
          message.room === roomID &&
          (message.event === ChatEvents.MESSAGE ||
            message.event === ChatEvents.REPLY ||
            message.event === CommunityEvents.REGISTER)
        );
      }),
    );
    console.log(messageHistory);
  }, [messageHistory, myName, roomID]);

  return { user, messages };
};

export default useChatHistory;
