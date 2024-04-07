'use client'

import Image from "next/image";
import Chanom from "../../../../public/icon-svg/chanom.svg";
import Link from "next/link";

export default function SignIn() {

    const formSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;
          console.log({
            username,
            password
          });
          e.currentTarget.reset();

      };

  return (
    <div className="h-[308 px] my-auto flex w-[372px] flex-col rounded-lg border-2 border-brown overflow-hidden shadow-window">
      <div className="flex gap-x-2 bg-orange px-3 py-1 border-b-2 border-brown">
        <Image src={Chanom} width={23} height={24} alt="Chanom Icon" />
        <h1 className="font-bold text-cream">Chanom</h1>
      </div>
      <div className="bg-cream py-4">
        <form onSubmit={formSubmit} className="flex flex-col gap-y-3">
          <h1 className="self-center font-bold text-brown">Sign In</h1>
          <input
            type="text"
            className="w-[280px] self-center rounded-lg border-2 border-brown bg-transparent px-3 py-2 font-bold text-brown placeholder:text-chanom" 
            placeholder="Username"
            name="username"
          ></input>
          <input
            type="text"
            className="w-[280px] self-center rounded-lg border-2 border-brown bg-transparent px-3 py-2 font-bold text-brown placeholder:text-chanom"
            placeholder="Password"
            name="password"
          ></input>
          <button type="submit" className="self-center rounded-lg border-2 border-brown bg-orange px-5 py-1 text-cream font-bold">
            Start
          </button>
          <Link href="/signup" className="self-center font-bold text-brown underline underline-offset-4">
            Sign Up >
          </Link>
        </form>
      </div>
    </div>
  );
}
