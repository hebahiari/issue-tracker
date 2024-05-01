'use client'

import { Issue, Status } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import toast, { Toaster } from 'react-hot-toast'

const statusMap: Record<Status, { label: string, color: 'red' | 'blue' | 'green' }> = {
    OPEN: { label: 'Open', color: 'red' },
    CLOSED: { label: 'Closed', color: 'blue' },
    IN_PROGRESS: { label: 'In Progress', color: 'green' }
}

const ChangeStatus = ({ issue: { status, id } }: { issue: Issue }) => {
    const router = useRouter()
    const changeIssueStatus = async (status: Status) => {
        await axios.patch(
            `/api/issues/${id}`,
            { status: status }
        )
            .then(() => toast.success("Status updated!"))
            .then(() => router.refresh())
            .catch((error) => {
                if (error.response?.status === 401) {
                    toast.error("Changes were not saved, please log in to perform this action.")
                } else {
                    toast.error("Changes could not be saved.")
                }
            })
    }


    return (
        <>
            <Toaster />
            <Select.Root
                defaultValue={status}
                onValueChange={changeIssueStatus}
            >
                <Select.Trigger />
                <Select.Content>
                    <Select.Group>
                        {
                            <>
                                {Object.entries(statusMap).map((status) => (
                                    <Select.Item
                                        key={status[1].label}
                                        value={status[0]}>
                                        {status[1].label}
                                    </Select.Item>
                                ))}
                            </>
                        }
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </>
    )
}

export default ChangeStatus