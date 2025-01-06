import { NextRequest, NextResponse } from 'next/server';
import Application from '@/models/applicationModel'; // Import the Application model
import { jwtVerify, JWTVerifyResult } from 'jose';
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest, { params }: { params: { id: string } }) {
    const { id } = params;

    try {
        // Extract user ID from JWT token
        const token = request.cookies.get('token')?.value;
        const keyString = process.env.JWT_SCERET_KEY;

        if (!token) {
            return NextResponse.json({ error: 'Token not found' }, { status: 401 });
        }

        const encoder = new TextEncoder();
        const keyUint8Array = encoder.encode(keyString);

        const decodedToken: JWTVerifyResult<{ id: string }> = await jwtVerify(token, keyUint8Array);
        const studentId = decodedToken.payload.id;

        // Extract other application data from request body
        const { name, email, qualification, experience } = await request.json();

        // Create a new application instance
        const application = new Application({
            studentId,
            jobPostingId: id,
            name,
            email,
            qualification,
            experience,
        });

        // Save the application to the database
        await application.save();

        // Send a success response
        return NextResponse.json({ message: 'Application submitted successfully' }, { status: 201 });
    } catch (error: any) {
        // Send an error response
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
