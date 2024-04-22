// seed.js

const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    // Insert users
    const usersData = [
        { name: 'John Doe', email: 'john@example.com', image: 'https://example.com/john.jpg' },
        { name: 'Jane Smith', email: 'jane@example.com', image: 'https://example.com/jane.jpg' },
        { name: 'Alice Johnson', email: 'alice@example.com', image: 'https://example.com/alice.jpg' },
        { name: 'Bob Brown', email: 'bob@example.com', image: 'https://example.com/bob.jpg' },
        { name: 'Eva White', email: 'eva@example.com', image: 'https://example.com/eva.jpg' }
    ];

    for (const userData of usersData) {
        await prisma.user.create({
            data: userData,
        });
    }

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


    for (const issueData of issuesData) {
        await prisma.issue.create({
            data: {
                ...issueData,
                createdAt: new Date(issueData.createdAt),
                updatedAt: new Date(issueData.updatedAt),

            },
        });
    }

    console.log('Seed data inserted successfully!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
