'use client'

import { Card } from '@radix-ui/themes';
import { ResponsiveContainer, BarChart, XAxis, YAxis, Bar } from 'recharts'

interface Props {
    open: number;
    closed: number;
    inProgress: number;
    total: number;
}

const IssuesChart = ({ open, inProgress, closed, total }: Props) => {

    const data = [
        { label: 'All Issues', value: total },
        { label: 'Open Issues', value: open },
        { label: 'In Progress', value: inProgress },
        { label: 'Closed Issues', value: closed },
    ]

    return (
        <Card>
            <ResponsiveContainer width='100%' height={300}>
                <BarChart data={data}>
                    <XAxis dataKey='label' />
                    <YAxis />
                    <Bar dataKey='value' barSize={60} style={{ fill: 'var(--accent-7)' }} />
                </BarChart>
            </ResponsiveContainer>
        </Card>
    )
}

export default IssuesChart