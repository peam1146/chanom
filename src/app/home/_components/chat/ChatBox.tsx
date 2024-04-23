"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Reaction from "./Reaction";
import { ReactionType } from "../../types";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChatEvents, Message } from "@/lib/socket/types";
import * as Tooltip from "@radix-ui/react-tooltip";

type ChatBoxProps = {
  message: string;
  sender: string;
  replyMessage?: string;
  reactions?: ReactionType[];
  setReply?: (reply: string) => void;
  sendJsonMessage: (message: Message) => void;
  createdAt: string;
  roomID: string;
};

export default function ChatBox(props: ChatBoxProps) {
  const { sender, createdAt, reactions } = props;
  const myName = localStorage.getItem("username") || "me";
  const isMe = sender === myName;
  const justify = isMe ? "items-end" : "items-start";
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <div className={cn("flex h-fit w-full flex-col", justify)}>
      {!isMe && <div className="h1 font-bold text-brown">{sender}</div>}
      <ReplyChatBox {...props} />
      <div className="flex flex-row gap-2">
        {isMe && (
          <div className="h3 self-end font-bold text-chanom">
            {new Date(createdAt).toTimeString().split(" ")[0].slice(0, 5)}
          </div>
        )}
        <Popover open={open}>
          <PopoverTrigger>
            <div onContextMenu={handleOpen} className="hover:cursor-default">
              <ChatMessage {...props} />
            </div>
          </PopoverTrigger>
          <PopoverPortal>
            <PopoverContent>
              <AddReaction close={() => setOpen(false)} {...props} />
            </PopoverContent>
          </PopoverPortal>
        </Popover>

        {!isMe && (
          <div className="h3 self-end font-bold text-chanom">
            {new Date(createdAt).toTimeString().split(" ")[0].slice(0, 5)}
          </div>
        )}
      </div>
      {reactions && <ReactionGroup {...props} />}
    </div>
  );
}

function ChatMessage(props: ChatBoxProps) {
  const { message, sender } = props;
  const myName = localStorage.getItem("username") || "me";
  const isMe = sender === myName;
  const background = isMe ? "bg-green" : "bg-mustard";
  return (
    <span
      className={cn(
        "h2 flex h-fit w-fit max-w-[320px] rounded-lg border-2 border-brown px-3 py-2 text-start font-bold",
        background,
      )}
    >
      <div className="break-all">{message}</div>
    </span>
  );
}

function ReplyChatBox(props: ChatBoxProps) {
  const { sender, replyMessage } = props;
  const myName = localStorage.getItem("username") || "me";
  const isMe = sender === myName;
  const justify = isMe ? "justify-end" : "justify-start";
  return (
    <div className={cn("flex h-fit w-full flex-row gap-1 pb-1", justify)}>
      {replyMessage && (
        <>
          <Image src="/icon-svg/reply.svg" width={20} height={20} alt="reply" />
          <div className="h2 font-bold text-brown">
            {replyMessage.slice(0, Math.min(30, replyMessage.length)) +
              (replyMessage.length > 30 ? "..." : "")}
          </div>
        </>
      )}
    </div>
  );
}

function ReactionGroup(props: ChatBoxProps) {
  let { reactions, sender } = props;
  const myName = localStorage.getItem("username") || "me";
  const isMe = sender === myName;
  return (
    // More than 6 wrapped in a div
    <div className="mt-1 flex flex-row gap-1">
      {reactions &&
        reactions
          .slice(0, 6)
          .map((reaction, index) => <Reaction key={index} type={reaction} />)}
      {reactions && reactions.length > 6 && (
        <Tooltip.Provider>
          <Tooltip.Root>
            <Tooltip.Trigger>
              <div className="flex h-7 w-7 items-center justify-center rounded-full bg-brown">
                <div className="font-bold text-cream">
                  +{reactions.length - 6}
                </div>
              </div>
            </Tooltip.Trigger>
            <ReactionTooltip reactions={reactions.slice(6)} />
          </Tooltip.Root>
        </Tooltip.Provider>
      )}
    </div>
  );
}

function ReactionTooltip({ reactions }: { reactions: ReactionType[] }) {
  return (
    <Tooltip.Content sideOffset={5} side="bottom">
      <div className="flex flex-row gap-1 rounded-lg border-2 border-brown bg-cream p-1">
        {reactions.map((reaction, index) => (
          <Reaction key={index} type={reaction} />
        ))}
      </div>
    </Tooltip.Content>
  );
}

type AddReactionProps = ChatBoxProps & {
  close: () => void;
};

function AddReaction(props: AddReactionProps) {
  const { close, message, setReply, sendJsonMessage, createdAt, roomID } =
    props;
  const reactions: ReactionType[] = [
    "heart",
    "like",
    "ok",
    "skull",
    "star",
    "fire",
  ];
  return (
    <div className="mt-2 flex h-[84px] w-[224px] flex-col gap-2 rounded-lg border-2 border-brown bg-cream p-2">
      <Button
        size="sm"
        className="w-full"
        onClick={() => {
          setReply?.(message);
          close();
        }}
      >
        Reply
      </Button>
      <div className="flex flex-row justify-center gap-2">
        {reactions.map((reaction: ReactionType, index) => (
          <div
            key={index}
            className="h-7 w-7"
            onClick={() => {
              close();
              const toSend: Message = {
                event: ChatEvents.REACTION,
                data: JSON.stringify({
                  reaction: reaction,
                  message: {
                    message: message,
                    createdAt: createdAt,
                  },
                }),
                roomID: roomID,
              };
              sendJsonMessage(toSend);
            }}
          >
            <Reaction
              type={reaction}
              className="hover:cursor-pointer hover:rounded-full
                hover:border-2 hover:border-brown hover:opacity-80"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
