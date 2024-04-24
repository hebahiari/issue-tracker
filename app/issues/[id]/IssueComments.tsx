import { Card, Heading, Table, Flex, Avatar, Text, Box } from '@radix-ui/themes'
import Link from 'next/link'
import NewComment from './NewComment'
import prisma from '@/prisma/client'
import { useSession } from 'next-auth/react'


const IssueComments = async ({ issueId }: { issueId: number }) => {

    // fetch comments
    const comments = await prisma.comment.findMany({
        where: {
            relatedIssue: 21,

        }, include: {
            assignToUser: true
        }
    })


    return (
        <Card>
            <Heading size='4' m='2'>Comments</Heading>
            <Table.Root>
                <Table.Body>
                    <Table.Row>
                        <Table.Cell>
                            <Box className='pb-3'>
                                <NewComment issueId={issueId} />
                            </Box>
                        </Table.Cell>
                    </Table.Row>
                    {comments.map((comment) => (
                        <Table.Row key={comment.id}>
                            <Table.Cell >
                                <Flex direction='column' gap='4' className='py-3'>
                                    <Flex gap='2' >
                                        <Avatar
                                            src={comment.assignToUser?.image!}
                                            fallback='?'
                                            size='2'
                                            radius='full'
                                        />
                                        <Text size='4'>
                                            {comment.assignToUser?.name}
                                        </Text>
                                    </Flex>
                                    <Text>{comment.description}</Text>
                                </Flex>
                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>)
}

export default IssueComments