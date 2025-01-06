import { NextRequest, NextResponse } from 'next/server';
import JobPosting from '@/models/jobPostingModel';
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params;
  console.log(id);
  
  const { approved: updateApproved } = await request.json();

  try {
    // Check if id is present
    if (!id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const jobPosting = await JobPosting.findById(id);
    if (!jobPosting) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }


    jobPosting.approved = updateApproved; 
    await jobPosting.save();

    if (!updateApproved) {
      await jobPosting.deleteOne();
      return NextResponse.json({ message: 'Job rejected and deleted successfully' });
    }

    return NextResponse.json({ message: "Job status updated" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}