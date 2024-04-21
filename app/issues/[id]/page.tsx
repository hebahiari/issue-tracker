import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import delay from 'delay'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IoIosArrowBack } from "react-icons/io"
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'
import DeleteButton from './DeleteButton'
import { getServerSession } from 'next-auth'
import AuthOptions from '@/app/auth/AuthOptions'
import AssignUser from './assign/AssignUser'
import { cache } from 'react'


interface Props {
    params: { id: string }
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({
    where: { id: issueId }
}))

const IssueDetailsPage = async ({ params }: Props) => {

    const session = await getServerSession(AuthOptions)

    const issue = await fetchUser(parseInt(params.id))

    if (!issue) notFound()

    delay(2000)

    return (
        <Flex direction='column' gap='4'>
            <Link href='/issues'><IoIosArrowBack size='20' style={{ color: 'var(--sand-10)' }} /></Link>
            <IssueDetails issue={issue} />
            {session && (
                <Box>
                    <Flex gap='4' direction={{ 'initial': 'column', md: 'row' }} >
                        <AssignUser issue={issue} />
                        <EditButton issueId={issue.id} />
                        <DeleteButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Flex>
    )
}

export async function generateMetadata({ params }: Props) {
    const issue = await fetchUser(parseInt(params.id))

    return {
        title: issue?.title,
        description: `Details of issue ${issue?.id}`
    }
}

export default IssueDetailsPage