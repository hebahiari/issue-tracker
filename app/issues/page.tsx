'use client'

import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '../components'

const IssuesPage = () => {

    const router = useRouter()
    router.push('/issues/list')

    return <LoadingSpinner />
}

export default IssuesPage