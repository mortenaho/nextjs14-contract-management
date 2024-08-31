import * as yup from 'yup';
export const AddContractFromValidation = yup.object().shape({
    title: yup.string().required('title is required'),
    startDate: yup.string().required('start date is required'),
    endDate: yup.string().required('end date is required'),
    description: yup.string().nullable(),
    contractNumber: yup.string().required("pleas enter the contract number"),
    contractId: yup.number().nullable(),
    shamsiStartDate:yup.string().nullable(),
    shamsiEndDate:yup.string().nullable(),
});