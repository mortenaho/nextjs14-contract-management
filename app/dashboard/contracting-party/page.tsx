'use client';
import { PrimaryButton } from "@/app/component/custom-button";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

export default function ContractingParty() {
    return <div>
        <div className="">
          <PrimaryButton icon={faPlus} onClick={()=>{alert()}}>ثبت پیمانکار</PrimaryButton>
        </div>
    </div>
}