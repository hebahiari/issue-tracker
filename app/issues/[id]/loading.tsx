import { Skeleton } from '@/app/components'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'


const LoadingIssue = () => {
    return (
        <Box max-width='xl'>
            <Link href='/issues'><IoIosArrowBack /></Link>
            <Heading><Skeleton /></Heading>
            <Flex gap="3" my="3">
                <Skeleton width='5rem' />
                <Text><Skeleton /></Text>
            </Flex>
            <Card>
                <Skeleton count={3} />
            </Card>
        </Box>
    )
}

export default LoadingIssue