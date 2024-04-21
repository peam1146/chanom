"use client";

import { useEffect, useState } from "react";
import ChatRoom from "./_components/chat/ChatRoom";
import CommunityBox from "./_components/community/CommunityBox";
import PeepBox from "./_components/peep/PeepBox";

import useWebSocket, { ReadyState } from "react-use-websocket";

type MessageValue = {
  event: string;
  data: string;
  room: string;
  createAt: Date;
};

export default function Page() {
  const SessionId = localStorage.getItem("SessionId");
  const WS_URL = `ws://localhost:8000/ws?session_id=${SessionId}`;

  const [messageHistory, setMessageHistory] = useState<MessageValue[]>([]);

  const { sendMessage, lastMessage, readyState } = useWebSocket(WS_URL);

  useEffect(() => {
    if (lastMessage !== null) {
      const message = JSON.parse(lastMessage.data);
      setMessageHistory((prev) => prev.concat(message));
    }
  }, [lastMessage]);

  const handleClickSendMessage = (
    event: string,
    data: string,
    roomId: string,
  ) => {
    const objectMsg = {
      Event: event,
      Data: data,
      RoomID: roomId,
    };

    // Send the payload as a JSON string
    sendMessage(JSON.stringify(objectMsg));
  };

  const connectionStatus = {
    [ReadyState.CONNECTING]: "Connecting",
    [ReadyState.OPEN]: "Open",
    [ReadyState.CLOSING]: "Closing",
    [ReadyState.CLOSED]: "Closed",
    [ReadyState.UNINSTANTIATED]: "Uninstantiated",
  }[readyState];

  return (
    <div className="flex h-screen w-screen items-center justify-center gap-5">
      <div className="flex flex-col gap-5">
        <PeepBox />
        <CommunityBox
          sendMessage={handleClickSendMessage}
          messageHistory={messageHistory}
        />
      </div>
      <ChatRoom roomName="Panda's Room" numberOfMembers={40} />
    </div>
  );
}
