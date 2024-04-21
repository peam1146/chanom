import Image from "next/image";
import Chanom from "../../../../../public/icon-svg/chanom.svg";
import { Button } from "@/components/ui/button";
import { Message, MessageEvents } from "@/lib/socket/types";
type JoinCommuModalProps = {
  name: string;
  setIsOpen: (value: boolean) => void;
  sendJsonMessage: (message: Message) => void;
};

export default function JoinCommuModal(prop: JoinCommuModalProps) {
  const { name, setIsOpen, sendJsonMessage } = prop;

  const handleClick = () => {
    sendJsonMessage({
      event: MessageEvents.REGISTER_COMMUNITY,
      data: localStorage.getItem("SessionId") as string,
      roomID: name,
    });
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border-2 border-brown shadow-window">
      <div className="flex gap-x-2 border-b-2 border-brown bg-orange px-3 py-1">
        <Image src={Chanom} width={23} height={24} alt="Chanom Icon" />
        <h1 className="h1 font-bold text-cream">Create Group Chat</h1>
      </div>
      <div className="item-center flex h-full flex-col justify-center gap-6 bg-cream px-3">
        <div className="max-h-[140px] overflow-scroll scrollbar-hide">
          <p className="h1 self-center text-center font-bold text-brown">
            You want to join
          </p>
          <p className="h1 self-center text-center font-bold text-brown">{`'${name}' ?`}</p>
        </div>
        <Button
          size="lg"
          className="w-[91px] self-center"
          onClick={handleClick}
        >
          Join
        </Button>
      </div>
    </div>
  );
}
