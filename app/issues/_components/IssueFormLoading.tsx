import { Box, Heading, Link } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'
import { IoIosArrowBack } from 'react-icons/io'

const IssueFormLoading = () => {
    return (
        <Box max-width='xl' className='space-y-3'>
            <Link href='/issues'><IoIosArrowBack /></Link>
            <Heading weight="medium">Issue Editor</Heading>
            <Skeleton height='2rem' />
            <Skeleton height='20rem' />
        </Box>
    )
}

export default IssueFormLoading