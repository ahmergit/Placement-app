import { NextRequest, NextResponse } from 'next/server';
import JobPosting from '@/models/jobPostingModel';
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const approvedJobs = await JobPosting.find({ approved: true });

    if (approvedJobs.length === 0) {
      // Return a response indicating no unapproved jobs are pending for approval
      return NextResponse.json({ message: 'There are no approved jobs ' });
    }

    // Return the list of unapproved jobs
    return NextResponse.json({ approvedJobs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}