import Alert from "@/app/component/alert"
import { PrimaryButton } from "@/app/component/custom-button"
import { useContracingPartyService } from "@/app/services/contracting-party-service"

export default function AddContractingPartyForm() {
    const contractingPartyService = useContracingPartyService()
    const AddOnSubmit = (data) => {
        contractingPartyService.Add(data)
    }
    return <>
        <form onSubmit={contractingPartyService.handleSubmit(AddOnSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    پیمانکار
                </label>
                <input {...contractingPartyService.register("contractingPartyName")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="پیمانکار" />
                {contractingPartyService.errors.contractingPartyName && <p className="text-red-500">{contractingPartyService.errors.contractingPartyName?.message}</p>}
            </div>
            <div className="flex">
                <div className="mb-4 w-2/3 p-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        شناسه ملی
                    </label>
                    <input {...contractingPartyService.register("nationalCode")} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="title" type="text" placeholder="شناسه ملی" />
                    {contractingPartyService.errors.nationalCode && <p className="text-red-500">{contractingPartyService.errors.nationalCode?.message}</p>}
                </div>
                <div className="mb-4 w-2/3 p-1">
                    <label className="block text-gray-700 text-sm font-bold mb-2"  >
                        حقوقی
                    </label>
                    <input {...contractingPartyService.register("isLegal")} className="" type="checkbox" />
                </div>
            </div>
            <div>
                <PrimaryButton type="submit" onClick={AddOnSubmit}>ثبت</PrimaryButton>
            </div>
        </form>
        {contractingPartyService.serviceStatus && <Alert position='top' message={contractingPartyService.serviceStatus?.message} alertType={contractingPartyService.serviceStatus.isSuccess ? "success" : "error"} />}

    </>
}