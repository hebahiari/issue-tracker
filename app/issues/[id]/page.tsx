import prisma from '@/prisma/client'
import { Box, Grid } from '@radix-ui/themes'
import delay from 'delay'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IoIosArrowBack } from "react-icons/io"
import EditButton from './EditButton'
import IssueDetails from './IssueDetails'


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
        <Grid columns={{ initial: '1', md: "2" }} className='space-y-3'>
            <Box>
                <Link href='/issues'><IoIosArrowBack /></Link>
                <IssueDetails issue={issue} />
            </Box>
            <Box>
                <EditButton issueId={issue.id} />
            </Box>
        </Grid>
    )
}

export default IssueDetailsPage