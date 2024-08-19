"use client"
import { deleteCookie } from "@/app/_lib/coocki";
import { LoginCookiName } from "@/app/_lib/general-var";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
export default async function logout() {
   const router = useRouter()
   useEffect(function () {
      deleteCookie(LoginCookiName)
      router.push("/login")
   }, [])

   return "logout"
}