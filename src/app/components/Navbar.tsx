import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
import Link from "next/link";
export const Navbar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900  text-gray-200 p-4 flex justify-between">
      <Link href="/">
        <h1 className="font-mono text-2xl">Splitty</h1>
      </Link>
      <div className="flex justify-center items-center gap-2">
        <SignedOut>
          <SignInButton mode="modal">
            <button className="button">Sign In!</button>
          </SignInButton>
        </SignedOut>
        <SignedIn>
          <UserButton
            appearance={{
              elements: {
                avatarBox: "border-2 border-white rounded-full",
              },
            }}
          />
        </SignedIn>
      </div>
    </div>
  );
};
