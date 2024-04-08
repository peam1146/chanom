import Image from "next/image";
import User from "../../../../../public/icon-svg/user.svg";
import PeepRoom from "./PeepRoom";
export default function PeepBox() {
  return (
    <div className="flex h-[308px] w-[380px] flex-col overflow-hidden rounded-lg border-2 border-brown shadow-window">
      <div className="flex justify-between border-b-2 border-brown bg-mustard px-3 py-2">
        <div className="flex gap-2">
          <Image src={User} width={24} height={24} alt="User Icon" />
          <h1 className="h1 my-auto font-bold text-brown">Chanom Peeps</h1>
        </div>
      </div>
      <div className="flex-1 overflow-scroll  bg-cream scrollbar-hide">
        <PeepRoom name="Arm" isChating={true} />
        <PeepRoom name="Benz" isChating={false} />
        <PeepRoom name="Mind" isChating={false} />
        <PeepRoom name="Peam" isChating={false} />
      </div>
    </div>
  );
}
