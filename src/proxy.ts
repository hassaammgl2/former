import { NextRequest } from "next/server";
// import { NextRequest, NextResponse } from "next/server";
// import { headers } from "next/headers";
// import { auth } from "@/services/better-auth/auth";

export async function proxy(req: NextRequest) {
    console.log(req)
    //     const session = await auth.api.getSession({
    //         headers: await headers()
    //     })
    //     if (!session) {
    //         return NextResponse.redirect(new URL("/landing", request.url));
    //     }

    //     return NextResponse.next();
}

// export const config = {
//     matcher: ["/landing"], // Specify the routes the middleware applies to
// };