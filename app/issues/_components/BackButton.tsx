import { Issue } from '@prisma/client'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

const BackButton = ({ issue }: { issue?: Issue }) => {
    return (
        <Link href={issue ? `/issues/${issue.id}` : '/issues/list'}><IoIosArrowBack size='20' style={{ color: 'var(--sand-10)' }} /></Link>
    )
}

export default BackButton