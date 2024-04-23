"use client";
import Image from "next/image";
import Group from "../../../../../public/icon-svg/group.svg";
import Message from "../../../../../public/icon-svg/message.svg";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Modal } from "@/components/ui/dialog";
import JoinCommuModal from "./JoinCommuModal";
import { Message as MESSAGE } from "@/lib/socket/types";
type CommunityRoomProps = {
  roomID: string;
  isChating: boolean;
  isRegistered: boolean;
  sendJsonMessage: (message: MESSAGE) => void;
  setRoomID: (roomID: string) => void;
  setIsCommunity: (isCommunity: boolean) => void;
};

export default function CommunityRoom(prop: CommunityRoomProps) {
  const {
    roomID,
    isChating,
    isRegistered,
    sendJsonMessage,
    setRoomID,
    setIsCommunity,
  } = prop;
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div
        className={cn(
          "h-26 flex justify-between gap-3 border-b-2 border-brown p-2",
          isChating ? "bg-mayonnaise" : "cursor-pointer bg-white",
        )}
        onClick={(e) => {
          if (isRegistered) {
            setRoomID(roomID);
            setIsCommunity(true);
          } else {
            setIsOpen(true);
          }
        }}
      >
        <div className="rounded-full border-2 border-brown bg-mustard p-1">
          <Image src={Group} width={32} height={30} alt="Group Icon" />
        </div>
        <div className="h1 my-auto flex max-w-[256px] flex-1 gap-1 font-bold text-brown">
          <p className="truncate">{roomID}</p>{" "}
        </div>

        <Image
          src={Message}
          width={32}
          height={32}
          alt="Message Icon"
          className="my-auto"
        />
      </div>
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        className="h-[276px] w-[356px] border-none p-0"
      >
        <JoinCommuModal
          roomID={roomID}
          setIsOpen={setIsOpen}
          sendJsonMessage={sendJsonMessage}
          setRoomID={setRoomID}
        />
      </Modal>
    </>
  );
}
