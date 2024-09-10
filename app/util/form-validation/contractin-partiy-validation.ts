import * as yup from 'yup';
export const ContractingPartyFromValidation = yup.object().shape({
    contractingPartyId: yup.number().nullable(),
    contractingPartyName: yup.string().required('پیمانکار الزامی میباشد'),
    isLegal: yup.string().required('نوع پیمانکار الزامی میباشد'),
    nationalCode: yup.string().required("شناسه ملی یاکد ملی الزامی میباشد"),
});