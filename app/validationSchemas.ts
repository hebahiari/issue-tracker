import { Status } from '@prisma/client';
import { z } from 'zod';

export const issueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255),
    description: z.string().min(1, "Description is required").max(65000)
});

export const patchIssueSchema = z.object({
    title: z.string().min(1, "Title is required").max(255).optional(),
    description: z.string().min(1, "Description is required").max(65000).optional(),
    assignedToUserId: z.string().min(1, "AssignedToUserId is required.").max(225).optional().nullable(),
    status: z.nativeEnum(Status).optional(),
});

export const commentSchema = z.object({
    description: z.string().min(1, "Description is required").max(65000),
    assignedToUserId: z.string().min(1, "AssignedToUserId is required.").max(225).optional()
});