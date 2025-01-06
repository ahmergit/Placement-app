import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import User from "@/models/usersModel"
import { connect } from "@/dbConfig/dbConfig";
import jwt from "jsonwebtoken"

connect()

export async function POST(request: NextRequest) {
    try {

        const reqBody = await request.json()
        const {email, password} = reqBody;
        // console.log(reqBody);

        const user = await User.findOne({email})

        if(!user){
            return NextResponse.json({error: "User doesn not exist"}, {status: 400})
        }

        //check if password is correct
        const validPassword = await bcrypt.compare(password, user.password)

        if(!validPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 401})
        }
        
        const tokenData = {
            id: user._id,
            name: user.name,
            email: user.email,
            role: user.role

        }    
            // create token
            const token = await jwt.sign(tokenData,
                process.env.JWT_SCERET_KEY!, 
                {expiresIn: "1h"} 
            )

            const response = NextResponse.json({
                message: "Login successful",
                success: true,
                userId: user._id
            })

            response.cookies.set("token", token, {
                httpOnly: true,
            })

            return response;

        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
    
}