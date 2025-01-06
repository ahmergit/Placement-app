"use client"

import { useState } from 'react';
import { useParams } from 'next/navigation';
import axios from 'axios';

export default function ApplicationPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [qualification, setQualification] = useState('');
    const [experience, setExperience] = useState('');
    const [error, setError] = useState('');

    const { id } = useParams(); // Destructure id directly

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const response = await axios.post(`/api/apply-job/${id}`, {
                name,
                email,
                qualification,
                experience,
            });
            console.log(response.data.message); // Log success message
        } catch (error :any) {
            setError(error.response.data.error); // Set error state
        }
    };

    return (
        <div>
            <h1>Apply for a Job</h1>
            {error && <p>Error: {error}</p>}
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <br />
                <label>
                    Qualification:
                    <input type="text" value={qualification} onChange={(e) => setQualification(e.target.value)} />
                </label>
                <br />
                <label>
                    Experience:
                    <input type="text" value={experience} onChange={(e) => setExperience(e.target.value)} />
                </label>
                <br />
                <button type="submit">Apply</button>
            </form>
        </div>
    );
}

