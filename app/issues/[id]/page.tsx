import StatusBadge from '@/app/components/StatusBadge'
import prisma from '@/prisma/client'
import { Pencil2Icon } from '@radix-ui/react-icons'
import { Box, Button, Card, Flex, Grid, Heading, Text } from '@radix-ui/themes'
import delay from 'delay'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { IoIosArrowBack } from "react-icons/io"
import ReactMarkdown from 'react-markdown'


interface Props {
    params: { id: string }
}

const IssueDetails = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) notFound()

    delay(2000)

    return (
        <Grid columns={{ initial: '1', md: "2" }} className='space-y-3'>
            <Box>
                <Link href='/issues'><IoIosArrowBack /></Link>
                <Heading>{issue.title}</Heading>
                <Flex gap="3" my="3">
                    <StatusBadge status={issue.status} />
                    <Text>{issue.createdAt.toDateString()}</Text>
                </Flex>
                <Card>
                    <ReactMarkdown className='prose p-2'>{issue.description}</ReactMarkdown>
                </Card>
            </Box>
            <Box>
                <Link href={`/issues/${issue.id}/edit`}>
                    <Button>
                        <Pencil2Icon />Edit Issue
                    </Button>
                </Link>
            </Box>
        </Grid>
    )
}

export default IssueDetails