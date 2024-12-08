import { auth, signIn, signOut } from "@/auth"
import { BadgePlus, LogOut, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

const Navbar = async () => {

    const session = await auth()
    return (
        <header className="px-5 py-3 shadow-sm bg-black-1 rounded-lg" >
            <nav className="flex justify-between items-center" >
                <Link href="/">
                    <Image src="/logo.png" alt="logo" width={144} height={35} />
                </Link>

                <div className="flex items-center gap-5 text-white-1">
                    {session && session?.user ? (
                        <>
                            <form action={async () => {
                                "use server"
                                await signOut({
                                    redirectTo: "/"
                                });
                            }}>
                                <button type="submit" >
                                    <span className="max-sm:hidden" > Logout </span>
                                    <LogOut className="size-6 sm:hidden text-red-400" />
                                </button>
                            </form>

                            <Link href="/community/create">
                                <span className="max-sm:hidden" > Create </span>
                                <BadgePlus className="size-6 sm:hidden" />
                            </Link>

                            <Link href="/community/all">
                                <span className="max-sm:hidden" > Communities </span>
                                <Users className="size-6 sm:hidden" />
                            </Link>

                            <Link href={`/user/${session?.id}`} className="flex gap-3 items-center">
                                <Avatar className="size-10" >
                                    <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || ""} />
                                    <AvatarFallback> ... </AvatarFallback>
                                </Avatar>
                            </Link>
                        </>
                    ) : (
                        <>
                            <form action={async () => {
                                "use server"
                                await signIn()
                            }} >
                                <button type="submit">
                                    Login
                                </button>
                            </form>

                            <Link href="/community/all">
                                <span className="max-sm:hidden" > Communities </span>
                                <Users className="size-6 sm:hidden" />
                            </Link>

                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar
