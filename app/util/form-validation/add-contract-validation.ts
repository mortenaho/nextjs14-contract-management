import * as yup from 'yup';
export const AddContractFromValidation = yup.object().shape({
    title: yup.string().required('عنوان قرارداد را وارد کنید'),
    startDate: yup.string().required('تاریخ شروع قرارداد الزامی میباشد'),
    endDate: yup.string().required('تاریخ پایان قرار داد الزامی میباشد'),
    description: yup.string().nullable(),
    contractNumber: yup.string().required("شماره قرار داد اجباری میباشد"),
    contractId: yup.number().nullable(),
    shamsiStartDate: yup.string().nullable(),
    shamsiEndDate: yup.string().nullable(),
    contractingPartyId: yup.string().required("لطفا پیمانکار را انتخاب کنید"),
});