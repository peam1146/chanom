import ChatRoom from "./_components/chat/ChatRoom";
import CommunityBox from "./_components/community/CommunityBox";
import PeepBox from "./_components/peep/PeepBox";

export default function Page() {
  return (
    <div className="flex h-screen w-screen items-center justify-center gap-5">
      <div className="flex flex-col gap-5">
        <PeepBox />
        <CommunityBox />
      </div>
      <ChatRoom roomName="Panda's Room" numberOfMembers={40} />
    </div>
  );
}
