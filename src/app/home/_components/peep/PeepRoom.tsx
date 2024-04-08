"use client";
import Image from "next/image";
import User from "../../../../../public/icon-svg/user.svg";
import Message from "../../../../../public/icon-svg/message.svg";
import { cn } from "@/lib/utils";

type PeepRoomProps = {
  name: string;
  isChating: boolean;
};

export default function PeepRoom(prop: PeepRoomProps) {
  const { name, isChating } = prop;

  return (
    <div
      className={cn(
        "h-26 flex justify-between gap-3 border-b-2 border-brown p-2",
        isChating ? "bg-mayonnaise" : "cursor-pointer bg-white",
      )}
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
