import { Skeleton } from '@/app/components'
import { Box } from '@radix-ui/themes'


const LoadingCreateIssue = () => {
    return (
        <Box max-width='xl'>
            <Skeleton />
            <Skeleton height='20rem' />
        </Box>
    )
}

export default LoadingCreateIssue