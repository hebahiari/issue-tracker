import prisma from '@/prisma/client'
import { Box, Flex } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'
import DeleteButton from './DeleteButton'
import AssignUser from './assign/AssignUser'
import { cache } from 'react'
import BackButton from '../_components/BackButton'
import IssueComments from './IssueComments'


interface Props {
    params: { id: string }
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({
    where: { id: issueId }
}))

const IssueDetailsPage = async ({ params }: Props) => {

    const issue = await fetchUser(parseInt(params.id))

    if (!issue) notFound()

    return (
        <Flex direction='column' gap='4'>
            <BackButton />
            <IssueDetails issue={issue} />
            <Box>
                <Flex gap='4' direction={{ 'initial': 'column', sm: 'row' }} >
                    <AssignUser issue={issue} />
                    <EditButton issueId={issue.id} />
                    <DeleteButton issueId={issue.id} />
                </Flex>
            </Box>
            <IssueComments issueId={issue.id} />
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