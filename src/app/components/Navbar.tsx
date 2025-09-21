import { SignInButton, SignedIn, SignedOut, SignOutButton, UserButton } from "@clerk/nextjs"
import Link from "next/link"
export const Navbar = () => {
    return (
        <div className="bg-gray-950 text-gray-200 p-4 flex justify-between">
            <h1 className="text-2xl">Im navbar</h1>
            <div className="flex justify-center items-center gap-2">
                <SignedOut>
                    <SignInButton mode="modal">
                        <button className="px-2 py-1 rounded-lg bg-indigo-400 text-white font-medium
                       hover:bg-indigo-500 focus:outline-none focus:ring-2
                       focus:ring-indigo-400 focus:ring-offset-2 focus:ring-offset-gray-950
                       transition-colors duration-200">Sign In!</button>
                    </SignInButton>
                </SignedOut>
                <SignedIn>
                    <UserButton />
                </SignedIn>
            </div>
        </div>
    )
}