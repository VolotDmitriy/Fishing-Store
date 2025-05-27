import { NextRequest, NextResponse } from 'next/server';

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    if (pathname.startsWith('/dashboard') || pathname.startsWith('/create')) {
        const cookie = req.headers.get('cookie') || '';

        try {
            const response = await fetch('http://localhost:4200/check-token', {
                method: 'GET',
                headers: {
                    Cookie: cookie,
                },
            });

            if (!response.ok) {
                return NextResponse.redirect(new URL('/auth-admin', req.url));
            }
        } catch (error) {
            console.error('Authentication check failed:', error);
            return NextResponse.redirect(new URL('/auth-admin', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/create/:path*'],
};
