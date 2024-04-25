import prisma from "@/prisma/client";
import IssuesSummary from "./IssuesSummary";
import RecentIssues from "./RecentIssues";
import { Flex, Grid, Heading, Text } from "@radix-ui/themes";
import IssuesChart from "./IssuesChart";
import { Metadata } from "next";

export default async function Home() {

  let open = 0
  let closed = 0
  let inProgress = 0
  let total = 0

  try {
    open = await prisma.issue.count({ where: { status: 'OPEN' } })
    closed = await prisma.issue.count({ where: { status: 'CLOSED' } })
    inProgress = await prisma.issue.count({ where: { status: 'IN_PROGRESS' } })
    total = await prisma.issue.count()
  } catch (error) {
    console.log(error)
  }


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