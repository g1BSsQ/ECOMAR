import Link from "next/link"
import { Avatar, AvatarImage, AvatarFallback } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { CloudIcon, MenuIcon } from "lucide-react"
import { useWallet } from '@meshsdk/react';
export function Header() {
    const { connected } = useWallet();
    return (
        <><Link href="/" className="flex items-center gap-2 font-bold text-xl" prefetch={false}>
            <CloudIcon className="h-6 w-6" />
            Carbon Exchange
        </Link><Avatar className="ml-auto h-8 w-8 rounded-full mr-4">
                <Link href="/myaccount" prefetch={false}>
                    <AvatarImage src="/placeholder-user.jpg" alt="User Avatar" />
                </Link>
                <AvatarFallback>JD</AvatarFallback>
            </Avatar><nav className="hidden md:flex items-center gap-4">
                <Link href="/about" className="hover:underline" prefetch={false}>
                    About
                </Link>
                <Link href="/marketplace" className="hover:underline" prefetch={false}>
                    Marketplace
                </Link>
                <Link href="/mint" className="hover:underline" prefetch={false}>
                    Mint
                </Link>
                <Button variant="outline" className="bg-blue-500 text-primary-foreground px-12 py-3">
                    <Link href="/connectwallet">
                        {connected ? 'Connected' : 'Connect Wallet'}
                    </Link>
                </Button>
            </nav><Button variant="outline" size="icon" className="md:hidden">
                <MenuIcon className="h-6 w-6" />
                <span className="sr-only">Toggle menu</span>
            </Button></>
    );
}