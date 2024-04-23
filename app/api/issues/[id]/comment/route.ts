import AuthOptions from "@/app/auth/AuthOptions";
import { commentSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    const session = await getServerSession(AuthOptions)
    if (!session) return NextResponse.json({}, { status: 401 })

    const user = await prisma.user.findFirstOrThrow({ where: { email: session.user?.email } })
    const body = await request.json()
    //validate request
    const validation = commentSchema.safeParse(body)

    if (validation.success) {
        const { type, description, relatedIssue } = body

        const newComment = await prisma.comment.create({
            data: {
                assignedToUserId: user.id,
                description,
                type,
                relatedIssue: parseInt(relatedIssue)
            }
        })
        return NextResponse.json(newComment, { status: 201 })
    } else {
        // handle error
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
}
