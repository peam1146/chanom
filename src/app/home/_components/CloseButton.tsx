import { cn } from "@/lib/utils";
type CloseButtonProps = {
  color?: string;
  width?: number;
  height?: number;
};

export default function CloseButton(props: CloseButtonProps) {
  const color =
    props.color === "brown"
      ? "fill-brown hover:fill-white"
      : "fill-white hover:fill-brown";

  return (
    <svg
      width={props.width || 25}
      height={props.height || 24}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("hover:cursor-pointer", color)}
    >
      <path d="M16.6935 7.38462H14.8474V9.23077H16.6935V7.38462Z" />
      <path d="M16.6935 14.7692H14.8474V16.6154H16.6935V14.7692Z" />
      <path d="M14.8474 9.23077H13.0012V11.0769H14.8474V9.23077Z" />
      <path d="M14.8474 12.9231H13.0012V14.7692H14.8474V12.9231Z" />
      <path d="M9.30889 7.38462H7.46274V9.23077H9.30889V7.38462Z" />
      <path d="M9.30889 14.7692H7.46274V16.6154H9.30889V14.7692Z" />
      <path d="M7.46274 5.53846H5.61659V7.38462H7.46274V5.53846Z" />
      <path d="M18.5397 5.53846H16.6935V7.38462H18.5397V5.53846Z" />
      <path d="M11.155 12.9231H9.30889V14.7692H11.155V12.9231Z" />
      <path d="M11.155 9.23077H9.30889V11.0769H11.155V9.23077Z" />
      <path d="M13.0012 11.0769H11.155V12.9231H13.0012V11.0769Z" />
      <path d="M7.46274 16.6154H5.61659V18.4615H7.46274V16.6154Z" />
      <path d="M18.5397 16.6154H16.6935V18.4615H18.5397V16.6154Z" />
      <path d="M22.232 1.84616V8.0698e-08H1.92428V1.84615L22.232 1.84616Z" />
      <path d="M0.078125 22.1538H1.92428V1.84615H0.078125V22.1538Z" />
      <path d="M22.232 24V22.1538H1.92428V24H22.232Z" />
      <path d="M24.0781 1.84615L22.232 1.84616V22.1538H24.0781V1.84615Z" />
    </svg>
  );
}
