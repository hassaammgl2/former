import { NextResponse, NextRequest } from "next/server";
import prisma from "@/services/prisma/prisma";

export async function GET(request: NextRequest) {
  const body = await request.json();
  const forms = await prisma.form.findMany({
    where: {
      ownerId: body.userId,
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
  console.log(forms);

  return NextResponse.json({
    success: true,
    status: "Saving form ...",
  });
}
