import prisma from '@/prisma/client'
import { Table } from '@radix-ui/themes'
import { StatusBadge, Link } from '@/app/components'
import IssuesActions from './IssuesActions'
import { Issue, Status } from '@prisma/client'
import NextLink from 'next/link'
import { ArrowUpIcon } from '@radix-ui/react-icons'

interface Props {
    searchParams: { status: Status, orderBy: keyof Issue }
}

const IssuesPage = async ({ searchParams }: Props) => {

    const columns: {
        label: string;
        value: keyof Issue
        className?: string
    }[] = [
            { label: 'Issue', value: 'title' },
            { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
            { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
        ]

    const validStatuses = Object.values(Status)
    const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined

    const orderBy = columns.map(
        column => column.value).includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined

    // fetch issues
    const issues = await prisma.issue.findMany({
        where: {
            status
        },
        orderBy
    })

    return (
        <div className='space-y-3'>
            <IssuesActions />
            <Table.Root variant='surface'>
                <Table.Header>
                    <Table.Row>
                        {columns.map((column) => (
                            <Table.ColumnHeaderCell key={column.value} className={column.className}>
                                <NextLink href={{
                                    query: { ...searchParams, orderBy: column.value }
                                }}>
                                    {column.label}
                                </NextLink>
                                {column.value === searchParams.orderBy && <ArrowUpIcon className='inline' />}
                            </Table.ColumnHeaderCell>
                        ))}
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