"use client";

import Image from "next/image";
import Group from "../../../../../public/icon-svg/group.svg";
import CommunityRoom from "./CommunityRoom";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/dialog";
import { useState } from "react";
import CreateCommuModal from "./CreateCommuModal";
import { Message } from "@/lib/socket/types";

type CommunityBoxProps = {
  sendJsonMessage: (message: Message) => void;
  community: Message[];
  register: Message[];
  currentRoomID: string;
  setRoomID: (roomID: string) => void;
  setIsCommunity: (isCommunity: boolean) => void;
};
export default function CommunityBox(prop: CommunityBoxProps) {
  const {
    sendJsonMessage,
    community,
    register,
    currentRoomID,
    setRoomID,
    setIsCommunity,
  } = prop;
  const [isOpen, setIsOpen] = useState(false);

  const filterCommunities = community
    .reduce((filteredMessages: Message[], message) => {
      const isRoomIdEncountered = filteredMessages.some(
        (filteredMessage: Message) => filteredMessage.room === message.room,
      );

      if (!isRoomIdEncountered) {
        filteredMessages.push(message);
      }

      return filteredMessages;
    }, [])
    .map((community) => {
      const memberCommunity = register.filter(
        (message) => message.room === community.room,
      );
      return {
        ...community,
        isRegistered: memberCommunity.some(
          (message) => message.data === localStorage.getItem("username"),
        ),
      };
    });
  return (
    <>
      <div className="flex h-[308px] w-[380px] flex-col overflow-hidden rounded-lg border-2 border-brown shadow-window">
        <div className="flex justify-between border-b-2 border-brown bg-pink px-3 py-2">
          <div className="flex gap-2">
            <Image src={Group} width={24} height={24} alt="Group Icon" />
            <h1 className="h1 my-auto font-bold text-brown">
              Chanom Community
            </h1>
          </div>
          <Button
            size="sm"
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Create
          </Button>
        </div>
        <div className="flex-1 overflow-scroll bg-cream scrollbar-hide">
          {filterCommunities.length ? (
            filterCommunities.map((message) => (
              <CommunityRoom
                key={message.room}
                roomID={message.room as string}
                isRegistered={message.isRegistered}
                isChating={message.room === currentRoomID}
                sendJsonMessage={sendJsonMessage}
                setRoomID={setRoomID}
                setIsCommunity={setIsCommunity}
              />
            ))
          ) : (
            <Image
              src={Group}
              width={80}
              height={80}
              className="m-auto h-full opacity-20"
              alt="Group Icon"
            />
          )}
        </div>
      </div>
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        className="h-[276px] w-[356px] border-none p-0"
      >
        <CreateCommuModal
          setIsOpen={setIsOpen}
          sendJsonMessage={sendJsonMessage}
        />
      </Modal>
    </>
  );
}
