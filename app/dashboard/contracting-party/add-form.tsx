export default function AddContractingPartyForm() {
    return <>
        <form>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    پیمانکار
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="پیمانکار" />
                {/* {errors.title && <p className="text-red-500">{errors.title?.message}</p>} */}
            </div>
            <div className="flex">
                <div className="mb-4 w-2/3 p-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        شناسه ملی
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="شناسه ملی" />
                    {/* {errors.title && <p className="text-red-500">{errors.title?.message}</p>} */}
                </div>
                <div className="mb-4 w-2/3 p-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        حقیقی/حقوقی
                    </label>
                    <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="حقیقی/حقوقی" />
                    {/* {errors.title && <p className="text-red-500">{errors.title?.message}</p>} */}
                </div>
            </div>
        </form>
    </>
}