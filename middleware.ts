import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { cookies } from 'next/headers';

export async function middleware(request: NextRequest) {
    const cookie = await cookies();
    const authToken = cookie.get('authToken')?.value

    if (request.nextUrl.pathname.startsWith('/dashboard') && !authToken) {
           return NextResponse.redirect(new URL('/login', request.nextUrl));
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*'],
};
