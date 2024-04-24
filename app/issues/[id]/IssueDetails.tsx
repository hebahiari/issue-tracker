import { StatusBadge } from '@/app/components'
import { Issue } from '@prisma/client'
import { Card, Flex, Heading, Text } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'
import ChangeStatus from './ChangeStatus'

const IssueDetails = ({ issue }: { issue: Issue }) => {
    return (
        <>
            <Heading>{issue.title}</Heading>
            <Flex gap="3">
                <ChangeStatus issue={issue} />
                <Text>{issue.createdAt.toDateString()}</Text>
            </Flex>
            <Card>
                <ReactMarkdown className='prose p-2'>{issue.description}</ReactMarkdown>
            </Card>
        </>
    )
}

export default IssueDetails