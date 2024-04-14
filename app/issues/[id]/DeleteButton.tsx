'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'


const DeleteButton = ({ issueId }: { issueId: number }) => {

    const router = useRouter()
    const [error, setError] = useState(false)

    const deleteIssue = async () => {
        try {
            await axios.delete(`/api/issues/${issueId}`)
            router.push('/issues')
            router.refresh()
        } catch (error) {
            setError(true)
        }
    }

    return (
        <>
            <AlertDialog.Root>
                <AlertDialog.Trigger>
                    <Button color='red'>
                        <TrashIcon />Delete Issue
                    </Button>
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
            <AlertDialog.Root open={error}>
                <AlertDialog.Content>
                    <AlertDialog.Title>Error</AlertDialog.Title>
                    <AlertDialog.Description>
                        This issue cannot be deleted.
                        <Flex gap="3" mt="4" justify="end">
                            <Button variant="soft" color="gray" onClick={() => setError(false)}>
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