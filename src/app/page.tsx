export default function Home() {
  return (
    <div className="bg-gray-900 min-h-screen flex flex-col items-center text-gray-200">
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
        <button
          className="px-2 py-1 rounded-lg bg-teal-900 text-white font-medium
                 hover:bg-teal-950 focus:outline-none focus:ring-2
                 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-gray-950
                 transition-colors duration-200"
        >
          Get Started!
        </button>
      </div>
    </div>
  );
}
