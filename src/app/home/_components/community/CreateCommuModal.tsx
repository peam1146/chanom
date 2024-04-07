import Image from "next/image";
import Chanom from "../../../../../public/icon-svg/chanom.svg";
import { Button } from "@/components/ui/button";

type CreateCommuModalProps = {
  setIsOpen: (value: boolean) => void;
};

export default function CreateCommuModal(prop: CreateCommuModalProps) {
  const { setIsOpen } = prop;

  const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name");
    console.log(name);
    setIsOpen(false);
  };

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border-2 border-brown shadow-window">
      <div className="flex gap-x-2 border-b-2 border-brown bg-orange px-3 py-1">
        <Image src={Chanom} width={23} height={24} alt="Chanom Icon" />
        <h1 className="h1 font-bold text-cream">Create Group Chat</h1>
      </div>
      <div className="item-center flex h-full flex-col justify-center bg-cream py-4">
        <form onSubmit={formSubmit} className="flex flex-col gap-6 ">
          <input
            type="text"
            className="h1 w-[280px] self-center rounded-xl border-2 border-brown bg-transparent px-3 py-2 font-bold text-brown placeholder:text-chanom"
            placeholder="Group Name"
            name="name"
          ></input>
          <Button size="lg" type="submit" className="w-[91px] self-center">
            Create
          </Button>
        </form>
      </div>
    </div>
  );
}
