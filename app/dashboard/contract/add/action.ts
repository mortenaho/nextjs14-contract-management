"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Token } from "@/app/dtos/response/token";
import { getCookie, setCookie } from "@/app/_lib/coocki";
import { LoginCookiName } from "@/app/_lib/general-var";
import { useRouter } from "next/navigation";
import { GeneralResponse } from "@/app/dtos/response/general-response";
import { AddContractFromValidation } from "@/app/util/form-validation/add-contract-validation";
import { AddContractRequest } from "@/app/dtos/request/add-contract-request";
import { ServiceStatus } from "@/app/models/service-status";




export function useAddContract() {
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<Token | null>(null);
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(null);
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } ,reset,setValue} = useForm({
        resolver: yupResolver(AddContractFromValidation),
    });

    useEffect(function () {
        getCookie<Token>(LoginCookiName).then(p => {
            setToken(p)
        });
    }, [])

    const AddContract = async (formdata: AddContractRequest) => {
        setServiceStatus(null)
        setLoading(true);
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `${token?.tokenType} ${token?.accessToken}`
        });


        try {
            const response = await fetch("http://localhost:5251/api/v1/Contract/Add", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    "title": formdata.title,
                    "Description": formdata.description,
                    "startDate": formdata.startDate,
                    "endDate": formdata.endDate,
                    "contractNumber": formdata.contractNumber,
                    "contractingPartyId": formdata.contractingPartyId
                }),
            })
            // Handle the response if needed
            if (response.ok) {

                const res: GeneralResponse = await response.json() as GeneralResponse
                 if (res.responseCode === 100)
                setServiceStatus({ message: res.responseMessage, isSuccess: true })
                else
                 setServiceStatus({ message: res.responseMessage, isSuccess: false })


            } else {
                setServiceStatus({ message: response.statusText, isSuccess: false })
            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setServiceStatus({ message: error instanceof Error ? error.message : "An unknown error occurred", isSuccess: false })
        }
    };
    return { register, handleSubmit, formState: { errors }, AddContract, loading, serviceStatus ,reset,setValue};
}



// const AddContract = async (formdata: AddContractRequest) => {

//     setLoading(true);
//     const headers = new Headers({
//         "Content-Type": "application/json",
//         "Authorization": `${token?.tokenType} ${token?.accessToken}`
//     });


//     try {
//         const response = await fetch("http://localhost:5251/Contract/AddContract", {
//             method: "POST",
//             headers: headers,
//             body: JSON.stringify({
//                 "title": formdata.title,
//                 "Description": formdata.description,
//                 "startDate": formdata.startDate,
//                 "endDate": formdata.endDate
//             }),
//         })
//         // Handle the response if needed
//         if (response.ok) {

//             const res: GeneralResponse = await response.json() as GeneralResponse
//             alert(res.responseMessage)
//             router.push("/dashboard/contract")

//         } else {
//             setServiceError(response.statusText)
//         }
//         setLoading(false)
//     } catch (error) {
//         setLoading(false)
//         setServiceError(error instanceof Error ? error.message : "An unknown error occurred")
//     }
// };

