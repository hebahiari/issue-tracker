import Link from 'next/link'
import { IoIosArrowBack } from 'react-icons/io'

const BackButton = () => {
    return (
        <Link href='/issues/list'><IoIosArrowBack size='20' style={{ color: 'var(--sand-10)' }} /></Link>
    )
}

export default BackButton