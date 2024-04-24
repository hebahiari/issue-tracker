'use client'

import { Skeleton } from '@/app/components'
import { Issue, User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import toast, { Toaster } from 'react-hot-toast'

const AssignUser = ({ issue }: { issue: Issue }) => {

    const { data: users, error, isLoading } = useQueryUsers()

    if (isLoading) return <Skeleton width='3' />

    if (error) return null

    const assignIssue = async (userId: User['id']) => {
        await axios.patch(
            `/api/issues/${issue.id}`,
            { assignedToUserId: userId || null }
        )
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
                defaultValue={issue.assignedToUserId || ''}
                onValueChange={assignIssue}>
                <Select.Trigger />
                <Select.Content>
                    <Select.Group>
                        {!isLoading &&
                            <>
                                <Select.Item value="">Unassigned</Select.Item>
                                {users?.map((user) => (
                                    <Select.Item
                                        key={user.id}
                                        value={user.id}>
                                        {user.name}
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

const useQueryUsers = () => useQuery<User[]>({
    queryKey: ['users'],
    queryFn: () =>
        axios.get('/api/users').then(response => response.data),
    staleTime: 60 * 1000, //cached for 60s
    retry: 3
})

export default AssignUser