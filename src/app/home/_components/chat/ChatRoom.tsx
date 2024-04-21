"use client";
import { useEffect, useRef, useState } from "react";
import ChatBox from "./ChatBox";
import Image from "next/image";
import CloseButton from "../CloseButton";
import useWebSocket from "react-use-websocket";
import { MessageEvents, Message } from "@/lib/socket/types";
import { checkMyMessage } from "@/lib/socket/chatroom";

type ChatRoomProps = {
  roomName: string;
  numberOfMembers?: number;
  myName: string;
};

export default function ChatRoom(props: ChatRoomProps) {
  const { roomName, numberOfMembers, myName } = props;
  const [reply, setReply] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(
    "ws://localhost:8000/ws" + "?session_id=2517814484082876365",
    {
      onOpen: () => console.log("opened"),
      onClose: () => console.log("closed"),
      onError: (event) => console.error("error", event),
      onMessage: (event) => console.log("message", event.data),
    },
  );

  useEffect(() => {
    if (lastJsonMessage) {
      const message = lastJsonMessage;
      setMessages((prev) => [...prev, message]);
    }
  }, [lastJsonMessage]);

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
      data: myName + ":" + text,
      roomID: roomName,
    };
    sendJsonMessage(message);
    // console.log("sent", message);
    e.currentTarget.reset();
    setReply(null);
  };

  return (
    <div className="relative flex h-[668px] w-[480px] flex-col rounded-lg border-2 border-brown bg-cream shadow-window">
      <div className="h1 flex h-10 w-full flex-row items-center gap-[10px] rounded-t-lg border-b-2 border-b-brown bg-green px-3 py-1 font-bold text-brown">
        <Image src="/icon-svg/message.svg" width={24} height={24} alt="chat" />
        <div>
          {roomName}{" "}
          {numberOfMembers && numberOfMembers > 999 ? (
            <span>(999+)</span>
          ) : (
            <span>({numberOfMembers})</span>
          )}
        </div>
      </div>
      <div
        className="flex h-full flex-col gap-[10px] overflow-scroll p-3 scrollbar-hide"
        ref={roomHeight}
      >
        <ChatBox
          message="Yes, I want to be your gf."
          isMe={true}
          read={3}
          replyMessage="Do you want to be my gf?"
          reactions={[
            { type: "heart" },
            { type: "like" },
            { type: "ok" },
            { type: "skull" },
            { type: "star" },
            { type: "fire" },
            { type: "heart" },
            { type: "heart" },
            { type: "heart" },
            { type: "heart" },
            { type: "heart" },
          ]}
          setReply={setReply}
        />
        {messages.map((message, index) => {
          return (
            <ChatBox
              key={index}
              message={message.data.split(":")[1]}
              isMe={checkMyMessage(myName, message)}
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
