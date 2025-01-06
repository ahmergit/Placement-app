import { NextRequest, NextResponse } from 'next/server';
import { jwtVerify } from 'jose';


const secretKey = process.env.JWT_SCERET_KEY;


export async function middleware(req) {
    const path = req.nextUrl.pathname;
    const token = req.cookies.get('token')?.value;
    const keyString = process.env.JWT_SCERET_KEY;

    if (!token) {
        // Redirect to login if not logged in (except for login and public routes)
        if (!path.startsWith('/login') && !path.startsWith('/signup') && !path.startsWith('/')) {
            return NextResponse.redirect(new URL('/', req.url));
        }
    } else {
        try {
            const encoder = new TextEncoder();
            const keyUint8Array = encoder.encode(keyString);
            const { payload: decoded, protectedHeader } = await jwtVerify(token, keyUint8Array);

            if (path === '/job-approved' && decoded.role !== 'admin') {
                return NextResponse.redirect(new URL('/', req.url)); // Redirect to unauthorized page for non-admins
            } else if (decoded.role === 'student') {
                // Allow access to student routes (home, apply job)
                if (path === '/jobs' || path === '/apply-job') {
                    return NextResponse.next(); // Allow access
                } else {
                    return NextResponse.redirect(new URL('/', req.url)); // Redirect to unauthorized page for other routes
                }
            } else if (decoded.role === 'admin') {
                // Allow access to admin routes (job-approved)
                if (path === '/unApprovedJob' || path === `/unApprovedJob${job._id}`) {
                    return NextResponse.next(); // Allow access
                } else {
                    // Redirect admins to a suitable admin dashboard or homepage
                    return NextResponse.redirect(new URL('/', req.url));
                }
            } else if (decoded.role === 'company_hr') {
                // Allow access to student routes (home, apply job)
                if (path === '/jobs' || path === '/job-posting') {
                    return NextResponse.next(); // Allow access
                } else {
                    return NextResponse.redirect(new URL('/', req.url));
                }
            } else {
                console.log('Unexpected user role:', decoded.role);
                return NextResponse.redirect(new URL('/login', req.url)); // Redirect on unexpected role
            }
        } catch (error) {
            // Handle invalid JWT or other errors
            console.log('Error verifying JWT:', error);
            return NextResponse.redirect(new URL('/login', req.url)); // Redirect to login on error
        }
    }

    return NextResponse.next();
}

// Optional: Define config for matcher (if needed)
export const config = {
  matcher: [
    '/job-approved',
    '/apply-job',
    '/job-posting',
    '/unApprovedJob',

  ], // Match all non-API, static, and image routes
};
