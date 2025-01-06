"use client";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import { useRouter } from "next/navigation";
import axios from "axios";


// Assuming you have a function handleSubmit for form submission
export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: "",
        password: "",
        name: "",
        role: ""
    });

    const [buttonDisable, setButtonDisable] = useState(false);
    const [loading, setLoading] = useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/user/signup', user);
            router.push('/login');
        } catch (error: any) {
            console.log("Signup failed", error.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 && user.name.length > 0 && user.role){
            setButtonDisable(false);
        } else {
            setButtonDisable(true);
        }
    }, [user]);

    const handleRoleChange = (event: any) => {
        setUser({...user, role: event.target.value});
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "Signup"}</h1>
            <hr />
            <label htmlFor="name">Name:</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="name"
                type="text"
                value={user.name}
                onChange={(e) => setUser({...user, name: e.target.value})}
                placeholder="Name"
            />
            <label htmlFor="email">Email:</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="Email"
            />
            <label htmlFor="password">Password:</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600 text-black"
                id="password"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="Password"
            />
            <label>
                Select Role:
                <select value={user.role} onChange={handleRoleChange}>
                    <option value="">Select Role</option>
                    <option value="admin">Admin</option>
                    <option value="student">Student</option>
                    <option value="company_hr">Company HR</option>
                </select>
            </label>
            <button onClick={onSignup} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">{buttonDisable ? "No signup" : "Signup"}</button>
            <Link href="/login">Visit login page</Link>
        </div>
    );
}
