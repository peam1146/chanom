"use client";

import Image from "next/image";
import Chanom from "../../../../public/icon-svg/chanom.svg";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SignIn() {
  const route = useRouter();
  const [errorMsg, setErrorMsg] = useState<String>("");

  const formSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    try {
      await fetch(`${process.env.API_URL}/signin`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: username,
          password: password,
        }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error();
          }
          return response.text(); // Extract the response body as text
        })
        .then((sessionId) => {
          // Store the session ID in localStorage
          if (typeof localStorage !== "undefined") {
            localStorage.setItem("SessionId", sessionId);
            localStorage.setItem("username", username);
          }
        });

      route.push("../home");
    } catch (err) {
      setErrorMsg("Username or Password is wrong.");
    }
  };

  return (
    <div className="h-[308 px] my-auto flex w-[372px] flex-col overflow-hidden rounded-lg border-2 border-brown shadow-window">
      <div className="flex gap-x-2 border-b-2 border-brown bg-orange px-3 py-1">
        <Image src={Chanom} width={23} height={24} alt="Chanom Icon" />
        <h1 className="h1 font-bold text-cream">Chanom</h1>
      </div>
      <div className="bg-cream py-4">
        <form onSubmit={formSubmit} className="flex flex-col gap-y-3">
          <h1 className="h1 self-center font-bold text-brown">Sign In</h1>
          <input
            type="text"
            className="h1 w-[280px] self-center rounded-xl border-2 border-brown bg-transparent px-3 py-2 font-bold text-brown placeholder:text-chanom"
            placeholder="Username"
            name="username"
          ></input>
          <input
            type="text"
            className="h1 w-[280px] self-center rounded-xl border-2 border-brown bg-transparent px-3 py-2 font-bold text-brown placeholder:text-chanom"
            placeholder="Password"
            name="password"
          ></input>
          {errorMsg && (
            <p className="h2 self-center font-bold text-orange">{errorMsg}</p>
          )}
          <Button size="lg" type="submit" className="w-[91px] self-center">
            Start
          </Button>
          <Link
            href="/signup"
            className="h1 self-center font-bold text-brown underline underline-offset-[5px]"
          >
            Sign Up {">"}
          </Link>
        </form>
      </div>
    </div>
  );
}
