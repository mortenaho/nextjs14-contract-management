"use client"

import Alert from '@/app/component/alert';

import { useAddContract } from './action';
import { useState } from 'react';
 import PersianDatePickerDropdown from '@/app/component/persian-datepicker';

export default function AddContract() {
    const { register, handleSubmit, formState: { errors }, AddContract, loading, serviceStatus } = useAddContract()
     async function onSubmit(data) {
       AddContract(data);
    };

    return <div className="w-full   m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   align-middle " onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    Title
                </label>
                <input   {...register('title')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" />
                {errors.title && <p className="text-red-500">{errors.title?.message}</p>}
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    Contract Number
                </label>
                <input   {...register('contractNumber')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contractNumber" type="text" placeholder="contractNumber" />
                {errors.contractNumber && <p className="text-red-500">{errors.contractNumber?.message}</p>}
            </div>
            <div className="flex gap-2">
                <div className="mb-6 w-1/2">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        start date
                    </label>
                    <PersianDatePickerDropdown key={"kkiii"}/>
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
                <textarea  {...register('description')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="description" />

            </div>


            <div className="flex items-center justify-between">
                <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed" type="submit">
                    Save
                </button>

            </div>
        </form>

        {serviceStatus && <Alert position='top' message={serviceStatus?.message} alertType={serviceStatus.isSuccess ? "success" : "error"} />}

    </div>
}