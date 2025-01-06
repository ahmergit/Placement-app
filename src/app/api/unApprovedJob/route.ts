import { NextRequest, NextResponse } from 'next/server';
import JobPosting from '@/models/jobPostingModel';
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(request: NextRequest) {
  try {
    const unapprovedJobs = await JobPosting.find({ approved: false });

    if (unapprovedJobs.length === 0) {
      // Return a response indicating no unapproved jobs are pending for approval
      return NextResponse.json({ message: 'There are no unapproved jobs pending for approval' });
    }

    // Return the list of unapproved jobs
    return NextResponse.json({ unapprovedJobs });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}