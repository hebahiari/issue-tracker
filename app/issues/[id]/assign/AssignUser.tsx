'use client'

import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '@/app/components'
import toast, { Toaster } from 'react-hot-toast'

const AssignUser = ({ issue }: { issue: Issue }) => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(response => response.data),
        staleTime: 60 * 1000, //cached for 60s
        retry: 3
    })

    if (isLoading) return <Skeleton width='3' />

    if (error) {
        console.log(error)
        return null
    }

    return (
        <>
            <Toaster />
            <Select.Root
                defaultValue={issue.assignedToUserId || ''}
                onValueChange={async (userId) => {
                    await axios.patch(`/xapi/issues/${issue.id}`, { assignedToUserId: userId || null })
                        .catch(() => { toast.error("Changes could not be saved.") })
                }}>
                <Select.Trigger />
                <Select.Content>
                    <Select.Group>
                        {!isLoading &&
                            <>
                                <Select.Item value="">Unassigned</Select.Item>
                                {users?.map((user) => (
                                    <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                                ))}
                            </>
                        }
                    </Select.Group>
                </Select.Content>
            </Select.Root>
        </>
    )
}

export default AssignUser