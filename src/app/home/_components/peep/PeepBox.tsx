import Image from "next/image";
import User from "../../../../../public/icon-svg/user.svg";
import PeepRoom from "./PeepRoom";
import { Message } from "@/lib/socket/types";

type PeepBoxProps = {
  sendJsonMessage: (message: Message) => void;
  activeUser: Message[];
  currentRoomID: string;
  setRoomID: (roomID: string) => void;
  setIsCommunity: (isCommunity: boolean) => void;
};

export default function PeepBox(prop: PeepBoxProps) {
  const {
    sendJsonMessage,
    activeUser,
    currentRoomID,
    setRoomID,
    setIsCommunity,
  } = prop;
  const SessionId = localStorage.getItem("SessionId");
  const ActiveUser = activeUser
    .reduce((filteredMessages: Message[], message) => {
      const createdTime = new Date(message.createdAt || Date.now());

      // Check if the message is "Active" and if the user is not the current user
      if (
        message.data !== localStorage.getItem("username") &&
        Date.now() - createdTime.getTime() < 5000
      ) {
        // Check if the current room ID is already encountered
        const isRoomIdEncountered = filteredMessages.some(
          (filteredMessage: Message) => filteredMessage.room === message.room,
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
        {ActiveUser.length ? (
          ActiveUser.sort().map((message) => {
            const roomId = [message.room, SessionId].sort().join("_");
            return (
              <PeepRoom
                key={roomId}
                name={message.data}
                roomID={roomId}
                isChating={roomId === currentRoomID}
                setRoomID={setRoomID}
                setIsCommunity={setIsCommunity}
                sendJsonMessage={sendJsonMessage}
              />
            );
          })
        ) : (
          <Image
            src={User}
            width={80}
            height={80}
            className="m-auto h-full opacity-20"
            alt="Group Icon"
          />
        )}
      </div>
    </div>
  );
}
