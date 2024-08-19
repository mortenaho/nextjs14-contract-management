"use server"
import { ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies';
import { cookies } from 'next/headers';
 

// Set a cookie
export async function setCookie(name: string, value: string,options={}) {
    cookies().set(name, value, options)
}
// Get a cookie
export async function getCookie<T>(name: string) {
    const value=cookies().get(name)?.value
     if(value==undefined)
        return undefined
    return JSON.parse(value) as T;
}
// Delete a cookie
export async function deleteCookie(name: string, options={}) {
    cookies().set(name, "", {expires:-1})
}