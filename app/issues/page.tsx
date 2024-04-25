'use client'

import { useRouter } from 'next/navigation'
import { LoadingSpinner } from '../components'
import { useEffect } from 'react'

const IssuesPage = () => {

    const router = useRouter()


    useEffect(() => {
        router.push('/issues/list')
    }, [])


    return <LoadingSpinner />
}

export default IssuesPage