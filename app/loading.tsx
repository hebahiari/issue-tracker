import { Grid, Flex, Heading, Card, Link, Text, Avatar, Table } from '@radix-ui/themes'
import { Skeleton, StatusBadge } from '@/app/components'
import { Status } from '@prisma/client'

const types: { label: string, status?: Status }[] = [
    { label: 'All Issues' },
    { label: 'Open Issues', status: 'OPEN' },
    { label: 'In Progress Issues', status: 'IN_PROGRESS' },
    { label: 'Closed Issues', status: 'CLOSED' },
]

const recentIssues = [1, 2, 3, 4]

const DashboardLoadingPage = () => {
    return (
        <Grid columns={{ 'initial': '1', md: '2' }} gap='5'>
            <Flex direction='column' gap='5'>
                <Heading size='4'>Issues Summary</Heading>
                <Flex gap='4'>
                    {types.map((type) => (
                        <Card key={type.label}>
                            <Flex direction='column' gap='1'>
                                <Text
                                    className='text-sm font-medium'
                                >{type.label}</Text>
                                <Skeleton />
                            </Flex>
                        </Card>
                    ))}
                </Flex>
                <Skeleton width='100%' height={300} />
            </Flex>
            <Card>
                <Heading size='4' m='2'>Recent Issues</Heading>
                <Table.Root>
                    <Table.Body>
                        {recentIssues.map((issue) => (
                            <Table.Row key={issue}>
                                <Table.Cell>
                                    <Flex justify='between'>
                                        <Flex direction='column' align='start' gap='2'>
                                            <Skeleton width={300} />
                                            <Skeleton width={100} />
                                        </Flex>
                                    </Flex>
                                </Table.Cell>
                            </Table.Row>
                        ))}
                    </Table.Body>
                </Table.Root>
            </Card>
        </Grid>)
}

export default DashboardLoadingPage