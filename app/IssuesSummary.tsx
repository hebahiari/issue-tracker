import { Status } from '@prisma/client';
import { Card, Flex, Text } from '@radix-ui/themes'
import Link from 'next/link';

interface Props {
    open: number;
    closed: number;
    inProgress: number;
    total: number;
}

const IssuesSummary = ({ open, inProgress, closed, total }: Props) => {

    const types: { label: string, value: number, status?: Status }[] = [
        { label: 'All Issues', value: total },
        { label: 'Open Issues', value: open, status: 'OPEN' },
        { label: 'In Progress Issues', value: inProgress, status: 'IN_PROGRESS' },
        { label: 'Closed Issues', value: closed, status: 'CLOSED' },
    ]

    return (
        <Flex gap='4'>
            {types.map((type) => (
                <Card key={type.label}>
                    <Flex direction='column' gap='1'>
                        <Link
                            className='text-sm font-medium'
                            href={type.status ? `/issues/list?status=${type.status}` : '/issues/list'}>{type.label}</Link>
                        <Text size='3' className='font-bold'>{type.value}</Text>
                    </Flex>
                </Card>
            ))}
        </Flex>
    )
}

export default IssuesSummary