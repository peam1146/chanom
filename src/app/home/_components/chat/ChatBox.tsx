"use client";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Reaction from "./Reaction";
import { ReactionType, type ReactionProps } from "../../types";
import {
  Popover,
  PopoverContent,
  PopoverPortal,
  PopoverTrigger,
} from "@radix-ui/react-popover";
import { useState } from "react";
import { Button } from "@/components/ui/button";

type ChatBoxProps = {
  message: string;
  isMe: boolean;
  replyMessage?: string;
  read?: number;
  reactions?: ReactionProps[];
  setReply?: (reply: string) => void;
};

export default function ChatBox(props: ChatBoxProps) {
  const { isMe, read, reactions } = props;
  const justify = isMe ? "items-end" : "items-start";
  const [open, setOpen] = useState(false);

  const handleOpen = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setOpen(!open);
  };
  return (
    <div className={cn("flex h-fit w-full flex-col", justify)}>
      {!isMe && <div className="h1 font-bold text-brown">Mild mumu</div>}
      <ReplyChatBox {...props} />
      <div className="flex flex-row gap-2">
        {isMe && read && (
          <div className="h2 self-end font-bold text-chanom">read ({read})</div>
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

        {!isMe && read && (
          <div className="h2 self-end font-bold text-chanom">read ({read})</div>
        )}
      </div>
      {reactions && <ReactionGroup {...props} />}
    </div>
  );
}

function ChatMessage(props: ChatBoxProps) {
  const { message, isMe } = props;
  const background = isMe ? "bg-green" : "bg-mustard";
  return (
    <span
      className={cn(
        "h2 flex h-fit w-fit max-w-[320px] rounded-lg border-2 border-brown px-3 py-2 text-start font-bold",
        background,
      )}
    >
      {message}
    </span>
  );
}

function ReplyChatBox(props: ChatBoxProps) {
  const { isMe, replyMessage } = props;
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
  let { reactions, isMe } = props;
  return (
    <div className="flex flex-row-reverse gap-1 pt-1">
      {reactions
        ?.slice(0, 6)
        .map((reaction, index) => <Reaction key={index} {...reaction} />)}
    </div>
  );
}

type AddReactionProps = ChatBoxProps & {
  close: () => void;
};

function AddReaction(props: AddReactionProps) {
  const { close, message, setReply } = props;
  const [selected, setSelected] = useState<ReactionType | null>(null);
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
          close();
          setReply?.(message);
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
              setSelected(reaction);
              close();
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
