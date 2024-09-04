"use client"
import { useEffect, useState } from 'react';

import { Loading } from '@/app/component/loading';
import { useContractService } from '@/app/services/contract-service';
import Alert from '@/app/component/alert';
import { convertToGregorian, convertToJalali, formatDate } from '@/app/_lib/converter';
import JalaliDatepicker from '@/app/component/JalaliDatepicker';
import DatePicker from 'react-multi-date-picker';
import persian from "react-date-object/calendars/persian"
import persian_fa from "react-date-object/locales/persian_fa"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faSave } from '@fortawesome/free-solid-svg-icons';
import { ContractingParty } from '@/app/dtos/request/contracting-party';
import { useContracingPartyService } from '@/app/services/contracting-party-service';
export type Prop = {
    id: number
}

export default function EditContract({ params }: Prop) {
    const { register, handleSubmit, formState: { errors }, GetContractById, Update, loading, serviceStatus, setValue, reset, getValues } = useContractService()
    const [isLoading, setIsLoading] = useState(true)
    const [startDate, setStartDate] = useState("2024/01/01")

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

    useEffect(() => {

        const fetchd = async () => {
            var mm = await fetch("/api/contract/get/" + params.id, { method: "get" }).finally(() => {
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
    function onChange(e, name) {
        var date = formatDate(e.value)
        setValue(name, date)
    }

    return <div className="w-full   m-auto">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   align-middle " onSubmit={handleSubmit(onSubmit)}>
            <input type='hidden' {...register("contractId")} />
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    عنوان قرار داد
                </label>
                <input     {...register("title")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="title" />
                {errors.title && <p className="text-red-500">{errors.title?.message}</p>}
            </div>
           
            <div className="flex gap-2">
            <div className="mb-4 w-1/3">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                   شماره قرارداد
                </label>
                <input     {...register("contractNumber")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contractNumber" type="text" placeholder="contractNumber" />
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
                    {/* <DatePicker  defaultValue={"2024/02/01"} onChange={(e)=>onChange(e,"startDate")}    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" /> */}
                    <DatePicker
                        calendar={persian}
                        locale={persian_fa}
                        calendarPosition="bottom-right"
                        onChange={(date)=>setValue("startDate",convertToGregorian(date))}
                         value={getValues("shamsiStartDate")}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                        render={<input  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'  />}
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
                        onChange={(date)=>setValue("endDate",convertToGregorian(date))}
                       value={getValues("shamsiEndDate")}
                        render={<input  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight' />}
                        className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
                    />
                     <input type='hidden'   {...register('endDate')} />
                    {errors.endDate && <p className="text-red-500">{errors.endDate?.message}</p>}
                </div>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    توضیحات
                </label>
                <textarea  {...register('description')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder="description" />

            </div>


            <div className="flex items-center justify-between">
                <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
                   <FontAwesomeIcon size='lg' icon={faSave}/> ویرایش درخواست
                </button>

            </div>
        </form>
        {serviceStatus && <Alert position='top' message={serviceStatus?.message} alertType={serviceStatus.isSuccess ? "success" : "error"} />}
    </div>

}
