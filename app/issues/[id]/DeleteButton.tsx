import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'


const DeleteButton = ({ issueId }: { issueId: number }) => {
    return (
        <Link href={`/issues/${issueId}/delete`}>
            <Button color='red'>
                <TrashIcon />Delete Issue
            </Button>
        </Link>
    )
}

export default DeleteButton