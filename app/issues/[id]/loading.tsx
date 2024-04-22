import { Skeleton } from '@/app/components'
import { Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'


const LoadingIssue = () => {
    return (
        <Flex direction='column' gap='4'>
            <Link href='/issues/list'><IoIosArrowBack size='20' style={{ color: 'var(--sand-10)' }} /></Link>
            <Heading><Skeleton /></Heading>
            <Flex gap="3" my="3">
                <Skeleton width='5rem' />
                <Text><Skeleton /></Text>
            </Flex>
            <Card>
                <Skeleton count={3} />
            </Card>
        </Flex>
    )
}

export default LoadingIssue