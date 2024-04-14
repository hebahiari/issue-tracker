import { issueSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { error } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
    request: NextRequest,
    { params }: { params: { id: string } }) {

    const body = await request.json()
    const validation = issueSchema.safeParse(body)

    if (validation.success) {
        const issue = await prisma.issue.findUnique({
            where: { id: parseInt(params.id) }
        })

        if (issue) {
            const updatedIssue = await prisma.issue.update({
                where: { id: issue.id },
                data: {
                    title: body.title,
                    description: body.description
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