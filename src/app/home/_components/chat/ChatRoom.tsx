"use client";
import { useState } from "react";
import ChatBox from "./ChatBox";
import Image from "next/image";
import CloseButton from "../../../../components/CloseButton";
type ChatRoomProps = {
  roomName: string;
  numberOfMembers?: number;
};

export default function ChatRoom(props: ChatRoomProps) {
  const { roomName, numberOfMembers } = props;
  const [reply, setReply] = useState<string | null>(null);

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const message = formData.get("message") as string;
    if (message) {
      console.log({
        message,
        reply,
      });
    }
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
      <div className="flex h-full flex-col gap-[10px] overflow-scroll p-3 scrollbar-hide">
        <ChatBox
          message="Hi, cutie. Do you have an bf?"
          isMe={false}
          read={10}
          setReply={setReply}
        />
        <ChatBox
          message="No, I don't have a bf."
          isMe={true}
          read={5}
          setReply={setReply}
        />
        <ChatBox
          message="Do you want to be my gf?"
          isMe={false}
          replyMessage="No, I don't have a bf."
          read={4}
          setReply={setReply}
          reactions={[{ type: "heart" }, { type: "like" }, { type: "ok" }]}
        />
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
        <ChatBox
          message="Hi, cutie. Do you have an bf?"
          isMe={false}
          read={10}
          setReply={setReply}
        />
        <ChatBox
          message="No, I don't have a bf.No, I don't have a bf.No, I don't have a bf.No, I don't have a bf.No, I don't have a bf."
          isMe={true}
          read={5}
          setReply={setReply}
        />
        <ChatBox
          message="Do you want to be my gf?"
          isMe={false}
          replyMessage="No, I don't have a bf.No, I don't have a bf.No, I don't have a bf.No, I don't have a bf.No, I don't have a bf."
          read={4}
          setReply={setReply}
        />
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
