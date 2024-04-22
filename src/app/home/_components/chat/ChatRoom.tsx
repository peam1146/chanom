"use client";
import { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import Image from "next/image";
import CloseButton from "../CloseButton";
import { MessageEvents, Message } from "@/lib/socket/types";
import useChatHistory from "@/hooks/useChatHistory";

type ChatRoomProps = {
  roomID: string;
  roomName: string;
  numberOfMembers?: number;
  myName: string;
  sendJsonMessage: (message: Message) => void;
  messageHistory: Message[];
};

export default function ChatRoom(props: ChatRoomProps) {
  const { roomID, numberOfMembers, myName, messageHistory, sendJsonMessage } =
    props;
  const [reply, setReply] = useState<string | null>(null);

  const { user: user, messages: chatMessages } = useChatHistory(
    messageHistory,
    roomID,
    myName,
  );

  const roomHeight = useRef<HTMLDivElement>(null);

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
  }, []);

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const text = formData.get("message") as string;
    if (!text) return;
    const message = {
      event: reply ? MessageEvents.REPLIES : MessageEvents.MESSAGE,
      data: reply ? myName + ":" + text + ":" + reply : myName + ":" + text,
      roomID: roomID,
    };
    sendJsonMessage(message);
    e.currentTarget.reset();
    setReply(null);
  };

  return (
    <div className="relative flex h-[668px] w-[480px] flex-col rounded-lg border-2 border-brown bg-cream shadow-window">
      <div className="h1 flex h-10 w-full flex-row items-center gap-[10px] rounded-t-lg border-b-2 border-b-brown bg-green px-3 py-1 font-bold text-brown">
        <Image src="/icon-svg/message.svg" width={24} height={24} alt="chat" />
        <div>
          {user ? user : roomID}
          {numberOfMembers && numberOfMembers > 999 ? (
            <span>(999+)</span>
          ) : numberOfMembers ? (
            <span>({numberOfMembers})</span>
          ) : (
            ""
          )}
        </div>
      </div>
      <div
        className="flex h-full flex-col gap-[10px] overflow-scroll p-3 scrollbar-hide"
        ref={roomHeight}
      >
        {chatMessages.map((message, index) => {
          return (
            <ChatBox
              key={index}
              message={message.data.split(":")[1]}
              sender={message.data.split(":")[0]}
              replyMessage={
                message.event === MessageEvents.REPLIES
                  ? message.data.split(":")[2]
                  : undefined
              }
              setReply={setReply}
            />
          );
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
        <div>Chat Room</div>
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
