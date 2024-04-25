import prisma from "@/prisma/client"
import { Avatar, Card, Flex, Heading, Table } from "@radix-ui/themes"
import { StatusBadge } from "./components"
import Link from "next/link"
import ToolTip from "./components/ToolTip"
import { Issue, User } from "@prisma/client"

type IssueWithAssignee = Issue & { assignToUser?: User | null }

const RecentIssues = async () => {

    let recentIssues: IssueWithAssignee[] = []

    try {
        recentIssues = await prisma.issue.findMany({
            orderBy: { createdAt: 'desc' },
            take: 5,
            include: {
                assignToUser: true
            }
        })
    } catch (error) {

    }

    return (
        <Card>
            <Heading size='4' m='2'>Recent Issues</Heading>
            <Table.Root>
                <Table.Body>
                    {recentIssues.map((issue) => (
                        <Table.Row key={issue.id}>
                            <Table.Cell>
                                <Flex justify='between'>
                                    <Flex direction='column' align='start' gap='2'>
                                        <Link href={`/issues/${issue.id}`}>{issue.title}
                                        </Link>
                                        <StatusBadge status={issue.status} />
                                    </Flex>
                                    {issue.assignToUser && (
                                        <ToolTip user={issue.assignToUser} />
                                    )}
                                </Flex>

                            </Table.Cell>
                        </Table.Row>
                    ))}
                </Table.Body>
            </Table.Root>
        </Card>)
}

export default RecentIssues