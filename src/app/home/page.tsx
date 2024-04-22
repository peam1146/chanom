"use client";

import { useEffect, useState } from "react";
import ChatRoom from "./_components/chat/ChatRoom";
import CommunityBox from "./_components/community/CommunityBox";
import PeepBox from "./_components/peep/PeepBox";

import useWebSocket, { ReadyState } from "react-use-websocket";
import { Message, MessageEvents } from "@/lib/socket/types";
import { redirect } from "next/navigation";

export default function Page() {
  if (typeof localStorage === "undefined") {
    redirect("signin");
  }

  const SessionId = localStorage.getItem("SessionId");
  const name = localStorage.getItem("username") || "Anonymous";
  const WS_URL = `ws://localhost:8000/ws?session_id=${SessionId}`;
  const [roomID, setRoomID] = useState<string>("Welcome to Chanom!");

  const [messageHistory, setMessageHistory] = useState<Message[]>([]);
  const [community, setCommunity] = useState<Message[]>([]);
  const [activeUser, setActiveUser] = useState<Message[]>([]);
  const [register, setRegister] = useState<Message[]>([]);

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      heartbeat: {
        message: JSON.stringify({
          event: "user_active",
          data: name,
          roomID: SessionId,
        }),
        interval: 1000,
      },
    },
  );

  useEffect(() => {
    if (lastJsonMessage !== null) {
      const message = lastJsonMessage as Message;
      if (message.event == MessageEvents.USER_ACTIVE)
        setActiveUser((prev) => [...prev, message]);
      else if (message.event == MessageEvents.REGISTER_COMMUNITY)
        setRegister((prev) => [...prev, message]);
      else if (message.event == MessageEvents.CREATE_COMMUNITY)
        setCommunity((prev) => [...prev, message]);
      else setMessageHistory((prev) => [...prev, message]);
    }
  }, [lastJsonMessage]);

  const handleClickSendMessage = (message: Message) => {
    sendJsonMessage(message);
  };

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-5">
      <div className="flex flex-col gap-5">
        <PeepBox
          sendJsonMessage={handleClickSendMessage}
          activeUser={activeUser}
          setRoomID={setRoomID}
        />
        <CommunityBox
          sendJsonMessage={handleClickSendMessage}
          community={community}
          register={register}
          setRoomID={setRoomID}
        />
      </div>
      <ChatRoom
        roomID={roomID}
        roomName={roomID}
        messageHistory={messageHistory}
        sendJsonMessage={handleClickSendMessage}
        myName={name}
      />
    </div>
  );
}
