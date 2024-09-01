"use client"
import  Alert  from '@/app/component/alert';
import { useSignin } from './action';


export default function Login() {
    const { register, handleSubmit, formState: { errors }, postData, loading, serviceStatus } = useSignin()
    async function onSubmit(data) {
        postData(data);
    };

    return <div className="w-full max-w-xs m-auto ">
        {serviceStatus && <Alert position='bottom' message={serviceStatus?.message}  alertType={serviceStatus.isSuccess ? "success":"error"}/>}
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4   align-middle " onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    نام کاربری
                </label>
                <input   {...register('email')} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="text" placeholder="email" />
                <p className='text-red-500'>{errors.email?.message}</p>
            </div>
            <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2"  >
                    کلمه عبور
                </label>
                <input   {...register('password')} className="shadow appearance-none border  rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************" />
                <p className='text-red-500'>{errors.password?.message}</p>
            </div>
            <div className="flex items-center justify-between">
                <button disabled={loading} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline  disabled:opacity-50 
    disabled:cursor-not-allowed" type="submit">
                    ورود
                </button>
                <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
                    کلمه عبور را فراموش کردم?
                </a>
            </div>
        </form>
    </div>
}

