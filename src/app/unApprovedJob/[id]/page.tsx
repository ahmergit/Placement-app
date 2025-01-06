"use client"
import { useParams } from 'next/navigation'
import axios from 'axios';
import { useEffect, useState } from 'react';
import UpdateStatus from '@/app/components/UpdateStatus'

interface JobPosting {
  _id: string;
  companyName: string;
  position: string;
  description: string;
  requirements: string;
}

export default function JobPostingPage() {
  const params = useParams(); 
  const id = params.id;

  
  
  
  const [jobPosting, setJobPosting] = useState<JobPosting | null>(null);
  const [loading, setLoading] = useState(true);

  const Id: string = Array.isArray(id) ? id[0] : id;

  const initialStatus = false;

  useEffect(() => {
    const fetchJobPosting = async () => {
      try {
        const response = await axios.get(`/api/get-job-by-id/${id}`);
        setJobPosting(response.data.jobPosting);
        
      } catch (error: any) {
        console.error('Error fetching job posting:', error);
        setLoading(false);
      } finally{
        setLoading(false)
      } 

    };

      fetchJobPosting();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!jobPosting) {
    return <p>Job posting not found</p>;
  }

  return (
    <div>
      <h1>Job Posting Details</h1>
      <p><strong>Company:</strong> {jobPosting.companyName}</p>
      <p><strong>Description:</strong> {jobPosting.description}</p>
      <p><strong>Position:</strong> {jobPosting.position}</p>
      <p><strong>Requirements:</strong> {jobPosting.requirements}</p>

      <UpdateStatus Id={Id} initialStatus={initialStatus} />
      
    </div>
  );
}
