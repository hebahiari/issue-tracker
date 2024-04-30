'use client'

import ErrorMessage from '@/app/components/ErrorMessage';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, Heading, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import SimpleMDE from 'react-simplemde-editor'
import BackButton from './BackButton';
import toast, { Toaster } from 'react-hot-toast'


type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = handleSubmit(async (data, event) => {
        event?.preventDefault()
        try {
            setLoading(true)
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data)
                router.push(`/issues/${issue.id}`)
                router.refresh()
            } else {
                await axios.post("/api/issues", data)
                router.push('/issues/list')
                // refreshing to update the issues in the cache
                router.refresh()
            }
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error("Changes were not saved, please log in to perform this action.")
            } else {
                toast.error("Changes could not be saved.")
            }
            setLoading(false)
        }
    })

    return (
        <>
            <Toaster />
            <form className='max-w-xl space-y-3' onSubmit={onSubmit}>
                <BackButton issue={issue} />
                <Heading weight="medium">{issue ? 'Edit Issue' : 'Create New Issue'}</Heading>
                <TextField.Root>
                    <TextField.Input defaultValue={issue?.title} placeholder='Title' {...register('title')} />
                </TextField.Root>
                <ErrorMessage>{errors.title?.message}</ErrorMessage>
                <Controller
                    name="description"
                    control={control}
                    defaultValue={issue?.description}
                    render={({ field }) =>
                        <SimpleMDE placeholder='Description' {...field} />
                    }>
                </Controller>
                <ErrorMessage>{errors.description?.message}</ErrorMessage>
                <Button disabled={loading}>
                    {issue ? 'Update Issue' : 'Submit New Issue'}
                    {loading && <LoadingSpinner />}
                </Button>
            </form>
        </>
    )
}

export default IssueForm