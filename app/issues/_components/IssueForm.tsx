'use client'

import ErrorMessage from '@/app/components/ErrorMessage';
import LoadingSpinner from '@/app/components/LoadingSpinner';
import { issueSchema } from '@/app/validationSchemas';
import { zodResolver } from '@hookform/resolvers/zod';
import { Issue } from '@prisma/client';
import { Button, Callout, Heading, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { IoIosArrowBack } from 'react-icons/io';
import { z } from 'zod';

const SimpleMDE = dynamic(
    () => import('react-simplemde-editor'),
    { ssr: false }
)

type IssueFormData = z.infer<typeof issueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueFormData>({
        resolver: zodResolver(issueSchema)
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true)
            if (issue) {
                await axios.patch(`/api/issues/${issue.id}`, data)
                router.push(`/issues/${issue.id}`)
                router.refresh()
            } else {
                await axios.post("/api/issues", data)
                router.push('/issues')
                // refreshing to update the issues in the cache
                router.refresh()
            }
        } catch (error) {
            setError("An error has occurred")
            setLoading(false)
        }
    })

    return (
        <form className='max-w-xl space-y-3' onSubmit={onSubmit}>
            <Link href='/issues'><IoIosArrowBack /></Link>
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
            {error && (
                <Callout.Root color="red">
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>)}
        </form>
    )
}

export default IssueForm