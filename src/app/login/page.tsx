"use client";
import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";



export default function LoginPage() {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",

    }) 

    const [buttonDisable, setButtonDisable] = React.useState(false);
    const [loading, setLoading] = React.useState(false);

    const onLogin = async () => {
        try {
            setLoading(true)
            await axios.post("/api/user/login", user)
            router.push('/')
            
        } catch (error: any) {
            console.log("Login failed", error.message);
        } finally {
            setLoading(false);

        }
    }


    useEffect(() => {
        if(user.email.length > 0 && user.password.length > 0 ){
            setButtonDisable(false)
        } else {
            setButtonDisable(true)
        }
      
    }, [user])
    
    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
            <h1>{loading ? "Processing" : "login" }</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="email"
                type="text"
                value={user.email}
                onChange={(e) => setUser({...user, email: e.target.value})}
                placeholder="email"

            />
            <label htmlFor="password">password</label>
            <input
                className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600"
                id="username"
                type="password"
                value={user.password}
                onChange={(e) => setUser({...user, password: e.target.value})}
                placeholder="password"

            />
            <button onClick={onLogin} className="p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600">Login here</button>

            <Link href="/signup">Visit signup page</Link>
            
            
        </div>
    )
}