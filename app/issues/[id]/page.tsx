import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import delay from 'delay'
import { notFound } from 'next/navigation'
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'
import DeleteButton from './DeleteButton'
import AssignUser from './assign/AssignUser'
import { cache } from 'react'
import BackButton from '../_components/BackButton'


interface Props {
    params: { id: string }
}

const fetchUser = cache((issueId: number) => prisma.issue.findUnique({
    where: { id: issueId }
}))

const IssueDetailsPage = async ({ params }: Props) => {

    const issue = await fetchUser(parseInt(params.id))

    if (!issue) notFound()

    delay(2000)

    return (
        <Flex direction='column' gap='4'>
            <BackButton />
            <IssueDetails issue={issue} />
            {(
                <Box>
                    <Flex gap='4' direction={{ 'initial': 'column', sm: 'row' }} >
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