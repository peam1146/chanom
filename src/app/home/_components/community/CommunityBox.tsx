"use client";

import Image from "next/image";
import Group from "../../../../../public/icon-svg/group.svg";
import CommunityRoom from "./CommunityRoom";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/dialog";
import { useState } from "react";
import CreateCommuModal from "./CreateCommuModal";

function CreateCommunityModal() {
  return <div></div>;
}

export default function CommunityBox() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex h-[308px] w-[380px] flex-col overflow-hidden rounded-lg border-2 border-brown shadow-window">
        <div className="flex justify-between border-b-2 border-brown bg-pink px-3 py-2">
          <div className="flex gap-2">
            <Image src={Group} width={24} height={24} alt="Group Icon" />
            <h1 className="h1 my-auto font-bold text-brown">
              Chanom Community
            </h1>
          </div>
          <Button
            size="sm"
            onClick={(e) => {
              setIsOpen(true);
            }}
          >
            Create
          </Button>
        </div>
        <div className="flex-1 overflow-scroll bg-cream scrollbar-hide">
          <CommunityRoom
            name="We love Chanom"
            numberOfMembers={200000000}
            isChating={true}
          />
          <CommunityRoom
            name="Maltese Lover"
            numberOfMembers={99}
            isChating={false}
          />
          <CommunityRoom
            name="9 ขุนเขา 8 ศรีธนร 1 โลกธาตุ พันจักรวาลรวมเป็นสหโลกธาตุ ตรีสหโลกธาตุ รวมกันเเล้วไม่มีสิ่งใดที่ตัดไม่ได้"
            numberOfMembers={11}
            isChating={false}
          />
          <CommunityRoom name="F4" numberOfMembers={90} isChating={false} />
          <CommunityRoom
            name="10 20 30 40"
            numberOfMembers={88}
            isChating={false}
          />
          <CommunityRoom
            name="Tictoker"
            numberOfMembers={88}
            isChating={false}
          />
        </div>
      </div>
      <Modal
        open={isOpen}
        onOpenChange={setIsOpen}
        className="h-[276px] w-[356px] border-none p-0"
      >
        <CreateCommuModal setIsOpen={setIsOpen} />
      </Modal>
    </>
  );
}
