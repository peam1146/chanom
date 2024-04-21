"use client";

import Image from "next/image";
import Group from "../../../../../public/icon-svg/group.svg";
import CommunityRoom from "./CommunityRoom";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/dialog";
import { useState } from "react";
import CreateCommuModal from "./CreateCommuModal";
import { Message, MessageEvents } from "@/lib/socket/types";

type CommunityBoxProps = {
  sendJsonMessage: (message: Message) => void;
  messageHistory: Message[];
  setRoomID: (roomID: string) => void;
};
export default function CommunityBox(prop: CommunityBoxProps) {
  const { sendJsonMessage, messageHistory, setRoomID } = prop;
  const [isOpen, setIsOpen] = useState(false);

  const communities = messageHistory.filter(
    (message) => message.event === MessageEvents.CREATE_COMMUNITY,
  );
  const register = messageHistory.filter(
    (message) => message.event === MessageEvents.REGISTER_COMMUNITY,
  );

  const filterCommunities = communities.map((community) => {
    const memberCommunity = register.filter(
      (message) => message.room === community.room,
    );
    return {
      ...community,
      numberMember: memberCommunity.length,
      isRegistered: memberCommunity.some(
        (message) => message.data === localStorage.getItem("SessionId"),
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
            onClick={(e) => {
              setIsOpen(true);
            }}
          >
            Create
          </Button>
        </div>
        <div className="flex-1 overflow-scroll bg-cream scrollbar-hide">
          {filterCommunities.map((msg) => (
            <CommunityRoom
              key={msg.room}
              roomID={msg.room}
              numberOfMembers={msg.numberMember}
              isRegistered={msg.isRegistered}
              isChating={false}
              sendJsonMessage={sendJsonMessage}
              setRoomID={setRoomID}
            />
          ))}
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
