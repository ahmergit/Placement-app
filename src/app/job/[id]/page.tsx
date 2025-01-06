"use client"
import { useParams } from 'next/navigation'
import axios from 'axios';
import { useEffect, useState } from 'react';
import Link from 'next/link';

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
    return <p>Job not found</p>;
  }

  return (
    <div>
      <h1>Job Details</h1>
      <p><strong>Company:</strong> {jobPosting.companyName}</p>
      <p><strong>Description:</strong> {jobPosting.description}</p>
      <p><strong>Position:</strong> {jobPosting.position}</p>
      <p><strong>Requirements:</strong> {jobPosting.requirements}</p>

      <Link href={`/apply/${id}`} >
      <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        Apply
      </button>
      </Link>

      
    </div>
  );
}
