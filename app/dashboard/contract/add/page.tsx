"use client"

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { AddContractFromValidation } from '@/app/util/form-validation/add-contract-validation';
import { getCookie } from '@/app/_lib/coocki';
import { LoginCookiName } from '@/app/_lib/general-var';
import { Token } from '@/app/dtos/response/token';
import { GeneralResponse } from '@/app/dtos/response/general-response';
import { useRouter } from 'next/navigation';

export default function AddContract() {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(AddContractFromValidation),
    });
    const [token, setToken] = useState<Token | null>(null)
    const router=useRouter();
    
    useEffect(function () {
        getCookie<Token>(LoginCookiName).then(p => { setToken(p) });
    }, [])
    async function onSubmit(data) {

        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `${token?.tokenType} ${token?.accessToken}`,
        });
        try {
            const response = await fetch("http://localhost:5251/Contract/AddContract", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    "createdDate": "2024-08-17T19:22:23.069Z",
                    "updatedDate": "2024-08-17T19:22:23.069Z",
                    "isDeleted": true,
                    "title": data.title,
                    "Description": data.description,
                    "startDate": data.startDate,
                    "endDate": data.endDate,
                    "userId": 0,

                }),
            })
            // Handle the response if needed
            if (response.ok) {
                
              const res:GeneralResponse=  await response.json() as GeneralResponse
              alert(res.responseMessage)
              router.push("/dashboard/contract")
               
            } else {
                alert(response.statusText)
            }
        } catch (error) {
            console.log(error)
              alert(error instanceof Error ? error.message : "An unknown error occurred")
        }


        // const bodyResponse = await response.json();
    };
    
    return <div className="w-full   m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4  align-middle" onSubmit={handleSubmit(onSubmit)} >
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    Title
                </label>
                <input   {...register('title')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" />
                {errors.title && <p className="text-red-500">{errors.title?.message}</p>}
            </div>
            <div className="flex gap-2">
                <div className="mb-6 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        start date
                    </label>
                    <input   {...register('startDate')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="start-date" type="date" placeholder="" />
                    {errors.startDate && <p className="text-red-500">{errors.startDate?.message}</p>}
                </div>
                <div className="mb-6 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        end date
                    </label>
                    <input {...register('endDate')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="end-date" type="date" placeholder="" />
                    {errors.endDate && <p className="text-red-500">{errors.endDate?.message}</p>}
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    description
                </label>
                <textarea  {...register('description')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="description" placeholder="description" />

            </div>


            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Save
                </button>

            </div>
        </form>
    </div>
}