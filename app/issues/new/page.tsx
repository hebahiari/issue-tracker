'use client'

import { Button, Callout, Text, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface IssueForm {
    title: string;
    description: string;
}

const NewIssuePage = () => {

    const router = useRouter()
    const { register, control, handleSubmit } = useForm<IssueForm>()
    const [error, setError] = useState("")

    return (
        <div>
            <form className='max-w-xl space-y-3' onSubmit={handleSubmit(async (data) => {
                try {
                    await axios.post("/api/issues", data)
                    router.push('/issues')
                } catch (error) {
                    setError("An error has occurred")
                }
            }
            )}>
                <Text weight="medium">Create New Issue</Text>
                <TextField.Root>
                    <TextField.Input placeholder='Title' {...register('title')} />
                </TextField.Root>
                <Controller name="description" control={control} render={({ field }) =>
                    <SimpleMDE placeholder='Description' {...field} />
                }>
                </Controller>
                <Button>Submit New Issue</Button>
                {error && (
                    <Callout.Root color="red">
                        <Callout.Text>
                            {error}
                        </Callout.Text>
                    </Callout.Root>)}
            </form>
        </div>
    )
}

export default NewIssuePage