import { LoginCookiName } from '@/app/_lib/general-var';
import { GeneralResponse } from '@/app/dtos/response/general-response';
import { Token } from '@/app/dtos/response/token';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request:NextRequest) {

    const token: Token = JSON.parse(request.cookies.get(LoginCookiName)?.value) as Token;
     
    const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization":`${token.tokenType} ${token.accessToken}`
    });
   
    try {
        const resp = await fetch("http://localhost:5251/api/v1/Contract/update", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(await request.json()),
        })
        // Handle the response if needed
        if (resp.ok) {
            const res: GeneralResponse = await resp.json() as GeneralResponse
            return NextResponse.json(res, { status: 200 })
        } else {
            return NextResponse.json({ responseCode: resp.status, responseMessage: resp.statusText,errors:await resp.json() }, { status: resp.status })
        }

    } catch (error) {
        return NextResponse.json({ responseCode: 105, responseMessage: error instanceof Error ? error.message : "An unknown error occurred" }, {
            status: 500
        })
    }
}


