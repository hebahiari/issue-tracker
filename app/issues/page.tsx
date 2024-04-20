import prisma from '@/prisma/client'
import { Issue, Status } from '@prisma/client'
import Pagination from '../components/Pagination'
import IssuesTable, { IssueQuery } from './_components/IssuesTable'
import IssuesActions from './IssuesActions'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
    searchParams: IssueQuery
}

const IssuesPage = async ({ searchParams }: Props) => {

    const validStatuses = Object.values(Status)
    const status = validStatuses.includes(searchParams.status) ? searchParams.status : undefined

    const where = { status }

    const orderBy = columnNames
        .includes(searchParams.orderBy)
        ? { [searchParams.orderBy]: 'asc' }
        : undefined

    const page = parseInt(searchParams.page) || 1
    const pageSize = 10;

    // fetch issues
    const issues = await prisma.issue.findMany({
        where,
        orderBy,
        skip: (page - 1) * pageSize,
        take: pageSize
    })

    const issueCount = await prisma.issue.count({ where })

    return (
        <Flex direction='column' gap='3'>
            <IssuesActions />
            <IssuesTable issues={issues} searchParams={searchParams} />
            <Pagination
                pageSize={pageSize}
                currentPage={page}
                itemCount={issueCount} />
        </Flex>
    )
}

const columns: {
    label: string;
    value: keyof Issue
    className?: string
}[] = [
        { label: 'Issue', value: 'title' },
        { label: 'Status', value: 'status', className: 'hidden md:table-cell' },
        { label: 'Created', value: 'createdAt', className: 'hidden md:table-cell' }
    ]

export const columnNames = columns.map(column => column.value)

// to rerender the issues page to show new/updated issues:
export const dynamic = 'force-dynamic'
// OR
// export const revalidate = 0

export const metadata: Metadata = {
    title: 'Issue Tracker - Issues List',
    description: 'View of the project&apos;s isssues',
}

export default IssuesPage