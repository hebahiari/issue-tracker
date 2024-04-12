'use client'

import { Button, Callout, Heading, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas';
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage';
import LoadingSpinner from '@/app/components/LoadingSpinner';

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {

    const router = useRouter()
    const { register, control, handleSubmit, formState: { errors } } = useForm<IssueForm>({
        resolver: zodResolver(createIssueSchema)
    })
    const [error, setError] = useState("")
    const [loading, setLoading] = useState(false)

    const onSubmit = handleSubmit(async (data) => {
        try {
            setLoading(true)
            await axios.post("/api/issues", data)
            router.push('/issues')
        } catch (error) {
            setError("An error has occurred")
            setLoading(false)
        }
    })

    return (
        <form className='max-w-xl space-y-3' onSubmit={onSubmit}>
            <Heading weight="medium">Create New Issue</Heading>
            <TextField.Root>
                <TextField.Input placeholder='Title' {...register('title')} />
            </TextField.Root>
            <ErrorMessage>{errors.title?.message}</ErrorMessage>
            <Controller name="description" control={control} render={({ field }) =>
                <SimpleMDE placeholder='Description' {...field} />
            }>
            </Controller>
            <ErrorMessage>{errors.description?.message}</ErrorMessage>
            <Button disabled={loading}>Submit New Issue{loading && <LoadingSpinner />}</Button>
            {error && (
                <Callout.Root color="red">
                    <Callout.Text>
                        {error}
                    </Callout.Text>
                </Callout.Root>)}
        </form>
    )
}

export default NewIssuePage