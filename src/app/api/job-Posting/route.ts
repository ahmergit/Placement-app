import { NextRequest, NextResponse } from "next/server";
import JobPosting from '@/models/jobPostingModel';
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function POST(request: NextRequest) {
  if (request.method === 'POST') {
    try {
        const reqBody =  await request.json();  
        const { companyName, position, description, requirements } = reqBody;
        const jobPosting = new JobPosting({
          companyName,
          position,
          description,
          requirements
        });
        console.log(jobPosting);
        const savedJob = await jobPosting.save();
        return NextResponse.json({ success: true,
          message: "Job created successfully",
          savedJob
        }, { status: 201 });
    } catch (error: any) {
        return NextResponse.json({error: error.message},
        {status: 500}) 
    }
  } else {
    return NextResponse.json({message: "method not allowed"})
  }
}
