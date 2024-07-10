import { NextResponse } from "next/server";

export default function middleware(req) {
    const token = req.cookies.get("token")?.value;

    if (token && req.nextUrl.pathname.includes("/login")) {
        const absoluteUrl = new URL("/news", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }

    if (!token && !req.nextUrl.pathname.includes("/login")) {
        const absoluteUrl = new URL("/login", req.nextUrl.origin);
        return NextResponse.redirect(absoluteUrl.toString());
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/((?!api|static|.*\\..*|_next).*)"],
};
