import Link from 'next/link'
import React from 'react'
import { GrBug } from "react-icons/gr"


const Navbar = () => {

    const links = [
        { label: 'Dashboard', href: "/" },
        { label: 'Issues', href: "/issues" }
    ]

    return (
        <nav className='flex items-center border-b space-x-6 mb-5 px-5 h-14 '>
            <Link href="/"><GrBug />
            </Link>
            <ul className='flex space-x-6'>
                {links.map((link) => <li key={link.href}><Link className='text-zinc-500 hover:text-zinc-700 transition-colors' href={link.href}>{link.label}</Link></li>
                )}            </ul>
        </nav>)
}

export default Navbar