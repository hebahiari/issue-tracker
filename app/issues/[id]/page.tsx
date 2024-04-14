import prisma from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import delay from 'delay'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IoIosArrowBack } from "react-icons/io"
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'
import DeleteButton from './DeleteButton'


interface Props {
    params: { id: string }
}

const IssueDetailsPage = async ({ params }: Props) => {
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
            <Box>
                <Flex gap='4' direction={{ initial: 'column', sm: "row" }} >
                    <EditButton issueId={issue.id} />
                    <DeleteButton issueId={issue.id} />
                </Flex>
            </Box>
        </Grid>
    )
}

export default IssueDetailsPage