import { GeneralResponse } from '@/app/dtos/response/general-response';
import type { NextApiRequest, NextApiResponse } from 'next';
import { NextRequest, NextResponse } from 'next/server';
export async function POST(request:NextRequest) {

     const token: string = request.headers.get("Authorization")
      
    console.log(body)
    const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": token
    });
   
    try {
        const resp = await fetch("http://localhost:5251/Contract/AddContract", {
            method: "POST",
            headers: headers,
            body: JSON.stringify(request.body),
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


