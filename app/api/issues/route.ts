import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { issueSchema } from "../../validationSchemas";
import { getServerSession } from "next-auth";
import AuthOptions from "@/app/auth/AuthOptions";

export async function POST(request: NextRequest) {

    const session = await getServerSession(AuthOptions)

    if (!session) return NextResponse.json({}, { status: 401 })

    const body = await request.json()
    //validate request
    const validation = issueSchema.safeParse(body)

    if (validation.success) {
        // create new issue
        const newIssue = await prisma.issue.create({
            data: { title: body.title, description: body.description }
        })
        return NextResponse.json(newIssue, { status: 201 })
    } else {
        // handle error
        return NextResponse.json(validation.error.format(), { status: 400 })
    }
}