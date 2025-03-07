import { Button, Label, Modal, Spinner } from 'flowbite-react'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { HELActions } from '../../store'
import Link from 'next/link'
import OTPInput from './OTPInput'

export default function LoginForm() {
    const router = useRouter()
    const dispatch = useDispatch()

    const [openOTPModal, setOpenOTPModal] = useState(false)
    const [otp, setOtp] = useState('')
    const [loading, setLoading] = useState(false)


    const signInSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        setOpenOTPModal(true)
    }

    const onSubmitOTP = () => {
        setLoading(true)
        console.log(otp);
        // setOpenOTPModal(false)
        dispatch(HELActions.setUser("demo"))
        router.push("/")
    }

    return (<>
        <Modal show={openOTPModal} size="md" dismissible={false} onClose={() => { }}>
            <Modal.Header>Enter OTP sent to Email and Mobile</Modal.Header>
            <Modal.Body>
                <Label value='Email OTP' className='mb-4' />
                <OTPInput onComplete={e => setOtp(e)} />
                <br />
            </Modal.Body>
            <Modal.Footer>
                {loading ? <Spinner color="success" aria-label="Info spinner example" className='' /> : <Button onClick={onSubmitOTP} fullSized color='blue'>Submit</Button>}
            </Modal.Footer>
        </Modal>
        <form className="space-y-4 md:space-y-6" onSubmit={signInSubmit}>
            <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your Mobile no</label>
                <input type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="10 digit mobile no" required={true} />
            </div>
            {/* <div>
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required={true} />
            </div> */}
            <div className="flex items-center justify-between">
                <div className="flex items-start">
                    <div className="flex items-center h-5">
                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                    </div>
                    <div className="ml-3 text-sm">
                        <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                    </div>
                </div>
                {/* <a href="#" className="text-sm font-medium text-primary-600 hover:underline dark:text-slate-500">Forgot password?</a> */}
            </div>
            <Button type="submit" color='blue' className="w-full text-white hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Sign in</Button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Don&apos;t have an account yet? <Link href="/register" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Sign up</Link>
            </p>
        </form>

    </>
    )
}
