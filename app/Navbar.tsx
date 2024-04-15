'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import { GrBug } from "react-icons/gr"
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Box } from '@radix-ui/themes'


const Navbar = () => {

    const currentPath = usePathname()
    const { status, data: session } = useSession()

    const links = [
        { label: 'Dashboard', href: "/" },
        { label: 'Issues', href: "/issues" }
    ]

    return (
        <nav className='flex items-center border-b space-x-6 mb-5 px-5 h-14 '>
            <Link href="/"><GrBug /></Link>
            <ul className='flex space-x-6'>
                {links.map((link) => <li key={link.href}>
                    <Link className={classNames({
                        'text-zinc-900': link.href === currentPath,
                        'text-zinc-500': link.href !== currentPath,
                        'hover:text-zinc-800 transition-colors': true
                    })} href={link.href}>{link.label}
                    </Link>
                </li>
                )}
            </ul>
            <Box>
                {status === 'authenticated' &&
                    (<Link href='/api/auth/signout'>Log out</Link>)}
                {status === 'unauthenticated' &&
                    (<Link href='/api/auth/signin'>Log in</Link>)}
            </Box>
        </nav>
    )
}

export default Navbar