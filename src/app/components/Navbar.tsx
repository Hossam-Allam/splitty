import { SignInButton, SignedIn, SignedOut, UserButton } from "@clerk/nextjs";
export const Navbar = () => {
  return (
    <div className="bg-gradient-to-b from-gray-950 to-gray-900 border-b-1 border-white text-gray-200 p-4 flex justify-between">
      <h1 className="font-mono text-2xl">Splitter</h1>
      <div className="flex justify-center items-center gap-2">
        <SignedOut>
          <SignInButton mode="modal">
            <button
              className="px-2 py-1 rounded-lg bg-teal-900 text-white font-medium
                       hover:bg-teal-950 focus:outline-none focus:ring-2
                       focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-950
                       transition-colors duration-200"
            >
              Sign In!
            </button>
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
