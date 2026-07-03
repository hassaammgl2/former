import { NextResponse, NextRequest } from "next/server";
import { saveFormQueue } from "@/services/bullmq/queue";
import prisma from "@/services/prisma/prisma";

export async function POST(request: NextRequest) {
  const body = await request.json();
  const job = await saveFormQueue.add("save-form-queue", body);
  console.log(job.id);
  const saveformqueue = await prisma.backgroundJob.create({
    data: {
      jobId: job.id!,
      payload: { body },
      userId: body.userId,
      queue: "save-form-queue",
      type: "SAVE_FORM",
    },
  });

  return NextResponse.json({
    success: true,
    status: "Saving form ...",
    bgJobId: saveformqueue.id,
  });
}
