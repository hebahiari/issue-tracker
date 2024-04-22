import { Box, Heading, Link } from '@radix-ui/themes'
import { Skeleton } from '@/app/components'
import { IoIosArrowBack } from 'react-icons/io'
import BackButton from './BackButton'

const IssueFormLoading = () => {
    return (
        <Box max-width='xl' className='space-y-3'>
            <BackButton />
            <Heading weight="medium">Issue Editor</Heading>
            <Skeleton height='2rem' />
            <Skeleton height='20rem' />
        </Box>
    )
}

export default IssueFormLoading