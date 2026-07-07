import { NextResponse, NextRequest } from "next/server";
import prisma from "@/services/prisma/prisma";

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ userId: string }> },
) {
  const { userId } = await params;

  const forms = await prisma.form.findMany({
    where: {
      ownerId: userId,
    },
    include: {
      versions: {
        include: {
          fields: true,
          formSubmissions: {
            include: {
              answers: true,
            },
          },
        },
      },
      submissions: {
        include: {
          answers: true,
        },
      },
      user: true,
    },
  });

  return NextResponse.json({
    success: true,
    message: "Fetched all forms",
    data: forms,
  });
}
