import { useNavigate } from 'react-router';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';

import { HiLockClosed } from 'react-icons/hi'
import { ErrorMessage } from '@hookform/error-message';

import { loginUser } from '../api/Users';
import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../store/Auth';

import tw from 'twin.macro';

const Input = tw.input`
  appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm
`;


function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    // useForm 사용을 위한 선언
    const { register, setValue, formState: { errors }, handleSubmit } = useForm();

    // submit 이후 동작할 코드
    // 백으로 유저 정보 전달
    const onValid = async ({ userid, password }) => {
        const response = await loginUser({ userid, password });

        if (response.status) {
            // 쿠키에 Refresh Token, store에 Access Token 저장
            setRefreshToken(response.json.refresh_token);
            dispatch(SET_TOKEN(response.json.access_token));

            return navigate("/");
        } else {
            console.log(response.json);
        }
        // input 태그 값 비워주는 코드
        setValue("password", "");
    };

    return (
        <>
            <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full space-y-8">
                    <div>
                        <img
                            className="mx-auto h-12 w-auto"
                            src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg"
                            alt="Workflow"
                        />
                        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                    </div>
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit(onValid)}>
                        <input type="hidden" name="remember" defaultValue="true" />
                        <div className="rounded-md shadow-sm -space-y-px">
                            <div>
                                <label htmlFor="UserID" className="sr-only">
                                    User ID
                                </label>
                                <Input
                                    {...register("userid", {required: "Please Enter Your ID"})}
                                    type="text"
                                    placeholder="User ID"
                                />
                                <ErrorMessage
                                    name="userid"
                                    errors={errors}
                                    render={( { message }) =>
                                        <p className="text-sm font-medium text-rose-500">
                                            { message }
                                        </p>
                                }
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <Input
                                    {...register("password", {required: "Please Enter Your Password"})}
                                    type="text"
                                    placeholder="Password"
                                />
                                <ErrorMessage
                                    name="userid"
                                    errors={errors}
                                    render={( { message }) =>
                                        <p className="text-sm font-medium text-rose-500">
                                            { message }
                                        </p>
                                    }
                                />
                            </div>
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                            <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                              <HiLockClosed className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                            </span>
                                Sign in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    );
}

export default Login;