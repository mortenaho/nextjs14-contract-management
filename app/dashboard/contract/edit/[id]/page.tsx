"use client"
import { useEffect, useState } from 'react';

import { ContractModel } from '@/app/dtos/response/contract';
import { Loading } from '@/app/component/loading';
import { useContractService } from '@/app/services/contract-service';
import Alert from '@/app/component/alert';
import { formatDate } from '@/app/_lib/converter';
import { DatePicker } from 'zaman';
import { useQuery } from '@tanstack/react-query';
export type Prop = {
    id: number
}



function fetchUserData({ params }: Prop) {
    console.log(params.id)
  return fetch("/api/contract/get/" + params.id, { method: "get" }).then(p=>p.json())
}
export default function EditContract({ params }: Prop) {
     const { register, handleSubmit, formState: { errors }, GetContractById, Update, loading, serviceStatus,setValue,reset,getValues } = useContractService()
    const [isLoading,setIsLoading ]= useState(true)
    useEffect(() => {
        const fetchd = async () => {
            var mm =await fetch("/api/contract/get/" + params.id, { method: "get" }).finally(()=>{
                setIsLoading(false)
            })
             var ee = await mm.json();
            
            reset(ee.responseBody)
            
        }
         fetchd()
    }, [params.id]);



    if (loading || isLoading) return <Loading />
    const onSubmit = (data) => {
        Update(data)
    }
    function onChange(e,name) {
        var date= formatDate(e.value)
        setValue(name,date)
      }

    return <div className="w-full   m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   align-middle " onSubmit={handleSubmit(onSubmit)}>
            <input type='hidden'  defaultValue={getValues("contractId")} />
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    Title  
                </label>
                <input     {...register("title")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" />
                {errors.title && <p className="text-red-500">{errors.title?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    Contract Number
                </label>
                <input     {...register("contractNumber")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contractNumber" type="text" placeholder="contractNumber" />
                {errors.contractNumber && <p className="text-red-500">{errors.contractNumber?.message}</p>}
            </div>
            <div className="flex gap-2">
                <div className="mb-6 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        start date  
                    </label>
                    <DatePicker  defaultValue={getValues("startDate")} onChange={(e)=>onChange(e,"startDate")}    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <input type='hidden'   {...register('startDate')} />
                    {errors.startDate && <p className="text-red-500">{errors.startDate?.message}</p>}
                </div>
                <div className="mb-6 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        end date
                    </label>
                    <DatePicker defaultValue={getValues("endDate")} onChange={(e)=>onChange(e,"endDate")}  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                    <input type='hidden'   {...register('endDate')} />
                    {errors.endDate && <p className="text-red-500">{errors.endDate?.message}</p>}
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    description
                </label>
                <textarea  {...register('description')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="description" />

            </div>


            <div className="flex items-center justify-between">
                <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Save
                </button>

            </div>
        </form>
        {serviceStatus && <Alert position='top' message={serviceStatus?.message} alertType={serviceStatus.isSuccess ? "success" : "error"} />}
    </div>

}
