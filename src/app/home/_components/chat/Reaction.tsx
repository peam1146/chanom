import { ReactionProps } from "../../types";
import Image from "next/image";
import { cn } from "@/lib/utils";

export default function Reaction(props: ReactionProps) {
  const { type, className, onClick } = props;

  return (
    <Image
      src={`/icon-svg/${type}.svg`}
      width={28}
      height={28}
      alt={type}
      className={cn(className)}
    />
  );
}
