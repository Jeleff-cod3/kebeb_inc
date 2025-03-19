'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-lime-100 text-white flex flex-col overflow-x-hidden">
      {/* Navbar */}
      <nav className="w-full flex items-start justify-between px-8 pt-6">
        <button
          className="bg-white text-black px-6 py-2 rounded-full font-semibold"
          onClick={() => router.push('/menu')}
        >
          MENU
        </button>

        <div className="flex gap-4">
          <button
            onClick={() => router.push('/order')}
            className="px-6 py-2 bg-white text-black rounded-full font-semibold"
          >
            CART
          </button>
          <button
            onClick={() => router.push('/profile')}
            className="px-6 py-2 bg-white text-black rounded-full font-semibold"
          >
            PROFILE
          </button>
        </div>
      </nav>

      {/* Title */}
      <div className="text-center my-8">
        <h1 className="text-6xl font-extrabold tracking-widest text-lime-600">
          KEBAB.INC
        </h1>
      </div>

      {/* Main Content */}
      <main className="flex-grow flex flex-col items-center justify-center px-8 py-4">
        <div className="flex gap-10 items-center justify-center">
          {/* Description Panel */}
          <div className="bg-white text-black p-8 rounded-xl shadow-xl max-w-sm">
            <div className="flex justify-center my-4">
              <Image src="/logo.png" width={250} height={120} alt="Grillzilla Logo" />
            </div>
            <p className="font-semibold text-lg">
              GRILLZILLA WAS FOUNDED BY AHMED ALI, A KEBAB MASTER WHOSE PASSION FOR PERFECTING THE DISH WAS PASSED DOWN THROUGH GENERATIONS. THE SECRET TO THEIR SUCCESS? A DEDICATION TO FLAVOR AND A LOVE FOR THE CRAFT.
            </p>
          </div>

          {/* Image Gallery with Fire Animation */}
          <div className="grid grid-cols-2 gap-4 bg-white 200 rounded-xl p-4 shadow-xl">
            {['kebab1.jpg', 'kebab2.jpg', 'kebab3.jpg', 'kebab4.jpg'].map((src, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 relative"
              >
                <Image
                  src={`/${src}`}
                  width={300}
                  height={200}
                  alt={`Kebab ${i + 1}`}
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 rounded-xl pointer-events-none animate-flame-border"></div>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll Prompt */}
      </main>

      {/* Footer */}
      <footer className="text-center py-6">
        <p className="text-lg font-semibold">
          Grillzilla isn't just a restaurant—it's family tradition on a plate.
        </p>
      </footer>

      {/* Fire Animation CSS */}
      <style jsx global>{`
  @keyframes flame {
    0% {
      box-shadow: 0 0 10px #ff9a00, 0 0 15px #ff4e00, 0 0 20px #ff0000;
    }
    50% {
      box-shadow: 0 0 12px #ff4e00, 0 0 18px #ff0000, 0 0 24px #ff9a00;
    }
    100% {
      box-shadow: 0 0 10px #ff9a00, 0 0 15px #ff4e00, 0 0 20px #ff0000;
    }
  }

  .animate-flame-border {
    animation: flame 1.5s infinite alternate;
    border-radius: 0.75rem; /* matches rounded-xl */
  }
`}</style>

    </div>
  );
}
