import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import { createIssueSchema } from "../../validationSchemas";

export async function POST(request: NextRequest) {
    const body = await request.json()
    //validate request
    const validation = createIssueSchema.safeParse(body)

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