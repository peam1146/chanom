"use client";

import Image from "next/image";
import Group from "../../../../../public/icon-svg/group.svg";
import CommunityRoom from "./CommunityRoom";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/dialog";
import { useState } from "react";
import CreateCommuModal from "./CreateCommuModal";
import useWebSocket from "react-use-websocket";

type MessageValue = {
  event: string;
  data: string;
  room: string;
  createAt: Date;
};

type CommunityBoxProps = {
  sendMessage: (event: string, data: string, roomId: string) => void;
  messageHistory: MessageValue[];
};
export default function CommunityBox(prop: CommunityBoxProps) {
  const { sendMessage, messageHistory } = prop;
  const [isOpen, setIsOpen] = useState(false);

  const communities = messageHistory.filter(
    (message) => message.event === "Create Community",
  );

  const register = messageHistory.filter(
    (message) => message.event === "Register Community",
  );

  const filterCommunities = communities.map((community) => {
    const memberCommunity = register.filter(
      (message) => message.room === community.room,
    );
    console.log(memberCommunity);
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
          <CommunityRoom
            name="We love Chanom"
            numberOfMembers={200000000}
            isRegistered={true}
            isChating={true}
            sendMessage={sendMessage}
          />
          {filterCommunities.map((msg) => (
            <CommunityRoom
              key={msg.room} // Add a unique key prop for each element in the list
              name={msg.room}
              numberOfMembers={msg.numberMember}
              isRegistered={msg.isRegistered}
              isChating={false}
              sendMessage={sendMessage}
            />
          ))}
        </div>
      </div>
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        className="h-[276px] w-[356px] border-none p-0"
      >
        <CreateCommuModal setIsOpen={setIsOpen} sendMessage={sendMessage} />
      </Modal>
    </>
  );
}
