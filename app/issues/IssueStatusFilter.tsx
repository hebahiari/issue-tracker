'use client'

import { Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useRouter } from 'next/navigation'


const statuses: { label: string, value?: Status }[] = [
    { label: 'All' },
    { label: 'Open', value: 'OPEN' },
    { label: 'Closed', value: 'CLOSED' },
    { label: 'In Progress', value: 'IN_PROGRESS' },
]

const IssueStatusFilter = () => {

    const router = useRouter()

    return (
        <Select.Root defaultValue='' onValueChange={(status) => {
            const query = status ? `?status=${status}` : ''
            router.push('/issues' + query)
        }}>
            <Select.Trigger />
            <Select.Content>
                {statuses.map((status) =>
                (<Select.Item
                    key={status.label}
                    value={status.value || ''}>
                    {status.label}
                </Select.Item>)
                )}
            </Select.Content>
        </Select.Root>)
}

export default IssueStatusFilter