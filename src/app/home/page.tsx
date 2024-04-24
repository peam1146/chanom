"use client";

import { useEffect, useState } from "react";
import ChatRoom, { EmptyChatRoom } from "./_components/chat/ChatRoom";
import CommunityBox from "./_components/community/CommunityBox";
import PeepBox from "./_components/peep/PeepBox";
import useWebSocket from "react-use-websocket";
import { CommunityEvents, Message, UserEvents } from "@/lib/socket/types";
import { useRouter } from "next/navigation";

import Image from "next/image";

export default function Page() {
  const router = useRouter();
  if (typeof localStorage === "undefined") {
    router.push("/signin");
  }

  const SessionId = localStorage.getItem("SessionId");
  const name = localStorage.getItem("username") || "Anonymous";
  const WS_URL = `${process.env.WS_URL}/ws?session_id=${SessionId}`;
  const [roomID, setRoomID] = useState<string>("Welcome to Chanom!");
  const [isCommunity, setIsCommunity] = useState<boolean>(false);

  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [community, setCommunity] = useState<Message[]>([]);
  const [activeUser, setActiveUser] = useState<Message[]>([]);
  const [register, setRegister] = useState<Message[]>([]);

  const { sendJsonMessage, lastJsonMessage } = useWebSocket(WS_URL, {
    heartbeat: {
      message: JSON.stringify({
        event: "user_active",
        data: name,
        roomID: SessionId,
      }),
      interval: 1000,
    },
  });

  const handleLogout = () => {
    localStorage.removeItem("SessionId");
    localStorage.removeItem("username");
    router.push("/signin");
  };

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const message = lastJsonMessage as Message;
      if (message.event == UserEvents.USER_ACTIVE)
        setActiveUser((prev) => [...prev, message]);
      else if (message.event == CommunityEvents.REGISTER) {
        setRegister((prev) => [...prev, message]);
        setMessageHistory((prev) => [...prev, message]);
      } else if (
        message.event == CommunityEvents.CREATE ||
        message.event == CommunityEvents.ACTIVE
      )
        setCommunity((prev) => [...prev, message]);
      else setMessageHistory((prev) => [...prev, message]);
    }
  }, [lastJsonMessage]);

  const handleClickSendMessage = (message: Message) => {
    sendJsonMessage(message);
  };

  return (
    <div className="bg-chanom">
      <div className="flex h-screen w-screen flex-row items-center justify-center gap-5">
        <div className="flex flex-col gap-5">
          <PeepBox
            sendJsonMessage={handleClickSendMessage}
            activeUser={activeUser}
            currentRoomID={roomID}
            setRoomID={setRoomID}
            setIsCommunity={setIsCommunity}
          />
          <CommunityBox
            sendJsonMessage={handleClickSendMessage}
            community={community}
            register={register}
            currentRoomID={roomID}
            setRoomID={setRoomID}
            setIsCommunity={setIsCommunity}
          />
        </div>
        {roomID !== "Welcome to Chanom!" ? (
          <ChatRoom
            roomID={roomID}
            roomName={roomID}
            messageHistory={messageHistory}
            sendJsonMessage={handleClickSendMessage}
            myName={name}
            isCommunity={isCommunity}
          />
        ) : (
          <EmptyChatRoom />
        )}

        <>
          <div className="flex flex-col">
            <div className="flex flex-col content-center justify-center">
              <div
                onClick={handleLogout}
                className="mx-3 my-3 flex h-[72px] w-[72px] cursor-pointer content-center justify-center rounded-lg border-2 border-brown bg-orange shadow-window"
              >
                <Image
                  src={"./icon-svg/logout.svg"}
                  width={48}
                  height={48}
                  alt="icon"
                />
              </div>
              <div className="h2 text-center font-bold text-brown">logout</div>
            </div>
          </div>
        </>
      </div>
    </div>
  );
}
