'use client'

import { ErrorMessage, LoadingSpinner } from '@/app/components'
import { TextField, Button, Callout, Flex, TextArea } from '@radix-ui/themes'
import React, { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { commentSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import error from 'next/error'
import { useForm } from 'react-hook-form'
import { Comment } from '@prisma/client';
import { useSession } from 'next-auth/react'

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
            if (error?.response?.status === 401) {
                setError("Please log in to perform this action")
            } else {
                setError("An error has occurred")
            }
        }
        setLoading(false)
    })

    return (
        <form className='max-w-xl space-b-3' onSubmit={onSubmit}>
            <Flex gap='3' align='end'>
                {/* <ErrorMessage>{errors.description?.message}</ErrorMessage> */}
                <TextArea
                    placeholder='Add new comment'
                    {...register('description')} />
                <Button disabled={loading} type='submit'>
                    Add
                    {loading && <LoadingSpinner />}
                </Button>
            </Flex>
            {/* {errors && (
                <Callout.Root color="red">
                    <Callout.Text>
                        {errors.assignedToUserId?.message}
                    </Callout.Text>
                </Callout.Root>)} */}
        </form>
    )
}

export default NewComment