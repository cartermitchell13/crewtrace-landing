import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "getcrewtrace.com";

export function middleware(request: NextRequest) {
    const { hostname } = request.nextUrl;

    if (hostname === `www.${CANONICAL_HOST}`) {
        const url = request.nextUrl.clone();
        url.hostname = CANONICAL_HOST;
        return NextResponse.redirect(url, 301);
    }

    return NextResponse.next();
}

export const config = {
    matcher: "/((?!_next/static|_next/image|favicon.ico|icon|apple-icon|manifest.json|images/).*)",
};
