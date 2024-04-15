'use client'

import { Select } from '@radix-ui/themes'
import React from 'react'

const AssignUser = () => {
    return (
        <Select.Root>
            <Select.Trigger placeholder="Assign..." />
            <Select.Content>
                <Select.Group>
                    <Select.Label>
                        Suggestions
                    </Select.Label>
                    <Select.Item value='1'>Heba</Select.Item>
                </Select.Group>
            </Select.Content>


        </Select.Root>
    )
}

export default AssignUser