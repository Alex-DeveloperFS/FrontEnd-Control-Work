import { FC } from 'react'
import { useForm, SubmitHandler } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {toast, ToastContainer} from "react-toastify";
import styles from '../components/form/Form.module.scss'

const registerSchema = yup.object({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Email must be a valid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .oneOf([yup.ref('password'), null], 'Passwords must match')
    .required('Confirm Password is required'),
}).required()

interface FormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterForm: FC = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormValues>({
    resolver: yupResolver(registerSchema),
  })

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const returnedDeal = {
      usersData: data,
      createdAt: new Date().toISOString(),
    }
    try {
      const response = await fetch('https://66d6c219006bfbe2e64e791a.mockapi.io/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnedDeal),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Deal submitted successfully:', await response.json());
      toast.success('Вы успешно зарегистрированы!')
      reset();

    } catch (error) {
      console.error('Error submitting deal:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="register-form">

      <h2>Register</h2>

      <div>
        <label htmlFor="username">Username</label>
        <input id="username" {...register('username')} autoComplete="username" />
        {errors.username && <p>{errors.username.message}</p>}
      </div>

      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" {...register('email')} autoComplete="email" />
        {errors.email && <p>{errors.email.message}</p>}
      </div>

      <div>
        <label htmlFor="password">Password</label>
        <input id="password" type="password" {...register('password')} autoComplete="new-password" />
        {errors.password && <p>{errors.password.message}</p>}
      </div>

      <div>
        <label htmlFor="confirmPassword">Confirm Password</label>
        <input id="confirmPassword" type="password" {...register('confirmPassword')} autoComplete="new-password" />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}
      </div>

      <button type="submit">Register</button>
    <ToastContainer/>
    </form>
  )
}

export default RegisterForm;
