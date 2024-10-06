import {FC} from 'react'
import {useForm, SubmitHandler} from 'react-hook-form'
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from 'yup'
import {toast, ToastContainer} from "react-toastify"
import styles from './Register.module.scss'
import useModalMenu from "../../hooks/useModalMenu.ts";
import Modal from "../../modals/Modal.tsx";
import modalStyles from "../../modals/Modal.module.scss";
import Logins from "../../components/Navbar/Logins/Logins.tsx";

const registerSchema = yup.object({
  username: yup.string().required('Username is required').min(3, 'Username must be at least 3 characters'),
  email: yup.string().required('Email is required').email('Email must be a valid email address'),
  password: yup.string().required('Password is required').min(6, 'Password must be at least 6 characters'),
  confirmPassword: yup.string()
    .required('Confirm Password is required')
    .oneOf([yup.ref('password')], 'Passwords must match'),
}).required()

interface FormValues {
  username: string
  email: string
  password: string
  confirmPassword: string
}

const RegisterForm: FC = () => {

  const {isMenuOpen, isMobile, openMenu, closeMenu} = useModalMenu()

  const {register, handleSubmit, formState: {errors}, reset} = useForm<FormValues>({
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
      })

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      console.log('Deal submitted successfully:', await response.json())
      toast.success('Вы успешно зарегистрированы!')
      reset()

    } catch (error) {
      console.error('Error submitting deal:', error);
    }
  }

  const handleBurgerClick = () => {
    if (!isMenuOpen) {
      openMenu();
    } else {
      closeMenu();
    }
  }

  return (
    <>
      <h1 className={styles.register__title}>REGISTER</h1>

      {isMobile && (
        <button onClick={handleBurgerClick} className={styles.burger}>
          <span className={styles.burger__line}></span>
          <span className={styles.burger__line}></span>
          <span className={styles.burger__line}></span>
        </button>
      )}

      {isMenuOpen && (
        <Modal onClose={closeMenu} className={modalStyles.modal__overlay_cat}>
          <Logins/>
          <div className={styles.height}></div>
        </Modal>
      )}


      <form onSubmit={handleSubmit(onSubmit)} className={styles.register__form}>

        <div className={styles.register__items}>
          <label className={styles.register__label} htmlFor="username">Name:</label>
          <input className={styles.register__input} id="username" {...register('username')} autoComplete="username" placeholder="Enter your name"/>
          {errors.username && <p className={styles.register__error}>{errors.username.message}</p>}
        </div>

        <div className={styles.register__items}>
          <label className={styles.register__label} htmlFor="email">Email:</label>
          <input className={styles.register__input} id="email" type="email" {...register('email')} placeholder="Enter your email"
                 autoComplete="email"/>
          {errors.email && <p className={styles.register__error}>{errors.email.message}</p>}
        </div>

        <div className={styles.register__items}>
          <label className={styles.register__label} htmlFor="password">Password:</label>
          <input className={styles.register__input} id="password" type="password" {...register('password')}
                 autoComplete="new-password" placeholder="Enter your password"/>
          {errors.password && <p className={styles.register__error}>{errors.password.message}</p>}
        </div>

        <div className={styles.register__items}>
          <label className={styles.register__label} htmlFor="confirmPassword">Confirm password:</label>
          <input className={styles.register__input} id="confirmPassword"
                 type="password" {...register('confirmPassword')} autoComplete="new-password" placeholder="Enter your confirm password"/>
          {errors.confirmPassword && <p className={styles.register__error}>{errors.confirmPassword.message}</p>}
        </div>

        <div className={styles.register__actions}>
          <button className={styles.register__btn} type="submit">Register</button>
        </div>

        <ToastContainer/>
      </form>
    </>
  )
}

export default RegisterForm
