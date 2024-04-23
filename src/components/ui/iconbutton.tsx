import Image from "next/image";
export default function iconbutton({
  text,
  // imgStr,
}: {
  text: string;
  // imgStr: string;
}) {
  return (
    <>
      <div className="flex flex-col content-center justify-center">
        <div className="mx-3 my-3 flex h-[72px] w-[72px] content-center justify-center rounded-lg border-2 border-brown bg-orange shadow-window">
          <Image
            src={"./icon-svg/logout.svg"}
            width={48}
            height={48}
            alt="icon"
          />
        </div>
        <div className="h2 text-center font-bold text-brown">logout</div>
      </div>
    </>
  );
}
