'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { GrBug } from "react-icons/gr"
import classNames from 'classnames'
import { useSession } from 'next-auth/react'
import { Avatar, Box, Container, DropdownMenu, Flex, Text } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'


const Navbar = () => {

    return (
        <nav className='border-b px-5 py-3'>
            <Container>
                <Flex justify='between'>
                    <Flex align='center' gap='3'>
                        <Link href="/"><GrBug size='15' /></Link>
                        <NavLinks />
                    </Flex>
                    <Box>
                        <AuthStatus />
                    </Box>
                </Flex>
            </Container>
        </nav>
    )
}

const NavLinks = () => {
    const currentPath = usePathname()

    const links = [
        { label: 'Dashboard', href: "/" },
        { label: 'Issues', href: "/issues/list" }
    ]

    return <ul className='flex space-x-6'>
        {links.map((link) => <li key={link.href}>
            <Link className={classNames({
                'nav-link': true,
                '!text-zinc-900': link.href === currentPath,
            })} href={link.href}>{link.label}
            </Link>
        </li>
        )}
    </ul>
}

const AuthStatus = () => {
    const { status, data: session } = useSession()

    if (status === 'loading') return <Skeleton width='3rem' />

    if (status === 'authenticated') {
        return (<DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <Avatar
                    src={session.user!.image!}
                    fallback='?'
                    size='2'
                    radius='full'
                    className='cursor-pointer' />
            </DropdownMenu.Trigger>
            <DropdownMenu.Content>
                <DropdownMenu.Label>
                    <Text size='2'>
                        {session.user!.email}
                    </Text>
                </DropdownMenu.Label>
                <DropdownMenu.Item>
                    <Link href='/api/auth/signout' style={{ 'width': "100%" }}>Log out</Link>
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>)
    }

    if (status === "unauthenticated") {
        return (
            <Link
                className='nav-link'
                href='/api/auth/signin'>Log in</Link>
        )
    }
}

export default Navbar