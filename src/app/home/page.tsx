import ChatRoom from "./_components/chat/ChatRoom";

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <ChatRoom roomName="Panda's Room" numberOfMembers={40} />
    </div>
  );
}
