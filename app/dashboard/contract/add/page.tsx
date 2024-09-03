"use client"

import Alert from '@/app/component/alert';

import { useAddContract } from './action';
import { useEffect, useState } from 'react';

import { convertToGregorian, formatDate } from '@/app/_lib/converter';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { useContracingPartyService } from '@/app/services/contracting-party-service';
import { ContractingParty } from '@/app/dtos/request/contracting-party';

export default function AddContract() {
    const { register, handleSubmit, formState: { errors }, AddContract, loading, serviceStatus, reset, setValue } = useAddContract()
    const [contracting, setContracting] = useState<Array<ContractingParty> | null>(null)
    const contracingParty = useContracingPartyService()
    useEffect(() => {
        async function fetchData() {
            try {
                var data = contracingParty.GetAll();
                setContracting((await data).responseBody);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);
    async function onSubmit(data) {
        AddContract(data);

    };
    function onChange(e, name) {
        var date = formatDate(e.value)
        setValue(name, date)
    }

    return <div className="w-full   m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   align-middle " onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    عنوان
                </label>
                <input   {...register('title')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="عنوان قرار داد" />
                {errors.title && <p className="text-red-500">{errors.title?.message}</p>}
            </div>
           
            <div className="flex gap-2">
            <div className="mb-4 w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    شماره قرار داد
                </label>
                <input   {...register('contractNumber')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contractNumber" type="text" placeholder="شماره قرار داد" />
                {errors.contractNumber && <p className="text-red-500">{errors.contractNumber?.message}</p>}
            </div>
    
            <div className="mb-4 w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    پیمانکار
                </label>
                <select className='text-black w-full' {...register('contractingPartyId')} defaultValue="">
                    <option value="" disabled>انتخاب کنید</option>
                    {contracting && contracting.map((p) => {
                        return (
                            <option key={p.contractingPartyId} value={p.contractingPartyId}>
                                {p.contractingPartyName}
                            </option>
                        );
                    })}
                </select>
                {errors.startDate && <p className="text-red-500">{errors.contractingPartyId?.message}</p>}
            </div>
                <div className="mb-6 w-1/3">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        تاریخ شروع
                    </label>
                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        onChange={(date) => setValue("startDate", convertToGregorian(date))}
                         
                        render={<input className='shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight' />}
                    />
                    <input type='hidden'   {...register('startDate')} />
                    {errors.startDate && <p className="text-red-500">{errors.startDate?.message}</p>}
                </div>
                <div className="mb-6 w-1/3">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        تاریخ پایان
                    </label>
                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        onChange={(date) => setValue("endDate", convertToGregorian(date))}

                        render={<input className='shadow appearance-none border rounded w-96 py-2 px-3 text-gray-700 leading-tight' />}
                    />
                    <input type='hidden'   {...register('endDate')} />
                    {errors.endDate && <p className="text-red-500">{errors.endDate?.message}</p>}
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    توضیحات
                </label>
                <textarea  {...register('description')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="توضیحات در مورد قرار داد" />

            </div>


            <div className="flex items-center justify-between">
                <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline disabled:cursor-not-allowed" type="submit">
                    ثبت قرارداد
                </button>

            </div>
        </form>

        {serviceStatus && <Alert position='top' message={serviceStatus?.message} alertType={serviceStatus.isSuccess ? "success" : "error"} />}

    </div>
}