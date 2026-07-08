import { NextRequest, NextResponse } from "next/server";
import prisma from "@/services/prisma/prisma";

export async function DELETE(req: NextRequest) {
  try {
    const { userId, formId } = await req.json();

    if (!userId || !formId) {
      return NextResponse.json(
        {
          success: false,
          message: "Missing required fields.",
        },
        { status: 400 },
      );
    }

    const form = await prisma.form.findFirst({
      where: {
        id: formId,
        ownerId: userId,
      },
    });

    if (!form) {
      return NextResponse.json(
        {
          success: false,
          message: "Form not found.",
        },
        { status: 404 },
      );
    }

    await prisma.form.delete({
      where: {
        id: formId,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Form deleted successfully.",
    });
  } catch (error) {
    console.error("Delete Form Error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Internal server error.",
      },
      { status: 500 },
    );
  }
}
