'use client'

import { User } from '@prisma/client'
import { Select } from '@radix-ui/themes'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { LoadingSpinner } from '@/app/components'

const AssignUser = () => {

    const { data: users, error, isLoading } = useQuery<User[]>({
        queryKey: ['users'],
        queryFn: () => axios.get('/api/users').then(response => response.data),
        staleTime: 60 * 1000, //cached for 60s
        retry: 3
    })

    if (error) return null

    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>
                        {isLoading ? <LoadingSpinner /> : 'Suggestions'}
                    </Select.Label>
                    {!isLoading && users?.map((user) => (
                        <Select.Item key={user.id} value={user.id}>{user.name}</Select.Item>
                    ))}
                </Select.Group>
            </Select.Content>


        </Select.Root>
    )
}

export default AssignUser