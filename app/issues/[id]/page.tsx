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


interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {

    const session = await getServerSession(AuthOptions)

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) notFound()

    delay(2000)

    return (
        <Grid className='space-y-3'>
            <Box>
                <Link href='/issues'><IoIosArrowBack /></Link>
                <IssueDetails issue={issue} />
            </Box>
            {session && (
                <Box>
                    <Flex gap='4'  >
                        <EditButton issueId={issue.id} />
                        <DeleteButton issueId={issue.id} />
                    </Flex>
                </Box>
            )}
        </Grid>
    )
}

export default IssueDetailsPage