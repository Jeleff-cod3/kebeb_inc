'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function HomePage() {
    const router = useRouter();

    return (
        <div className="min-h-screen bg-black text-white flex flex-col">
            {/* Navbar */}
            <nav className="w-full flex items-start justify-between px-8 py-4">
                <button
                    className="bg-gray-200 text-black px-6 py-2 rounded-full font-semibold"
                    onClick={() => router.push('/menu')}
                >
                    MENU
                </button>

                <div className="text-4xl font-bold flex items-center justify-center gap-2 mt-2">
                    <Image src="/logo.png" width={355} height={175} alt="dragon logo" />
                </div>

                <div className="flex gap-4">
                    <button
                        onClick={() => router.push('/order')}
                        className="px-6 py-2 bg-gray-200 text-black rounded-full font-semibold"
                    >
                        CART
                    </button>
                    <button
                        onClick={() => router.push('/profile')}
                        className="px-6 py-2 bg-gray-200 text-black rounded-full font-semibold"
                    >
                        PROFILE
                    </button>
                </div>
            </nav>

            <main className="flex-grow flex justify-center items-center px-10 py-6">
                <div className="flex gap-10 items-center">
                    <div className="bg-gray-200 text-black p-8 rounded-xl shadow-xl max-w-xs">
                        <p className="font-semibold text-lg">
                            GRILLZILLA WAS FOUNDED BY AHMED ALI, A KEBAB MASTER WHOSE PASSION FOR PERFECTING THE DISH WAS PASSED DOWN THROUGH GENERATIONS.
                            THE SECRET TO THEIR SUCCESS? A DEDICATION TO FLAVOR AND A LOVE FOR THE CRAFT.
                        </p>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                        <div className="col-span-1">
                            <Image
                                src="/kebab1.jpg"
                                width={150}
                                height={150}
                                alt="Kebab 1"
                                className="rounded-xl object-cover"
                            />
                        </div>
                        <div className="col-span-1">
                            <Image
                                src="/kebab2.jpg"
                                width={150}
                                height={150}
                                alt="Kebab 2"
                                className="rounded-xl object-cover"
                            />
                        </div>
                        <div className="col-span-2 flex justify-center">
                            <Image
                                src="/kebab3.jpg"
                                width={150}
                                height={150}
                                alt="Kebab 3"
                                className="rounded-xl object-cover"
                            />
                        </div>
                    </div>
                </div>
            </main>

            <footer className="text-center py-6">
                <p className="text-lg font-semibold">
                    Grillzilla isn't just a restaurant—it's family tradition on a plate.
                </p>
            </footer>
        </div>
    );
}