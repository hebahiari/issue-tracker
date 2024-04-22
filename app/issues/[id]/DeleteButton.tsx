'use client'

import { LoadingSpinner } from '@/app/components'
import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Box, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const DeleteButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter()
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const deleteIssue = async () => {
        try {
            setLoading(true)
            await axios.delete(`/api/issues/${issueId}`)
            router.push('/issues/list')
            router.refresh()
        } catch (error: any) {
            if (error?.response?.status === 401) {
                setError("Please log in to perform this action")
            } else {
                setError("This issue cannot be deleted")
            }
            setLoading(false)
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Box>
                        <Button color='red' disabled={loading}>
                            {loading && <LoadingSpinner />}<TrashIcon />Delete Issue
                        </Button>
                    </Box>
                </AlertDialog.Trigger>
                <AlertDialog.Content >
                    <AlertDialog.Title>Delete Issue</AlertDialog.Title>
                    <AlertDialog.Description size="2">
                        Are you sure you want to delete this issue? this action cannot be undone.
                    </AlertDialog.Description>
                    <Flex gap="3" mt="4" justify="end">
                        <AlertDialog.Cancel>
                            <Button variant="soft" color="gray">
                                Cancel
                            </Button>
                        </AlertDialog.Cancel>
                        <AlertDialog.Action>
                            <Button variant="solid" color="red" onClick={deleteIssue}>
                                Delete Issue
                            </Button>
                        </AlertDialog.Action>
                    </Flex>
                </AlertDialog.Content>
            </AlertDialog.Root>
            <AlertDialog.Root open={error !== ""}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        {error}
                        <Flex gap="3" mt="4" justify="end">
                            <Button variant="soft" color="gray" onClick={() => setError("")}>
                                OK
                            </Button>
                        </Flex>
                    </AlertDialog.Description>
                </AlertDialog.Content>
            </AlertDialog.Root>
        </>
    )
}

export default DeleteButton