"use client"
import Link from "next/link"
import { getCookie } from "../_lib/coocki"
import { LoginCookiName } from "../_lib/general-var"
import { Token } from "../dtos/response/token"
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
export default function DashboardLayout({ children }) {

    const router = useRouter()
    
    useEffect(() => {
        getCookie<Token>(LoginCookiName).then(p => {
            if (p == undefined) {
                router.push("/login")
            }

        }, [router]);

    })



    return <div className="bg-sky-700 h-lvh">
        <div className="flex h-screen">

            <div className="w-64 bg-gray-800 text-white">
                <div className="p-4 text-2xl font-semibold">My Sidebar</div>
                <ul className="mt-6">
                    <li><Link prefetch={false} href="/dashboard" className="block py-2 px-4 hover:bg-gray-700">Home</Link></li>
                    <li><Link prefetch={false} href="/dashboard/contract" className="block py-2 px-4 hover:bg-gray-700"> Contract</Link></li>
                    <li><Link prefetch={false} href="/dashboard/contract/add" className="block py-2 px-4 hover:bg-gray-700">Add Contract</Link></li>
                    <li><Link prefetch={false} href="/logout" className="block py-2 px-4 hover:bg-gray-700">logout</Link></li>
                </ul>
            </div>

            <div className="flex-1">
                <div className="flex bg-gray-700 h-16">
                    <p className="absolute right-2 top-3 h-9 w-9 rounded-full bg-blue-500 text-white text-center content-center" >M</p>
                </div>
                <div className="p-4">
                    {children}
                </div>

            </div>

        </div>
    </div>
}