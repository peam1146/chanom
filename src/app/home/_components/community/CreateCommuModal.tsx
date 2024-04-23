import Image from "next/image";
import Chanom from "../../../../../public/icon-svg/chanom.svg";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { CommunityEvents, Message, UserEvents } from "@/lib/socket/types";

type CreateCommuModalProps = {
  setIsOpen: (value: boolean) => void;
  sendJsonMessage: (message: Message) => void;
};

export default function CreateCommuModal(prop: CreateCommuModalProps) {
  const { setIsOpen, sendJsonMessage } = prop;

  const [error, setError] = useState<String>("");

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    try {
      const createCommunityMessage: Message = {
        event: CommunityEvents.CREATE,
        data: "Create Success",
        roomID: name as string,
      };
      const registerCommunityMessage: Message = {
        event: CommunityEvents.REGISTER,
        data: localStorage.getItem("username") as string,
        roomID: name as string,
      };

      sendJsonMessage(createCommunityMessage);
      sendJsonMessage(registerCommunityMessage);
      setIsOpen(false);
    } catch (err) {
      setError("This name is already existed.");
    }
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border-2 border-brown shadow-window">
      <div className="flex gap-x-2 border-b-2 border-brown bg-orange px-3 py-1">
        <Image src={Chanom} width={23} height={24} alt="Chanom Icon" />
        <h1 className="h1 font-bold text-cream">Create Group Chat</h1>
      </div>
      <div className="item-center flex h-full flex-col justify-center bg-cream py-4">
        <form onSubmit={formSubmit} className="flex flex-col gap-6 ">
          <div className="flex flex-col gap-1">
            <input
              type="text"
              className="h1 w-[280px] self-center rounded-xl border-2 border-brown bg-transparent px-3 py-2 font-bold text-brown placeholder:text-chanom"
              placeholder="Group Name"
              name="name"
              required
            ></input>
            {error && (
              <p className="h2 self-center text-center font-bold text-brown">
                {error}
              </p>
            )}
          </div>
          <Button size="lg" type="submit" className="w-[91px] self-center">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
