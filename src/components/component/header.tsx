import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { CloudIcon, MenuIcon } from "lucide-react"
import ConnectionHandler from "./ConnectionHandler";
export function Header() {
    return (
        <><Link href="/" className="flex Credits-center gap-2 font-bold text-xl" prefetch={false}>
            <CloudIcon className="h-6 w-6" />
            Carbon Exchange
        </Link><Avatar className="ml-auto h-8 w-8 rounded-full mr-4">
                <Link href="/myaccount" prefetch={false}>
                    <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                </Link>
                <AvatarFallback>JD</AvatarFallback>
            </Avatar><nav className="hidden md:flex Credits-center gap-4">
                <Link href="/about" className="hover:underline" prefetch={false}>
                    About
                </Link>
                <Link href="/marketplace" className="hover:underline" prefetch={false}>
                    Marketplace
                </Link>
                <Link href="/mint" className="hover:underline" prefetch={false}>
                    Mint
                </Link>
                <ConnectionHandler isDisabled={false} />
            </nav><Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
            </Button></>
    );
}