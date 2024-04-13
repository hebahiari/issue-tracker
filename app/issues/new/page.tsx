import dynamic from 'next/dynamic'
import IssueFormLoading from './loading'

// rendering the form dynamically for the MDE to properly render
const IssueForm = dynamic(
    () => import('@/app/issues/_components/IssueForm'),
    {
        ssr: false,
        loading: () => <IssueFormLoading />
    }
)

const NewIssuePage = () => {
    return (
        <IssueForm />
    )
}

export default NewIssuePage