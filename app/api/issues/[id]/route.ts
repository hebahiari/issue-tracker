import AuthOptions from "@/app/auth/AuthOptions";
import { issueSchema, patchIssueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";
import delay from "delay";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    // respond with not authorized if user is not logged in
    // const session = await getServerSession(AuthOptions)
    // if (!session) return NextResponse.json({}, { status: 401 })

    const body = await request.json()
    const validation = patchIssueSchema.safeParse(body)

    if (validation.success) {

        const { assignedToUserId, title, description } = body

        if (assignedToUserId) {
            const user = await prisma.user.findUnique({
                where: { id: assignedToUserId }
            })

            if (!user) {
                return NextResponse.json({ error: 'Invalid User' }, { status: 400 })
            }
        }

        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(params.id) }
        })

        if (issue) {
            const updatedIssue = await prisma.issue.update({
                where: { id: issue.id },
                // will only update given information
                data: {
                    title,
                    description,
                    assignedToUserId
                }
            })

            return NextResponse.json(updatedIssue)

        } else {
            return NextResponse.json({ error: "Invalid Issue" }, { status: 404 })
        }


    } else {
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
}

export async function DELETE(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    // respond with not authorized if user is not logged in
    const session = await getServerSession(AuthOptions)
    if (!session) return NextResponse.json({}, { status: 401 })

    const issue = await prisma.issue.findUnique({
        where: { id: parseInt(params.id) }
    })

    if (issue) {
        await prisma.issue.delete({
            where: { id: parseInt(params.id) }
        })

        return NextResponse.json({})

    } else {
        return NextResponse.json({ error: "Invalid Issue" }, { status: 400 })
    }

}