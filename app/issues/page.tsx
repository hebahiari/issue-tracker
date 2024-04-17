import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { StatusBadge, Link } from '@/app/components'
import IssuesActions from './IssuesActions'
import { Status } from '@prisma/client'

interface Props {
    searchParams: { status: Status }
}

const IssuesPage = async ({ searchParams }: Props) => {


    const validStatuses = Object.values(Status)
    const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined

    // fetch issues
    const issues = await prisma.issue.findMany({
        where: {
            status
        }
    })

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

// to rerender the issues page to show new/updated issues:
export const dynamic = 'force-dynamic'
// OR
// export const revalidate = 0

export default IssuesPage