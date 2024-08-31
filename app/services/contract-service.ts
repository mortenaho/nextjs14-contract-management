"use client"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Token } from "@/app/dtos/response/token";
import { getCookie, setCookie } from "@/app/_lib/coocki";
import { LoginCookiName } from "@/app/_lib/general-var";
import { useRouter } from "next/navigation";
import { GeneralResponse, GeneralResponseGeneric } from "@/app/dtos/response/general-response";
import { AddContractFromValidation } from "@/app/util/form-validation/add-contract-validation";
import { AddContractRequest } from "@/app/dtos/request/add-contract-request";
import { ServiceStatus } from "@/app/models/service-status";
import { ContractModel } from "@/app/dtos/response/contract";




export function useContractService() {
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<Token | null>(null);
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(null);
    const [contract, setContract] = useState<ContractModel>();
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } , setValue, reset,getValues} = useForm({
        resolver: yupResolver(AddContractFromValidation),
    });

    useEffect(function () {
        getCookie<Token>(LoginCookiName).then(p => {
            setToken(p)
        });
    }, [contract])

    async function GetContractById(id: number) {
        setServiceStatus(null);
        setLoading(true);
        var result:GeneralResponseGeneric<ContractModel|null>;
        try {
            const response = await fetch("/api/get-contract/" + id, { method: "Get" });
            if (response.ok) {
                const res: GeneralResponseGeneric<ContractModel|null> = await response.json() as GeneralResponseGeneric<ContractModel|null>;
                if (res.responseCode === 100) {
                    setServiceStatus({ message: res.responseMessage, isSuccess: true });
                    result=res;
                }
                else{
                    setServiceStatus({ message: res.responseMessage, isSuccess: false });
                    result=  {
                        responseBody:null,
                        responseCode:500,
                        responseMessage:res.responseMessage
                    }
                }
               
            } else {
                setServiceStatus({ message: response.statusText, isSuccess: false });
                result=  {
                    responseBody:null,
                    responseCode:500,
                    responseMessage:response.statusText
                }
            }
            setLoading(false);
            
        } catch (error) {
            setLoading(false);
            var message=error instanceof Error ? error.message : "An unknown error occurred";
            setServiceStatus({ message:message, isSuccess: false });
            result=  {
                responseBody:null,
                responseCode:500,
                responseMessage:message
            }
        }
        return result;
    }


    const Update = async (formdata: AddContractRequest) => {
        setServiceStatus(null)
        setLoading(true);
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `${token?.tokenType} ${token?.accessToken}`
        });


        try {
            const response = await fetch("http://localhost:5251/api/v1/Contract/Update", {
                method: "put",
                headers: headers,
                body: JSON.stringify({
                    "title": formdata.title,
                    "Description": formdata.description,
                    "startDate": formdata.startDate,
                    "endDate": formdata.endDate,
                    "contractNumber": formdata.contractNumber,
                    "contractId": formdata.contractId,
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

    const Add = async (formdata: AddContractRequest) => {
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

    return { register, handleSubmit, formState: { errors }, GetContractById, Add, Update, loading, serviceStatus, contract ,setValue,reset,getValues};
}