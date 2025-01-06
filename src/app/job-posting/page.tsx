"use client";
import React, {useEffect} from 'react';
import { useRouter } from "next/navigation";
import axios from "axios";

interface JobPosting {
  companyName: string;
  position: string;
  description: string;
  requirements: string;
}

export default function JobPosting() {

    const router = useRouter();
    const [jobPost, setJobPost] = React.useState({
        companyName: "",
        position: "",
        description: "",
        requirements: "",
    }) 

    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onJobPost =  async () => {
        try {
            setLoading(true)
            await axios.post("/api/job-Posting", jobPost)
            router.push('/')
            
        } catch (error: any) {
            console.log("Login failed", error.message);
        } finally {
            setLoading(false);

        }
    }

    useEffect(() => {
        if(jobPost.companyName.length > 0 && 
            jobPost.position.length > 0 && 
            jobPost.description.length > 0 && 
            jobPost.requirements.length > 0 ){
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
      
    }, [jobPost])

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>{loading ? "Processing" : "Create a job" }</h1>
        <div>
        <hr />
          <label>
            Company Name:
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="companyName"
                type="text"
                value={jobPost.companyName}
                onChange={(e) => setJobPost({...jobPost, companyName: e.target.value})}
                placeholder="companyName"
            />
          </label>
        </div>
        <div>
          <label>
            Position:
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="position"
                type="text"
                value={jobPost.position}
                onChange={(e) => setJobPost({...jobPost, position: e.target.value})}
                placeholder="position"
            />
          </label>
        </div>
        <div>
          <label>
            Description:
            <textarea
                id="description"
                value={jobPost.description}
                onChange={(e) => setJobPost({...jobPost, description: e.target.value})}
                placeholder="Enter job description"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                rows={4}

            />
          </label>
        </div>
        <div>
          <label>
            Requirements:
            <textarea
                id="requirements"
                value={jobPost.requirements}
                onChange={(e) => setJobPost({...jobPost, requirements: e.target.value})}
                placeholder="Enter job requirements"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
                rows={4}
            />
          </label>
        </div>
        <button onClick={onJobPost} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Submit</button>

    </div>
  );
};
