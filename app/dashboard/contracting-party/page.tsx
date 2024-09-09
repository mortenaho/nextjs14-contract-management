'use client';
import { ConfirmBox } from "@/app/component/confirm-box";
import { DeleteButton, EditButton, PrimaryButton } from "@/app/component/custom-button";
import { Loading } from "@/app/component/loading";
import Modal from "@/app/component/modal";
import { BasicTable } from "@/app/component/table";
import { ContractingParty } from "@/app/dtos/request/contracting-party";
import { useContracingPartyService } from "@/app/services/contracting-party-service";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import AddContractingPartyForm from "./add-form";

export default function ContractingParty() {
    const contractingPartyService = useContracingPartyService()
    const [contracting, setContracting] = useState<Array<ContractingParty> | null>(null)
    const contracingParty = useContracingPartyService()
    const [isOpenConfirmBox, setIsOpenConfirmBox] = useState(false)
    const [contractingId, setContractingId] = useState(0)
    const [isShowModal, setisShowModal] = useState(false)
    const [isCloseModal, setIsCloseModal] = useState(true)
    useEffect(() => {
        async function fetchData() {
            try {
                var data = contracingParty.GetAll();
                setContracting((await data).responseBody);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        }

        fetchData();
    }, []);

    const deleted = async () => {

        setIsOpenConfirmBox(false)
        await contracingParty.Deleted(contractingId);

    }
    const closeModal = () => {
        setIsCloseModal(true)
        setisShowModal(false)
    }
    return <div>
        <div className="">
            <PrimaryButton icon={faPlus} onClick={() => { setisShowModal(true) }}>ثبت پیمانکار</PrimaryButton>
            {contracingParty.loading && <Loading />}
            {!contracingParty.loading &&
                <table className="mt-3">
                    <thead>
                        <tr>
                            <th>نام پیمانکار</th>
                            <th>حقیقی/حقوقی</th>
                            <th>شناسه ملی</th>
                            <th></th>
                        </tr>

                    </thead>
                    <tbody>
                        {contracting && contracting.map((item) => {
                            return <tr>
                                <td>{item.contractingPartyName}</td>
                                <td>{item.isLegal ? "حقوقی" : "حقیقی"}</td>
                                <td>{item.nationalCode}</td>
                                <td>
                                    <span><DeleteButton onTouch={() => { setIsOpenConfirmBox(true); setContractingId(item.contractingPartyId) }} /></span>
                                    <span className="mr-3"><EditButton onTouch={() => { }} /></span>


                                </td>
                            </tr>
                        })}

                    </tbody>
                </table>}
        </div>
        <Modal isOpen={isShowModal} closeModal={closeModal} content={<AddContractingPartyForm/>} title={"ثبت پیمانکار جدید"} size="md" />
        <ConfirmBox isOpen={isOpenConfirmBox} onCancel={() => { setIsOpenConfirmBox(false) }} onConfirm={() => { deleted() }} message={"آیا از حذف پیمان کار مطمئن هستید"} title={"هشدار"}></ConfirmBox>
    </div>


}