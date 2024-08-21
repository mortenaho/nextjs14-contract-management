"use client"

import { useState } from "react";
import loginValidationSchema from "../../util/form-validation/login-validation";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Token } from "@/app/dtos/response/token";
import { setCookie } from "@/app/_lib/coocki";
import { LoginCookiName } from "@/app/_lib/general-var";
import { useRouter } from "next/navigation";
import { ServiceStatus } from "@/app/models/service-status";


type LoginModel = {
    email: string,
    password: string
}
export function useSignin() {
    const [loading, setLoading] = useState<boolean>(false);
    const [serviceStatus, setServiceStatus] = useState<ServiceStatus|null>(null);
    const router = useRouter()
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(loginValidationSchema),
    });

    const postData = async (formdata) => {
setServiceStatus(null)
        setLoading(true);
        formdata["twoFactorCode"] = "";
        formdata["twoFactorRecoveryCode"] = "";
        const data = JSON.stringify(formdata);
        try {
            const response = await fetch("http://localhost:5251/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: data,
            })

            const bodyResponse = await response.json();
            setLoading(false)
            if (response.ok) {
                const myToken: Token = bodyResponse as Token;
                setServiceStatus({ message: response.statusText, isSuccess: true })
                setCookie(LoginCookiName, JSON.stringify(bodyResponse), {
                    httpOnly: true,
                    maxAge: myToken.expiresIn
                }).finally(() => {
                    router.push("/dashboard")
                })

            } else {
                setServiceStatus({ message: response.statusText, isSuccess: false })

            }
            setLoading(false)
        } catch (error) {
            setLoading(false)
            setServiceStatus({ message: error instanceof Error ? error.message : "An unknown error occurred", isSuccess: false })

        }
    };
    return { register, handleSubmit, formState: { errors }, postData, loading ,serviceStatus};
}


