'use client'

import { ErrorMessage, LoadingSpinner } from '@/app/components'
import { Button, Flex, TextArea } from '@radix-ui/themes'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { commentSchema } from '@/app/validationSchemas'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import toast, { Toaster } from 'react-hot-toast'

type CommentFormData = { description: string }

const NewComment = ({ issueId }: { issueId: number }) => {

    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const { register, control, handleSubmit, reset, formState: { errors } } = useForm<CommentFormData>({
        resolver: zodResolver(commentSchema)
    })

    const router = useRouter()

    const onSubmit = handleSubmit(async (data, event) => {

        event?.preventDefault()
        try {
            const createdComment = {
                ...data,
                relatedIssue: issueId,
                type: 'user comment'
            }
            setLoading(true)
            await axios.post(`/api/issues/${issueId}/comment`, { ...createdComment })
            reset()
            router.refresh()
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error("Changes were not saved, please log in to perform this action.")
            } else {
                toast.error("Changes could not be saved.")
            }
        }
        setLoading(false)
    })

    return (
        <>
            <Toaster />
            <form className='max-w-xl space-b-3' onSubmit={onSubmit}>
                <Flex gap='3' align='end' wrap='wrap'>
                    <TextArea
                        placeholder='Add new comment'
                        {...register('description')}
                        style={{ maxWidth: '480px' }} />
                    <Button disabled={loading} type='submit'>
                        Add
                        {loading && <LoadingSpinner />}
                    </Button>
                    <ErrorMessage>{errors.description?.message}</ErrorMessage>
                </Flex>
            </form>
        </>
    )
}

export default NewComment