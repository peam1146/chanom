"use client";
import { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import Image from "next/image";
import CloseButton from "../CloseButton";
import { Message, ChatEvents, CommunityEvents } from "@/lib/socket/types";
import useChatHistory from "@/hooks/useChatHistory";

type ChatRoomProps = {
  roomID: string;
  roomName: string;
  myName: string;
  sendJsonMessage: (message: Message) => void;
  messageHistory: Message[];
  isCommunity: boolean;
};

export default function ChatRoom(props: ChatRoomProps) {
  const { roomID, myName, messageHistory, sendJsonMessage, isCommunity } =
    props;
  const [reply, setReply] = useState<string | null>(null);

  const { user: user, messages: chatMessages } = useChatHistory(
    messageHistory,
    roomID,
    myName,
  );

  const roomHeight = useRef<HTMLDivElement>(null);
  console.log(chatMessages);
  useEffect(() => {
    if (roomHeight.current) {
      roomHeight.current.addEventListener("DOMNodeInserted", (event) => {
        const { currentTarget: target } = event as unknown as {
          currentTarget: HTMLDivElement;
        };
        target.scroll({
          top: target.scrollHeight,
          behavior: "smooth",
        });
      });
    }
  }, [roomHeight]);

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("message") as string;
    if (!text) return;
    let data;
    if (reply) {
      data = {
        message: text,
        user: myName,
        reply: reply,
      };
    } else {
      data = {
        message: text,
        user: myName,
      };
    }
    const message = {
      event: reply ? ChatEvents.REPLY : ChatEvents.MESSAGE,
      data: JSON.stringify(data),
      roomID: roomID,
    };
    sendJsonMessage(message);
    if (isCommunity) {
      //Ping Group
      const pingMessage = {
        event: CommunityEvents.ACTIVE,
        data: "Ping",
        roomID: roomID,
      };
      sendJsonMessage(pingMessage);
    }
    e.currentTarget.reset();
    setReply(null);
  };

  return (
    <div className="relative flex h-[668px] w-[480px] flex-col rounded-lg border-2 border-brown bg-cream shadow-window">
      <div className="h1 flex h-10 w-full flex-row items-center gap-[10px] rounded-t-lg border-b-2 border-b-brown bg-green px-3 py-1 font-bold text-brown">
        <Image src="/icon-svg/message.svg" width={24} height={24} alt="chat" />
        <div>{user ? user : roomID}</div>
      </div>
      <div
        className="flex h-full flex-col gap-[10px] overflow-scroll p-3 scrollbar-hide"
        ref={roomHeight}
      >
        {chatMessages.map((message, index) => {
          if (message.event === CommunityEvents.REGISTER) {
            return (
              <div key={index} className="self-center font-bold text-brown">
                {message.data} has joined the chat.
              </div>
            );
          }
          const data = JSON.parse(message.data);
          // log reaction ของ room นี้
          const reactionsMessagesForRoom = messageHistory.filter(
            (message) =>
              message.event === ChatEvents.REACTION && message.room === roomID,
          );
          // array reaction ของแต่ละข้่อความ
          const reactionsForOneMessage = reactionsMessagesForRoom
            .filter((reactionMessage) => {
              const reactionData = JSON.parse(reactionMessage.data);
              return (
                data.message === reactionData.message.message &&
                message.createdAt === reactionData.message.createdAt
              );
            })
            .map((reaction) => JSON.parse(reaction.data).reaction);

          if (message.event === ChatEvents.MESSAGE) {
            return (
              <ChatBox
                key={index}
                message={data.message}
                sender={data.user}
                createdAt={message.createdAt || Date.now().toString()}
                reactions={reactionsForOneMessage}
                setReply={setReply}
                sendJsonMessage={sendJsonMessage}
                roomID={roomID}
              />
            );
          } else if (message.event === CommunityEvents.REGISTER) {
            return (
              <ChatBox
                key={index}
                message={data.user + " has joined the chat."}
                sender={data.user}
                createdAt={message.createdAt || Date.now().toString()}
                reactions={reactionsForOneMessage}
                setReply={setReply}
                sendJsonMessage={sendJsonMessage}
                roomID={roomID}
              />
            );
          } else {
            return (
              <ChatBox
                key={index}
                message={data.message}
                sender={data.user}
                createdAt={message.createdAt || Date.now().toString()}
                reactions={reactionsForOneMessage}
                replyMessage={data.reply}
                setReply={setReply}
                sendJsonMessage={sendJsonMessage}
                roomID={roomID}
              />
            );
          }
        })}
      </div>
      <div className="flex w-full flex-col">
        {reply && (
          <div className="flex h-8 w-full flex-row items-center gap-2 bg-chanom p-1 font-bold text-brown">
            <Image
              src="/icon-svg/reply.svg"
              width={20}
              height={20}
              alt="reply"
            />
            <div>
              {reply.slice(0, Math.min(50, reply.length)) +
                (reply.length > 50 ? "..." : "")}
            </div>
            <div className="absolute right-2" onClick={() => setReply(null)}>
              <CloseButton color="brown" width={16} height={16} />
            </div>
          </div>
        )}
        <form onSubmit={formSubmit}>
          <input
            className="h-12 w-full rounded-b-lg border-2 border-t-brown bg-cream
      px-3 py-2 font-bold text-brown placeholder-chanom placeholder:font-bold focus:border-transparent focus:outline-brown focus:ring-brown"
            placeholder="Type a message..."
            name="message"
          />
        </form>
      </div>
    </div>
  );
}

export function EmptyChatRoom() {
  return (
    <div className="flex h-[668px] w-[480px] flex-col rounded-lg border-2 border-brown bg-cream shadow-window">
      <div className="h1 flex h-10 w-full flex-row items-center gap-[10px] rounded-t-lg border-b-2 border-b-brown bg-green px-3 py-1 font-bold text-brown">
        <Image src="/icon-svg/message.svg" width={24} height={24} alt="chat" />
        <div>Welcome to Chanom!</div>
      </div>
      <div className="flex h-full w-full flex-col items-center justify-center">
        <Image
          src="/icon-svg/empty-chat.svg"
          width={64}
          height={64}
          alt="chat"
        />
      </div>
      <div className="flex w-full flex-col">
        <form>
          <input
            className="h-12 w-full rounded-b-lg border-2 border-t-brown bg-cream
      px-3 py-2 font-bold text-brown placeholder-chanom placeholder:font-bold focus:border-transparent focus:outline-brown focus:ring-brown"
            placeholder="Type a message..."
            disabled
          />
        </form>
      </div>
    </div>
  );
}
