export { default } from 'next-auth/middleware'

export const config = {
    matcher: [
        // removed temporarliy for users to be able to test/view the pages
        // '/issues/new',
        // '/issues/:id/edit'
    ]
}