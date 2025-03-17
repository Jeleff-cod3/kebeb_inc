import Link from "next/link";

export default function Home() {
  return (
    <div>
      <p className="text-xl flex items-center justify-center font-extrabold text-2xl">
        WELCOME TO OUR KEBAB STORE!
      </p>
      <Link href="/order">
        <div className="flex items-center justify-center">
          <button className="cursor-pointer bg-blue-500 text-white border border-blue-500 font-bold py-2 px-4 rounded hover:bg-blue-700 transition-all duration 300">
            Order now
          </button>
        </div>
      </Link>
    </div>
  );
}
