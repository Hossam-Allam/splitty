import Link from "next/link";
export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center text-gray-200">
      <div className="mt-5 flex flex-col items-center flex-grow justify-center">
        <h1 className="font-sans text-4xl">Welcome to</h1>
        <h1 className="font-mono text-emerald-600 text-4xl mb-10">Splitty</h1>
        <p className="font-sans text-2xl text-center mb-10">
          A simple solution for large groups wanting to manage bill splitting.
          <br />
          <br />
          Create a new bill. <br />
          Invite your friends. <br />
          Enter your items and their prices. <br />
          Check the total and YOUR total.
        </p>
        <Link href="/main">
          <button className="button">Get Started!</button>
        </Link>
      </div>
    </div>
  );
}
