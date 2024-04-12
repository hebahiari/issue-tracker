import StatusBadge from '@/app/components/StatusBadge'
import prisma from '@/prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import ReactMarkdown from 'react-markdown'
import { IoIosArrowBack } from "react-icons/io";
import Link from 'next/link'


interface Props {
    params: { id: string }
}

const IssueDetails = async ({ params }: Props) => {
    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (!issue) notFound()

    return (
        <div className='space-y-3'>
            <Link href='/issues'><IoIosArrowBack /></Link>
            <Heading>{issue.title}</Heading>
            <Flex gap="3" my="3">
                <StatusBadge status={issue.status} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                <ReactMarkdown className='prose p-2'>{issue.description}</ReactMarkdown>
            </Card>
        </div>
    )
}

export default IssueDetails