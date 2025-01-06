import { NextRequest, NextResponse } from 'next/server';
import JobPosting from '@/models/jobPostingModel';
import { connect } from "@/dbConfig/dbConfig";

connect();

export async function GET(
  request: NextRequest,
  { params }: { params: { Id: string } }
) {
  const { Id } = params;

  try {
    if (!Id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    // Fetch job by ID
    const jobPosting = await JobPosting.findById(Id as string);
    if (!jobPosting) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Return only necessary fields from the job posting
    return NextResponse.json({ jobPosting });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}

export async function PUT(
  request: NextRequest,
  { params, body }: { params: { Id: string }, body: { approved: boolean } }
) {
  const { Id } = params;
  const { approved } = body;

  try {
    if (!Id) {
      return NextResponse.json({ error: 'Job ID is required' }, { status: 400 });
    }

    const jobPosting = await JobPosting.findById(Id as string);
    if (!jobPosting) {
      return NextResponse.json({ error: 'Job not found' }, { status: 404 });
    }

    // Update approved status
    jobPosting.approved = approved;
    await jobPosting.save();

    // If rejected, delete the job posting
    if (!approved) {
      await jobPosting.deleteOne();
      return NextResponse.json({ message: 'Job rejected and deleted successfully' });
    }

    // Return updated job posting
    return NextResponse.json({ jobPosting });
  } catch (error: any) {
    return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
  }
}
