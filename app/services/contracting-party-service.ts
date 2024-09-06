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
import { ContractingParty } from "../dtos/request/contracting-party";




export function useContracingPartyService() {
    const [loading, setLoading] = useState<boolean>(false);
    const [token, setToken] = useState<Token | null>(null);
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus | null>(null);
    const [contractingParty, setContractingParty] = useState<ContractingParty | null>(null);
 
     
    const { register, handleSubmit, formState: { errors } , setValue, reset,getValues,clearErrors} = useForm({
        resolver: yupResolver(AddContractFromValidation),
    });

    useEffect(function () {
        getCookie<Token>(LoginCookiName).then(p => {
            setToken(p)
        });
    }, [])

    async function GetById(id: number) {
        setServiceStatus(null);
        setLoading(true);
        var result:GeneralResponseGeneric<ContractingParty|null>;
        try {
            const response = await fetch("/api/get-contract/" + id, { method: "Get" });
            if (response.ok) {
                const res: GeneralResponseGeneric<ContractingParty|null> = await response.json() as GeneralResponseGeneric<ContractingParty|null>;
                if (res.responseCode === 100) {
                    setServiceStatus({ message: res.responseMessage, isSuccess: true });
                    result=res;
                    setContractingParty(res.responseBody)
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

    async function  Deleted(id: number) {
        setServiceStatus(null)
        setLoading(true);
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `${token?.tokenType} ${token?.accessToken}`
        });


        try {
            const response = await fetch("http://localhost:5251/api/v1/ContractingParty/delete/"+id, {
                method: "delete",
                headers: headers,
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
    }
    async function GetAll() {
        setServiceStatus(null);
        setLoading(true);
        var result:GeneralResponseGeneric<Array<ContractingParty>|null>;
        try {
            const response = await fetch("/api/contracting-party/get", { method: "Get" });
            if (response.ok) {
                const res: GeneralResponseGeneric<Array<ContractingParty>|null> = await response.json() as GeneralResponseGeneric<Array<ContractingParty>|null>;
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


    const Update = async (formdata: ContractingParty) => {
        setServiceStatus(null)
        setLoading(true);
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `${token?.tokenType} ${token?.accessToken}`
        });


        try {
            const response = await fetch("http://localhost:5251/api/v1/ContractingParty/Update", {
                method: "put",
                headers: headers,
                body: JSON.stringify({
                    "ContractingPartyName": formdata.contractingPartyName,
                    "IsLegal": formdata.isLegal,
                    "NationalCode": formdata.nationalCode,
                    "ContractingPartyId":formdata.contractingPartyId
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

    const Add = async (formdata: ContractingParty) => {
        setServiceStatus(null)
        setLoading(true);
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `${token?.tokenType} ${token?.accessToken}`
        });


        try {
            const response = await fetch("http://localhost:5251/api/v1/ContractingParty/Add", {
                method: "POST",
                headers: headers,
                body: JSON.stringify({
                    "ContractingPartyName": formdata.contractingPartyName,
                    "IsLegal": formdata.isLegal,
                    "NationalCode": formdata.nationalCode
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

    return { register, handleSubmit, formState: { errors }, GetById, Add, Update, loading,Deleted, serviceStatus,contractingParty ,setValue,reset,getValues,clearErrors,GetAll};
}