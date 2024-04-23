"use client";
import Image from "next/image";
import User from "../../../../../public/icon-svg/user.svg";
import Message from "../../../../../public/icon-svg/message.svg";
import { cn } from "@/lib/utils";
import { Message as MESSAGE, UserEvents } from "@/lib/socket/types";

type PeepRoomProps = {
  name: string;
  roomID: string;
  isChating: boolean;
  setRoomID: (roomID: string) => void;
  setIsCommunity: (isCommunity: boolean) => void;
  sendJsonMessage: (message: MESSAGE) => void;
};

export default function PeepRoom(prop: PeepRoomProps) {
  const {
    name,
    setRoomID,
    isChating,
    roomID,
    setIsCommunity,
    sendJsonMessage,
  } = prop;

  return (
    <div
      className={cn(
        "h-26 flex justify-between gap-3 border-b-2 border-brown p-2",
        isChating ? "bg-mayonnaise" : "cursor-pointer bg-white",
      )}
      onClick={() => {
        setIsCommunity(false);
        setRoomID(roomID);
        sendJsonMessage({
          event: UserEvents.PING,
          data: name,
          roomID: roomID,
        });
      }}
    >
      <div className="rounded-full border-2 border-brown bg-mustard p-1">
        <Image src={User} width={32} height={30} alt="Group Icon" />
      </div>
      <div className="h1 my-auto flex max-w-[256px] flex-1 font-bold text-brown">
        <p className="truncate">{name}</p>
      </div>

      <Image
        src={Message}
        width={32}
        height={32}
        alt="Message Icon"
        className="my-auto"
      />
    </div>
  );
}
