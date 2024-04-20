import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssuesSummary from "./IssuesSummary";
import RecentIssues from "./RecentIssues";
import { Flex, Grid } from "@radix-ui/themes";
import IssuesChart from "./IssuesChart";

export default async function Home() {

  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })

  return (
    <Grid columns={{ 'initial': '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
        <IssuesChart open={open} inProgress={inProgress} closed={closed} />
      </Flex>
      <RecentIssues />
    </Grid>
  )
}
