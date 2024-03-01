import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import * as apiClient from "../api-client";
import { useAppContext } from "../contexts/AppContext";

export type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
};

const Register = () => {
  const { showToast } = useAppContext();
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>();

  const mutation = useMutation(apiClient.register, {
    onSuccess: () => {
      showToast({
        message: "Account created successfully",
        type: "SUCCESS",
      });
    },
    onError: (error: Error) => {
      showToast({
        message: error.message,
        type: "ERROR",
      });
    },
  });

  const onSubmit = handleSubmit((data) => {
    mutation.mutate(data);
  });
  return (
    <form action='' className='flex flex-col gap-5' onSubmit={onSubmit}>
      <h2 className='text-3xl font-bold'>Create an Account</h2>
      <div className='flex flex-col md:flex-row gap-5'>
        <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
          First Name
          <input
            className='border rounded w-full py-1 px-2 font-normal'
            {...register("firstName", { required: "this field is required" })}
          ></input>
          {errors.firstName && (
            <p className='text-red-500'>{errors.firstName.message}</p>
          )}
        </label>
        <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
          Last Name
          <input
            className='border rounded w-full py-1 px-2 font-normal '
            {...register("lastName", { required: "this field is required" })}
          ></input>
          {errors.lastName && (
            <p className='text-red-500'>{errors.lastName.message}</p>
          )}
        </label>
      </div>
      <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
        Email
        <input
          type='email'
          className='border rounded w-full py-1 px-2 font-normal '
          {...register("email", { required: "this field is required" })}
        ></input>
        {errors.email && <p className='text-red-500'>{errors.email.message}</p>}
      </label>
      <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
        Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal '
          {...register("password", {
            required: "this field is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
        ></input>
        {errors.password && (
          <p className='text-red-500'>{errors.password.message}</p>
        )}
      </label>
      <label htmlFor='' className='text-gray-700 text-sm font-bold flex-1'>
        Confirm Password
        <input
          type='password'
          className='border rounded w-full py-1 px-2 font-normal '
          {...register("confirmPassword", {
            validate: (value) => {
              if (!value) {
                return "this field is required";
              } else if (watch("password") !== value) {
                return "Your password not match";
              }
            },
          })}
        ></input>
        {errors.confirmPassword && (
          <p className='text-red-500'>{errors.confirmPassword.message}</p>
        )}
      </label>
      <span>
        <button
          type='submit'
          className='bg-red-400 text-white font-bold p-2 hover:bg-red-500 text-xl'
        >
          Create Account
        </button>
      </span>
    </form>
  );
};

export default Register;
