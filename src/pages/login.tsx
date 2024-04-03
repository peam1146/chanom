import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

import { Button } from "~/components/ui/button";

export function Login() {
  const { data } = useSession();
  return (
    <div className="h-screen w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div className="grid gap-2 text-center">
            {data ? data.user.name : null}
            <h1 className="text-3xl font-bold">Login</h1>
            <Button
              variant="default"
              className="w-full"
              onClick={() => signIn("discord")}
            >
              Login with Discord
            </Button>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:block">
        <Image
          src="https://ui.shadcn.com/placeholder.svg"
          alt="Image"
          width="1920"
          height="1080"
          className="h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}

export default Login;
