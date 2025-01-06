import { NextRequest, NextResponse } from "next/server";
import bcrypt from "bcrypt"
import User from "@/models/usersModel"
import { connect } from "@/dbConfig/dbConfig";

connect()

export async function POST(request: NextRequest) {

    try {
        const reqBody = await request.json();
        const {name, email, password, role } = reqBody;

    // Check if there is already an admin registered
    const existingAdmin = await User.findOne({ role: "admin" });

    if (role === 'admin' && existingAdmin) {
        return NextResponse.json({ error: "Only one admin can sign up." }, { status: 400 });
    }

    const existingUser = await User.findOne({email});

        if (existingUser){
            return NextResponse.json({error: "User already exist"},
            {status: 400})
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)

        const newUser =new User({
            name,
            email,
            password: hashedPassword,
            role: role
        })


        const savedUser = await newUser.save();

        console.log(savedUser);
        
        
        return NextResponse.json({ success: true, message: "User created successfully",
        savedUser
        }, { status: 201 });


    } catch (error: any) {

        if (error.code === 11000 && error.keyPattern && error.keyPattern.email) {
            return NextResponse.json({error: "User with this email already exists."},
            {status: 400})
        }

        return NextResponse.json({error: error.message},
            {status: 500})
        
    }

}
