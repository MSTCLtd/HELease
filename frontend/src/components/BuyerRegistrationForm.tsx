import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { HiAdjustments, HiClipboardList, HiMail, HiPhone, HiUserCircle } from "react-icons/hi";
import React, { useState } from 'react'
import Link from 'next/link';
import OTPInput from './OTPInput';
import service from '../../service';

export default function BuyerRegistrationForm() {
    const [openOTPModal, setOpenOTPModal] = useState(false)

    const onSigninPressed = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(service);

        service.post("/api/Auth/register/send-otp", {
            identifier: 'email',
            otpType: 'email'
        }).then(response => {
            console.log(response.data);

        }).catch(err => {
            console.log(err.response);

        })
        setOpenOTPModal(true)
    }

    return (<>
        <Modal show={openOTPModal} size="md" dismissible={false} onClose={() => { }}>
            <Modal.Header>Enter OTP sent to Email and Mobile</Modal.Header>
            <Modal.Body>
                <Label value='Email OTP' className='mb-4' />
                <OTPInput onComplete={() => { }} />
                <br />
                <Label value='Mobile OTP' className='mb-4' />
                <OTPInput onComplete={() => { }} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setOpenOTPModal(false)} fullSized color='blue'>Submit</Button>
            </Modal.Footer>
        </Modal>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">Create a Buyer account</h1>
                <form className="space-y-4 md:space-y-6" onSubmit={onSigninPressed}>
                    <div>
                        <Label htmlFor='email' value='Your email' className='mb-2' />
                        <TextInput icon={HiMail} placeholder='test@example.com' id='email' name='email' />
                    </div>
                    <div>
                        <Label htmlFor='mobile' value='Mobile' />
                        <TextInput icon={HiPhone} placeholder='10 digit mobile no' name='mobile' id='mobile' maxLength={10} />
                    </div>
                    <div>
                        <Label htmlFor='name' value='Full Name' />
                        <TextInput icon={HiUserCircle} placeholder='Your full name' name='name' id='name' />
                    </div>
                    {/* <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                            </div>
                                        </div> */}
                    {/* <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button> */}
                    <Button fullSized color='blue' type='submit'>Register</Button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                    </p>
                </form>
            </div>
        </div>
    </>
    )
}
