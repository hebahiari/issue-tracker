'use client'

import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import Link from 'next/link'


const DeleteButton = ({ issueId }: { issueId: number }) => {
    return (
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
                        <Button variant="solid" color="red">
                            Delete Issue
                        </Button>
                    </AlertDialog.Action>
                </Flex>
            </AlertDialog.Content>
        </AlertDialog.Root>
    )
}

export default DeleteButton