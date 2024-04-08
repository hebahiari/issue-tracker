'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { GrBug } from "react-icons/gr"
import classNames from 'classnames'


const Navbar = () => {

    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: "/" },
        { label: 'Issues', href: "/issues" }
    ]

    return (
        <nav className='flex items-center border-b space-x-6 mb-5 px-5 h-14 '>
            <Link href="/"><GrBug />
            </Link>
            <ul className='flex space-x-6'>
                {links.map((link) => <li key={link.href}><Link className={classNames({
                    'text-zinc-900': link.href === currentPath,
                    'text-zinc-500': link.href !== currentPath,
                    'hover:text-zinc-800 transition-colors': true
                })} href={link.href}>{link.label}</Link></li>
                )}            </ul>
        </nav>)
}

export default Navbar