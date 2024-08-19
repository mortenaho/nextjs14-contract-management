import * as Yup from 'yup';

const loginValidationSchema = Yup.object().shape({
  password: Yup.string().required('password is required').min(6),
  email: Yup.string().email('Invalid email format').required('Email is required'),
  // Add other fields here
});
export  default loginValidationSchema;