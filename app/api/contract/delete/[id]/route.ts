import { LoginCookiName } from '@/app/_lib/general-var';
import { ContractModel } from '@/app/dtos/response/contract';
import { GeneralResponse, GeneralResponseGeneric } from '@/app/dtos/response/general-response';
import { Token } from '@/app/dtos/response/token';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
import { queryObjects } from 'v8';
export async function GET(request: NextRequest) {
    // const { id } = request;
    const token: Token = JSON.parse(request.cookies.get(LoginCookiName)?.value) as Token;

    const url = new URL(request.url);
    const id = url.pathname.split('/').pop(); // استخراج id از مسیر
     
    const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization":`${token.tokenType} ${token.accessToken}`
    });
    
    try {
        const resp = await fetch("http://localhost:5251/api/v1/Contract/delete/"+id, {
            method: "delete",
            headers: headers
        })
        // Handle the response if needed
        if (resp.ok) {
            const res: GeneralResponse = await resp.json() as GeneralResponse
            return NextResponse.json(res, { status: 200 })
        } else {
            return NextResponse.json({ responseCode: 105, responseMessage: resp.statusText }, { status: resp.status })
        }

    } catch (error) {
        return NextResponse.json({ responseCode: 105, responseMessage: error instanceof Error ? error.message : "An unknown error occurred" }, {
            status: 500
        })
    }
}


