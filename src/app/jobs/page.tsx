"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function ApprovedJob ()  {
  const [approvedJobs, setApprovedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchapprovedJobs = async () => {
      try {
        const response = await axios.get('/api/allJob');
        setApprovedJobs(response.data.approvedJobs);
      } catch (error) {
        console.error('Error fetching jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchapprovedJobs();
  }, []);

  return (
    <div>
      <h1>Jobs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : approvedJobs.length === 0 ? (
        <p>No jobs</p>
      ) : (
        <ul>
          {approvedJobs.map((job: any) => (
            <li key={job._id}>
              <Link href={`/job/${job._id}`}>
                <div className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer transition duration-300 hover:bg-gray-100 block">
                  <p className="text-xl font-semibold mb-2"><strong>Company:</strong> {job.companyName}</p>
                  <p className="text-gray-700 mb-2"><strong>Description:</strong> {job.description}</p>
                  <p className="text-gray-700 mb-2"><strong>Position:</strong> {job.position}</p>
                  <p className="text-gray-700 mb-2"><strong>Requirements:</strong> {job.requirements}</p>
                  
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


