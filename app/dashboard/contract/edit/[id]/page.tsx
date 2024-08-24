"use client"
import { useEffect, useState } from 'react';

import { ContractModel } from '@/app/dtos/response/contract';
import { Loading } from '@/app/component/loading';
import { useContractService } from '@/app/services/contract-service';

export type Prop = {
    id: number
}
export default function EditContract({ params }: Prop) {
    const [data, setData] = useState(null);
    const [contract, setContract] = useState<ContractModel | null>(null);

    const { register, handleSubmit, formState: { errors }, GetContractById, Update, loading, serviceStatus } = useContractService()
    
    useEffect(() => {
       
        const fetchd = async () => {
            
            var mm = await fetch("/api/get-contract/" + params.id, { method: "get" })
            var ee = await mm.json();
            setContract(ee.responseBody)
        }
        fetchd()
    }, [params.id]);



    if (loading) return <Loading />
    const onSubmit = () => {

    }


    return <div className="w-full   m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   align-middle " onSubmit={handleSubmit(onSubmit)}>
            <input type='hidden' defaultValue={contract?.contractId} />
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    Title
                </label>
                <input defaultValue={contract?.title}    {...register("title")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" />
                {errors.title && <p className="text-red-500">{errors.title?.message}</p>}
            </div>
            <div className="flex gap-2">
                <div className="mb-6 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        start date
                    </label>
                    <input defaultValue={contract?.startDate}  {...register('startDate')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="start-date" type="date" placeholder="" />
                    {errors.startDate && <p className="text-red-500">{errors.startDate?.message}</p>}
                </div>
                <div className="mb-6 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        end date
                    </label>
                    <input defaultValue={contract?.endDate}  {...register('endDate')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="end-date" type="date" placeholder="" />
                    {errors.endDate && <p className="text-red-500">{errors.endDate?.message}</p>}
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    description
                </label>
                <textarea defaultValue={contract?.description} {...register('description')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="description" />

            </div>


            <div className="flex items-center justify-between">
                <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                    Save
                </button>

            </div>
        </form>

        {/* {serviceStatus && <Alert position='top' message={serviceStatus?.message} alertType={serviceStatus.isSuccess ? "success" : "error"} />} */}

    </div>

}
