import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssuesSummary from "./IssuesSummary";
import RecentIssues from "./RecentIssues";
import { Flex } from "@radix-ui/themes";
import IssuesChart from "./IssuesChart";

export default async function Home() {

  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })

  return (
    <Flex direction='column' gap='3'>
      <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
      <IssuesChart open={open} inProgress={inProgress} closed={closed} />
      <RecentIssues />
    </Flex>
  )
}
