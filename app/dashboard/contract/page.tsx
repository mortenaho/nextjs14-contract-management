"use client"

import { getCookie } from "@/app/_lib/coocki"
import { LoginCookiName } from "@/app/_lib/general-var"
import { ContractModel } from "@/app/dtos/response/contract"
import { GeneralResponseGeneric } from "@/app/dtos/response/general-response"
import { Token } from "@/app/dtos/response/token"
import { execSync } from "child_process"
import { List } from "postcss/lib/list"
import { useEffect, useState } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTimes, faTrash } from '@fortawesome/free-solid-svg-icons';
import { EditButton, DeleteButton } from "@/component/custom-button"
export default function Contracts() {

    const [token, setToken] = useState<Token | null>(null)
    const [contracts, setContracts] = useState<Array<ContractModel> | null>(null)
    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchTokenAndContracts = async () => {
            setLoading(true);
            const token = await getCookie<Token>(LoginCookiName);
            setToken(token);

            if (token) {
                getContract(token);
            }
            setLoading(false);
        };

        fetchTokenAndContracts();
    }, []);


    const getContract = async (token: Token) => {
        setLoading(true);
        const headers = new Headers({
            "Content-Type": "application/json",
            "Authorization": `${token?.tokenType} ${token?.accessToken}`,
        });

        try {
            const response = await fetch("http://localhost:5251/Contract/Get", {
                method: "GET",
                headers: headers,
            })
            // Handle the response if needed
            if (response.ok) {

                const res: GeneralResponseGeneric<Array<ContractModel>> = await response.json() as GeneralResponseGeneric<Array<ContractModel>>
                setContracts(res.responseBody);

            } else {
                alert(response.statusText)
            }

        } catch (error) {
            console.log(error)
            alert(error instanceof Error ? error.message : "An unknown error occurred")
        }
        setLoading(false);
    }

    if (loading) {
        return <div>Loading...</div>; // Display a loading indicator
    }

    function onDelete(id) {
        alert(id)
    }
    return <div>

        <table className="min-w-full border-collapse block md:table">
            <thead className="block md:table-header-group">
                <tr className="border border-gray-200 block md:table-row">
                    <th className="bg-gray-100 p-2 text-gray-700 text-left block md:table-cell">title</th>
                    <th className="bg-gray-100 p-2 text-gray-700 text-left block md:table-cell">start date</th>
                    <th className="bg-gray-100 p-2 text-gray-700 text-left block md:table-cell">end date</th>
                    <th className="bg-gray-100 p-2 text-gray-700 text-left block md:table-cell"> </th>
                </tr>
            </thead>
            <tbody className="block md:table-row-group">
                {contracts && contracts.map(p => {
                    return <tr id={"tr_"+p.contractId} className="bg-white border border-gray-200 block md:table-row">
                        <td className="p-2 text-gray-700 block md:table-cell">{p.title}</td>
                        <td className="p-2 text-gray-700 block md:table-cell">{p.startDate}</td>
                        <td className="p-2 text-gray-700 block md:table-cell">{p.endDate}</td>
                        <td className="p-2 text-gray-700 block md:table-cell">
                            <DeleteButton onTouch={() => { onDelete("delete :"+p.contractId) }} />
                            <EditButton onTouch={() => { onDelete("edit :"+p.contractId) }} />
                        </td>
                    </tr>
                })}


            </tbody>
        </table>


    </div>

}