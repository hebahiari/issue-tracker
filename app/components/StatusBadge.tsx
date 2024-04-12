import { Status } from '@prisma/client'
import { Badge } from '@radix-ui/themes'
import React from 'react'

interface Props {
    status: Status
}

const statusMap: Record<Status, { label: string, color: 'red' | 'blue' | 'green' }> = {
    OPEN: { label: 'Open', color: 'red' },
    CLOSED: { label: 'Closed', color: 'blue' },
    IN_PROGRESS: { label: 'In Progress', color: 'green' }
}

const StatusBadge = ({ status }: { status: Status }) => {
    return (
        <Badge color={statusMap[status].color}>
            {statusMap[status].label}
        </Badge>
    )
}

export default StatusBadge