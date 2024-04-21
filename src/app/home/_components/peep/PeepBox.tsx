import Image from "next/image";
import User from "../../../../../public/icon-svg/user.svg";
import PeepRoom from "./PeepRoom";
import { useEffect } from "react";

type MessageValue = {
  event: string;
  data: string;
  room: string;
  createdAt: string;
};

type PeepBoxProps = {
  sendMessage: (event: string, data: string, roomId: string) => void;
  messageHistory: MessageValue[];
};

export default function PeepBox(prop: PeepBoxProps) {
  const { sendMessage, messageHistory } = prop;
  const SessionId = localStorage.getItem("SessionId");
  const ActiveUser = messageHistory
    .reduce((filteredMessages: MessageValue[], message) => {
      const createdTime = new Date(message.createdAt);

      // Check if the message is "Active" and if the user is not the current user
      if (
        message.event === "Active" &&
        message.data !== localStorage.getItem("SessionId") &&
        Date.now() - createdTime.getTime() < 1500
      ) {
        // Check if the current room ID is already encountered
        const isRoomIdEncountered = filteredMessages.some(
          (filteredMessage: MessageValue) =>
            filteredMessage.room === message.room,
        );

        // If the room ID is not encountered, add the message to the filtered array
        if (!isRoomIdEncountered) {
          filteredMessages.push(message);
        }
      }

      return filteredMessages;
    }, [])
    .sort((a, b) => {
      // Sort by the "data" property in ascending order
      if (a.data < b.data) {
        return -1;
      }
      if (a.data > b.data) {
        return 1;
      }
      return 0;
    });

  return (
    <div className="flex h-[308px] w-[380px] flex-col overflow-hidden rounded-lg border-2 border-brown shadow-window">
      <div className="flex justify-between border-b-2 border-brown bg-mustard px-3 py-2">
        <div className="flex gap-2">
          <Image src={User} width={24} height={24} alt="User Icon" />
          <h1 className="h1 my-auto font-bold text-brown">Chanom Peeps</h1>
        </div>
      </div>
      <div className="flex-1 overflow-scroll  bg-cream scrollbar-hide">
        <PeepRoom name="Arm" roomId="mockJA" isChating={true} />
        {ActiveUser.sort().map((massage) => {
          const roomId = [massage.room, SessionId].sort().join("_");
          return (
            <PeepRoom name={massage.data} roomId={roomId} isChating={false} />
          );
        })}
      </div>
    </div>
  );
}
