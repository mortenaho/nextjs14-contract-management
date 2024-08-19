"use client"
import { useRouter } from 'next/navigation'
import { formDataToJson } from "@/app/_lib/converter";
import { Token } from "@/app/dtos/response/token";
import { useState,useEffect } from "react";
import { ResponseErrorType } from '@/app/models/errors/response-error';
import { deleteCookie, getCookie, setCookie } from '@/app/_lib/coocki';
import { LoginCookiName } from '@/app/_lib/general-var';




export default function Login() {
    const router = useRouter();
    const [error, setError] = useState<ResponseErrorType | null>(null);
     

    useEffect(() => {
        getCookie<Token>(LoginCookiName).then(p => {
            if (p!=undefined) {
                router.push("/dashboard")
            }
        
      }, [router]);
  
    })
    // if (token.expiresIn>0) {
    //     router.push("/dashboard")
    // }
    async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault(); // Prevent the default form submission behavior

        setError(null); // Reset error state

        const formdata = new FormData(event.currentTarget);
        const email = formdata.get("email") as string;
        const password = formdata.get("password") as string;

        formdata.set("twoFactorCode", "");
        formdata.set("twoFactorRecoveryCode", "");
        const data = JSON.stringify(formDataToJson(formdata));
        try {
            const response = await fetch("http://localhost:5251/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            })

            const bodyResponse = await response.json();
            if (response.ok) {
                const myToken: Token = bodyResponse as Token;
                setCookie(LoginCookiName, JSON.stringify(bodyResponse), {
                    httpOnly: true,
                    maxAge: myToken.expiresIn
                }).finally(()=>{
                    router.push("/dashboard")
                })
                
            } else {
                setError({
                    code: 12,
                    message: response.statusText
                })
            }

        } catch (error) {
            setError({
                code: 500,
                message: error instanceof Error ? error.message : "An unknown error occurred"
            });
        }

        // Signin(email,password);
    }

    return <div className="w-full max-w-xs m-auto ">
        <div className={`text-white  border-red-800 bg-red-500 p-4 rounded mb-2 ${error == null ? 'hidden' : ''}`}>{error?.message}</div>
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   align-middle " onSubmit={handleSubmit}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    Username
                </label>
                <input name="email" className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="email" />
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    Password
                </label>
                <input name="password" className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />

            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Sign In
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    Forgot Password?
                </a>
            </div>
        </form>
    </div>
}

