import prisma from "@/prisma/client";
import Pagination from "./components/Pagination";
import IssuesSummary from "./IssuesSummary";
import RecentIssues from "./RecentIssues";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import IssuesChart from "./IssuesChart";
import { Metadata } from "next";
import delay from "delay";

export default async function Home() {

  const open = await prisma.issue.count({ where: { status: 'OPEN' } })
  const closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
  const inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
  const total = await prisma.issue.count()

  await delay(2000)

  return (
    <Grid columns={{ 'initial': '1', md: '2' }} gap='5'>
      <Flex direction='column' gap='5'>
        <Heading size='4'>Issues Summary</Heading>
        <IssuesSummary open={open} inProgress={inProgress} closed={closed} total={total} />
        <IssuesChart open={open} inProgress={inProgress} closed={closed} total={total} />
      </Flex>
      <RecentIssues />
    </Grid>
  )
}

export const metadata: Metadata = {
  title: 'Issue Tracker - Dashboard',
  description: 'Summary of current issues',
}