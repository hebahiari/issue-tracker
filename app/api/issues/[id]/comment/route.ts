import AuthOptions from "@/app/auth/AuthOptions";
import { commentSchema } from "@/app/validationSchemas";
import prisma from "@/prisma/client";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {

    const session = await getServerSession(AuthOptions)

    if (!session) return NextResponse.json({}, { status: 401 })

    const body = await request.json()
    //validate request
    const validation = commentSchema.safeParse(body)

    if (validation.success) {
        const { assignedToUserId, type, description } = body

        const newComment = await prisma.comment.create({
            data: {
                assignedToUserId,
                description,
                type
            }
        })
        return NextResponse.json(newComment, { status: 201 })
    } else {
        // handle error
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
}
