import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import delay from 'delay'
import { StatusBadge, Link } from '@/app/components'
import IssuesActions from './IssuesActions'

const IssuesPage = async () => {

    // fetch issues
    const issues = await prisma.issue.findMany()
    await delay(100)

    return (
        <div className='space-y-3'>
            <IssuesActions />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        <Table.ColumnHeaderCell>Issue</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Status</Table.ColumnHeaderCell>
                        <Table.ColumnHeaderCell className='hidden md:table-cell'>Created</Table.ColumnHeaderCell>
                    </Table.Row>
                </Table.Header>
                <Table.Body>
                    {issues.map((issue) =>
                        <Table.Row key={issue.id} className='hover:bg-slate-50'>
                            <Table.Cell>
                                <Link href={`issues/${issue.id}`}>{issue.title}</Link>
                                <div className='block md:hidden'><StatusBadge status={issue.status} /></div>
                            </Table.Cell>
                            <Table.Cell className='hidden md:table-cell'><StatusBadge status={issue.status} /></Table.Cell>
                            <Table.Cell className='hidden md:table-cell'>{issue.createdAt.toDateString()}</Table.Cell>
                        </Table.Row>
                    )}
                </Table.Body>
            </Table.Root>
        </div>
    )
}

export default IssuesPage