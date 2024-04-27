//seed.js


const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    await prisma.comment.deleteMany();
    await prisma.issue.deleteMany();
    await prisma.user.deleteMany();

    // Insert users
    const usersData = [
        { name: 'John Doe', email: 'john@example.com', image: 'https://tinyurl.com/mu6r628y' },
        { name: 'Jane Smith', email: 'jane@example.com', image: 'https://tinyurl.com/8mrhe2eu' },
        { name: 'Alice Johnson', email: 'alice@example.com', image: 'https://tinyurl.com/4dmd4ata' },
        { name: 'Bob Brown', email: 'bob@example.com', image: 'https://tinyurl.com/yyu2ewx9' },
        { name: 'Eva White', email: 'eva@example.com', image: 'https://tinyurl.com/36tsejh5' }
    ];

    const users = await Promise.all(
        usersData.map(userData =>
            prisma.user.create({ data: userData })
        )
    );

    // Insert issues
    const issuesData = [
        { title: 'Authentication Failure', description: 'Some users are unable to log in due to authentication issues. Investigation is required to identify the root cause and implement a fix.', status: 'OPEN', createdAt: '2024-04-17T08:00:00', updatedAt: '2024-04-17T08:00:00' },
        { title: 'Database Connection Timeout', description: 'Occasional timeouts are occurring when connecting to the database, affecting system performance. A review of database configurations and optimizations is needed.', status: 'IN_PROGRESS', createdAt: '2024-04-16T10:30:00', updatedAt: '2024-04-16T14:45:00' },
        { title: 'UI Rendering Bug', description: 'Certain elements on the user interface are not rendering properly across different browsers and devices. Frontend developers need to address this issue.', status: 'OPEN', createdAt: '2024-04-15T14:20:00', updatedAt: '2024-04-17T09:30:00' },
        { title: 'Payment Gateway Integration Error', description: 'Customers are encountering errors during the checkout process due to issues with payment gateway integration. Backend developers should investigate and resolve this promptly.', status: 'OPEN', createdAt: '2024-04-14T11:45:00', updatedAt: '2024-04-16T16:20:00' },
        { title: 'Performance Degradation', description: 'System performance has been gradually declining, leading to slower response times. Performance monitoring and optimization measures are required to address this issue.', status: 'IN_PROGRESS', createdAt: '2024-04-13T09:10:00', updatedAt: '2024-04-15T11:55:00' },
        { title: 'Data Loss on Server Crash', description: 'A recent server crash resulted in data loss for some users. Data recovery efforts are underway to restore lost data and prevent similar incidents in the future.', status: 'CLOSED', createdAt: '2024-04-12T16:50:00', updatedAt: '2024-04-14T10:25:00' },
        { title: 'Email Notification Failure', description: 'Users are not receiving email notifications for important updates and events. Email server configurations need to be reviewed and fixed to ensure proper functionality.', status: 'OPEN', createdAt: '2024-04-11T13:25:00', updatedAt: '2024-04-13T08:15:00' },
        { title: 'Broken Link on Homepage', description: 'A hyperlink on the homepage is leading to a broken or nonexistent page. Web content managers should correct the link destination.', status: 'OPEN', createdAt: '2024-04-10T09:40:00', updatedAt: '2024-04-12T12:35:00' },
        { title: 'Mobile App Crashing on Launch', description: 'Some users are experiencing crashes immediately upon launching the mobile application. Mobile developers need to investigate and resolve this issue.', status: 'OPEN', createdAt: '2024-04-09T12:15:00', updatedAt: '2024-04-11T15:20:00' },
        { title: 'SSL Certificate Expiry', description: 'The SSL certificate used by the application is nearing its expiration date. System administrators must renew the certificate to avoid disruptions in secure connections.', status: 'IN_PROGRESS', createdAt: '2024-04-08T10:20:00', updatedAt: '2024-04-10T09:30:00' },
        { title: 'File Upload Error', description: 'Users are unable to upload files successfully, encountering errors during the process. Backend developers should investigate and fix the file upload functionality.', status: 'OPEN', createdAt: '2024-04-07T14:30:00', updatedAt: '2024-04-09T10:40:00' },
        { title: 'Search Functionality Not Returning Results', description: 'The search feature is not functioning as expected, failing to return relevant results. Backend developers should troubleshoot and rectify the search functionality.', status: 'OPEN', createdAt: '2024-04-06T11:55:00', updatedAt: '2024-04-08T14:45:00' },
        { title: 'Missing Product Images', description: 'Product images are missing from certain product listings, impacting the user experience. Content managers need to ensure all product images are properly uploaded and displayed.', status: 'IN_PROGRESS', createdAt: '2024-04-05T09:30:00', updatedAt: '2024-04-07T11:20:00' },
        { title: '404 Error on Checkout Page', description: 'Users are encountering a 404 error when attempting to proceed to the checkout page. Web developers should investigate and resolve this issue promptly to minimize disruptions.', status: 'OPEN', createdAt: '2024-04-04T13:20:00', updatedAt: '2024-04-06T08:40:00' },
        { title: 'Network Connectivity Issues', description: 'Some users are experiencing difficulties connecting to the application due to network issues. Network administrators should investigate and address the underlying connectivity problems.', status: 'OPEN', createdAt: '2024-04-03T10:10:00', updatedAt: '2024-04-05T09:55:00' },
        { title: 'Expired Session Tokens', description: 'Session tokens are expiring prematurely, causing users to be unexpectedly logged out. Backend developers should review session management mechanisms and extend token lifetimes as needed.', status: 'IN_PROGRESS', createdAt: '2024-04-02T08:45:00', updatedAt: '2024-04-04T10:30:00' },
        { title: 'Broken Navigation Menu', description: 'The navigation menu on the website is malfunctioning, making it difficult for users to navigate between pages. Frontend developers need to fix the navigation menu.', status: 'OPEN', createdAt: '2024-04-01T11:30:00', updatedAt: '2024-04-03T15:20:00' },
        { title: 'Missing Transaction Records', description: 'Some transactions are not being recorded in the database, resulting in discrepancies in financial records. Database administrators need to investigate and ensure all transactions are properly logged.', status: 'OPEN', createdAt: '2024-03-31T14:25:00', updatedAt: '2024-04-02T09:40:00' },
        { title: 'Email Verification Not Working', description: 'New users are unable to verify their email addresses, preventing them from accessing the application. Backend developers should investigate and fix the email verification process.', status: 'OPEN', createdAt: '2024-03-30T09:50:00', updatedAt: '2024-04-01T08:15:00' },
        { title: 'User Profile Update Error', description: 'Users are encountering errors when trying to update their profile information. Backend developers should investigate and resolve this issue to ensure smooth user interactions.', status: 'IN_PROGRESS', createdAt: '2024-03-29T12:40:00', updatedAt: '2024-03-31T10:25:00' }
    ];

    const issues = await Promise.all(
        issuesData.map(issueData =>
            prisma.issue.create({
                data:
                {
                    ...issueData,
                    createdAt: new Date(issueData.createdAt),
                    updatedAt: new Date(issueData.updatedAt),
                }
            })
        )
    );

    // Sample comments
    const commentsData = [
        { description: "Unable to log in even after multiple attempts. Keep getting 'Invalid credentials' error.", type: 'user comment' },
        { description: "Experiencing slow loading times when accessing certain pages. Is there a server issue?", type: 'user comment' },
        { description: "Images not loading properly on the product listing page. Customers are unable to view product details.", type: 'user comment' },
        { description: "Received a '404 - Page Not Found' error when trying to complete checkout. Is the link broken?", type: 'user comment' },
        { description: "Encountered a 'Connection timed out' error while trying to submit a support ticket. Is the system down?", type: 'user comment' },
        { description: "Transaction history not updating with recent purchases. Missing records for the past week.", type: 'user comment' },
        { description: "Tried to upload a file, but it failed with a 'File too large' error. Is there a size limit?", type: 'user comment' },
        { description: "Email verification link expired before I could confirm my account. Can I request a new link?", type: 'user comment' },
        { description: "Dashboard not displaying updated data. Charts and graphs are showing outdated information.", type: 'user comment' },
        { description: "Selected payment method not appearing during checkout. Unable to proceed with the purchase.", type: 'user comment' },
        { description: "Search function returning irrelevant results. Is the algorithm working as expected?", type: 'user comment' },
        { description: "Dropdown menu on the homepage not functioning on mobile devices. Is it a compatibility issue?", type: 'user comment' },
        { description: "Product prices on the website don't match those advertised. Is there a pricing discrepancy?", type: 'user comment' },
        { description: "Encountered a '503 - Service Unavailable' error while trying to access the support portal.", type: 'user comment' },
        { description: "Unable to update profile picture. Save button seems unresponsive.", type: 'user comment' },
        { description: "Forgot password link not working. Can't reset password to regain access to account.", type: 'user comment' },
        { description: "Transaction failed during checkout, but payment was still deducted from my account.", type: 'user comment' },
        { description: "Received a 'Security warning' when accessing the website. Is there a security breach?", type: 'user comment' },
        { description: "Confirmation email for order placed not received. Concerned about order status.", type: 'user comment' },
        { description: "Form submission failed with a 'Validation error'. Please review input fields for errors.", type: 'user comment' },
        { description: "Encountered a '504 - Gateway Timeout' error while accessing the login page. Is the server overwhelmed?", type: 'user comment' },
        { description: "Product images not loading on the mobile app. Can't browse the catalog properly.", type: 'user comment' },
        { description: "Received an 'Internal Server Error' when trying to access the checkout page. Is there a backend issue?", type: 'user comment' },
        { description: "Encountered a '403 - Forbidden' error when trying to access account settings. Is there a permissions issue?", type: 'user comment' },
        { description: "Tried to contact support via live chat, but no agents were available. Is live chat temporarily disabled?", type: 'user comment' },
        { description: "Promotional discount code not applying during checkout. Is the code still valid?", type: 'user comment' },
        { description: "Encountered a '502 - Bad Gateway' error while trying to submit a payment. Is there a problem with the payment gateway?", type: 'user comment' },
        { description: "Shipping address not saving correctly in the account profile. Changes are not reflecting.", type: 'user comment' },
        { description: "Logged in to the account, but seeing someone else's order history. Is there a mix-up in accounts?", type: 'user comment' },
        { description: "Encountered a '500 - Internal Server Error' when trying to access the help center. Is the server down?", type: 'user comment' },
        { description: "Product description missing on the product detail page. Can't find important information.", type: 'user comment' },
        { description: "Tried to cancel an order, but the cancel button is grayed out. Is there a restriction on cancellations?", type: 'user comment' },
        { description: "Encountered a '409 - Conflict' error when trying to update account information. Is there a data conflict?", type: 'user comment' },
        { description: "Promotional banner on the homepage not clickable. Can't access the advertised offer.", type: 'user comment' },
        { description: "Tried to download an invoice, but the download link is broken. Is there an issue with document generation?", type: 'user comment' },
        { description: "Encountered a '401 - Unauthorized' error when trying to access premium features. Is there a subscription issue?", type: 'user comment' },
        { description: "Product reviews not showing on the product detail page. Is there a delay in review processing?", type: 'user comment' },
        { description: "Encountered a '429 - Too Many Requests' error when trying to access the website. Is there a rate limit?", type: 'user comment' },
        { description: "Dropdown menu options on the navigation bar are overlapping. Is there a styling issue?", type: 'user comment' },
        { description: "Encountered a '413 - Payload Too Large' error when trying to upload a file. Is there a file size limit?", type: 'user comment' },
        { description: "Encountered a '429 - Too Many Requests' error when trying to access the website. Is there a rate limit?", type: 'user comment' },
        { description: "Dropdown menu options on the navigation bar are overlapping. Is there a styling issue?", type: 'user comment' },
        { description: "Encountered a '413 - Payload Too Large' error when trying to upload a file. Is there a file size limit?", type: 'user comment' },
        { description: "Link to privacy policy page is broken. Can't access important legal information.", type: 'user comment' },
        { description: "Encountered a '502 - Bad Gateway' error when trying to submit a form. Is the server down?", type: 'user comment' },
        { description: "Product images not loading in the mobile app. Unable to browse product catalog.", type: 'user comment' },
        { description: "Received a '503 - Service Unavailable' error when accessing the account dashboard. Is the service down?", type: 'user comment' },
        { description: "Dropdown menu on homepage not clickable. Can't navigate to other sections.", type: 'user comment' },
        { description: "Encountered a '401 - Unauthorized' error when trying to access premium content. Is there a subscription issue?", type: 'user comment' },
        { description: "Error message 'Session expired, please log in again' when trying to access account settings. Is the session timeout too short?", type: 'user comment' },
        { description: "Encountered a '408 - Request Timeout' error when trying to load a page. Is there a server issue?", type: 'user comment' },
        { description: "Product reviews section not displaying on product detail page. Unable to view user feedback.", type: 'user comment' },
        { description: "Received a '504 - Gateway Timeout' error when trying to submit an order. Is there a network issue?", type: 'user comment' },
        { description: "Promotional banner on homepage not clickable. Can't access advertised offers.", type: 'user comment' },
        { description: "Encountered a '405 - Method Not Allowed' error when trying to submit a form. Is there a permissions issue?", type: 'user comment' },
        { description: "Link to terms and conditions page is broken. Can't access important legal information.", type: 'user comment' },
        { description: "Encountered a '415 - Unsupported Media Type' error when trying to upload a file. Is there a file format restriction?", type: 'user comment' },
        { description: "Error message 'This feature is currently disabled' when trying to access a specific feature. Is it temporarily unavailable?", type: 'user comment' },
        { description: "Encountered a '410 - Gone' error when trying to access a resource. Has the resource been removed?", type: 'user comment' },
        { description: "Unable to load user profile information. Profile data not displaying correctly.", type: 'user comment' }];

    const comments = await Promise.all(
        commentsData.map(async commentData => {
            const randomUser = users[Math.floor(Math.random() * users.length)];
            const createdAt = randomDate(new Date(2024, 3, 1), new Date());
            const randomIssue = issues[Math.floor(Math.random() * issues.length)];
            return prisma.comment.create({
                data: {
                    ...commentData,
                    assignToUser: {
                        connect: { id: randomUser.id }
                    },
                    issueId: {
                        connect: { id: randomIssue.id }
                    },
                    createdAt,
                }
            });
        })
    );

    // Get all users
    const allUsers = await prisma.user.findMany();

    // Assign users to issues
    const updatedIssues = await Promise.all(
        issues.map(async issue => {
            if (issue.status === 'IN_PROGRESS' || issue.status === 'CLOSED') {
                const randomUser = allUsers[Math.floor(Math.random() * allUsers.length)];
                return prisma.issue.update({
                    where: { id: issue.id },
                    data: {
                        assignToUser: {
                            connect: { id: randomUser.id }
                        }
                    }
                });
            }
        }))


    console.log('Seed data inserted successfully!');
}

function randomDate(start, end) {
    return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
