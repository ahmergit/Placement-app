"use client"
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

export default function UnapprovedJob ()  {
  const [unapprovedJobs, setUnapprovedJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUnapprovedJobs = async () => {
      try {
        const response = await axios.get('/api/unApprovedJob');
        setUnapprovedJobs(response.data.unapprovedJobs);
      } catch (error) {
        console.error('Error fetching unapproved jobs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUnapprovedJobs();
  }, []);

  return (
    <div>
      <h1>Unapproved Jobs</h1>
      {loading ? (
        <p>Loading...</p>
      ) : unapprovedJobs.length === 0 ? (
        <p>No unapproved jobs pending for approval</p>
      ) : (
        <ul>
          {unapprovedJobs.map((job: any) => (
            <li key={job._id}>
              <Link href={`/unApprovedJob/${job._id}`}>
                <div className="bg-white rounded-lg shadow-md p-4 mb-4 cursor-pointer transition duration-300 hover:bg-gray-100 block">
                  <p className="text-xl font-semibold mb-2"><strong>Company:</strong> {job.companyName}</p>
                  <p className="text-gray-700 mb-2"><strong>Description:</strong> {job.description}</p>
                  <p className="text-gray-700 mb-2"><strong>Position:</strong> {job.position}</p>
                  <p className="text-gray-700 mb-2"><strong>Requirements:</strong> {job.requirements}</p>
                  {/* Add buttons for approval and rejection */}
                </div>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};


