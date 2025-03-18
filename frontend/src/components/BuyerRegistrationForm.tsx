import { Button, Label, Modal, TextInput } from 'flowbite-react'
import { HiAdjustments, HiClipboardList, HiMail, HiPhone, HiUserCircle } from "react-icons/hi";
import React, { useState } from 'react'
import Link from 'next/link';
import OTPInput from './OTPInput';
import service from '../../service';
import { useRouter } from 'next/router';
import { useDispatch } from 'react-redux';
import { HELActions } from '../../store';
import { useTranslation } from '../../hooks/useTranslation';

export default function BuyerRegistrationForm() {
    const [openOTPModal, setOpenOTPModal] = useState(false)
    const [openEmailOTPModal, setOpenEmailOTPModal] = useState(false)
    const [detailsModal, setDetailsModal] = useState(false)
    const [userTypeModal, setUserTypeModal] = useState(false)
    const [user, setuser] = useState(null)
    const [mobile, setMobile] = useState('')
    const [email, setEmail] = useState('')
    const [name, setName] = useState('')

    const router = useRouter()
    const dispatch = useDispatch()
    const { t } = useTranslation()

    const onSigninPressed = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement;
        if (!target.mobile.value) {
            alert("Please enter mobile no")
            return
        }
        setMobile(target.mobile.value)

        service.post("/auth/register/send-mobile-otp", {
            phone: target.mobile.value,
        }).then(response => {
            console.log(response.data);
        }).catch(err => {
            console.log(err.response);
        })
        setOpenOTPModal(true)
    }

    const onMobileOTPProvided = (e: string) => {
        if (e.length < 6) {
            alert("Please enter OTP")
            return
        }
        service.post("auth/register/verify-otp", {
            phone: mobile,
            otpCode: e
        }).then(response => {
            if (response.data.isNewUser)
                setDetailsModal(true)
            else {
                dispatch(HELActions.setUser({ token: response.data.token, name: response.data.name, email: response.data.email }))
                router.push("/")
            }
            setOpenOTPModal(false)
        })
    }

    const onEmailNameProvided = () => {
        service.post("/auth/register/send-email-otp", {
            email,
        }).then(response => {
            setDetailsModal(false)
            setOpenEmailOTPModal(true)
        }).catch(err => {
            console.log(err.response);
        })
    }

    const onEmailOTPProvided = (e: string) => {
        service.post("auth/register/verify-email-otp", {
            phone: mobile,
            otpCode: e,
            email
        }).then(response => {
            setOpenEmailOTPModal(false)
            setUserTypeModal(true)
        })
    }

    const chooseUserType = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const target = e.target as HTMLFormElement;

        service.post("auth/register", {
            phone: mobile,
            email,
            name,
            role: target.userRole.value
        }).then(response => {
            setOpenEmailOTPModal(false)
            console.log(response.data);
            dispatch(HELActions.setUser({ token: "" }))
            router.push("/")
        })
    }

    return (<>
        <Modal show={openEmailOTPModal} size="md" dismissible={false} onClose={() => { }}>
            <Modal.Header>{t('login.otpemail')}</Modal.Header>
            <Modal.Body>
                <Label value='Email OTP' className='mb-4' />
                <OTPInput onComplete={onEmailOTPProvided} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setOpenOTPModal(false)} fullSized color='primary'>{t('root.next')}</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={detailsModal} size="md" dismissible={false} onClose={() => { }}>
            <Modal.Header>{t('login.details')}</Modal.Header>
            <Modal.Body>
                <Label value='Full Name' htmlFor='fullname' className='mb-4' />
                <TextInput name='fullname' onChange={e => setName((e.target as HTMLInputElement).value)} />
                <br />
                <Label value='Email' htmlFor='email' className='mb-4' />
                <TextInput name='email' inputMode='email' onChange={e => setEmail((e.target as HTMLInputElement).value)} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={onEmailNameProvided} fullSized color='primary'>{t('root.next')}</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={openOTPModal} size="md" dismissible={false} onClose={() => { }}>
            <Modal.Header>{t('login.otpmobile')}</Modal.Header>
            <Modal.Body>
                <Label value={t('login.mobileotp')} className='mb-4' />
                <OTPInput onComplete={onMobileOTPProvided} />
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={() => setOpenOTPModal(false)} fullSized color='primary' disabled={!detailsModal}>{t('root.next')}</Button>
            </Modal.Footer>
        </Modal>

        <Modal show={userTypeModal} size="md" dismissible={false} onClose={() => { }}>
            <Modal.Header>{t('login.regas')}</Modal.Header>
            <form onSubmit={chooseUserType}>
                <Modal.Body>
                    <ul className="grid w-full gap-6">
                        <li>
                            <input type="radio" id="hosting-small" name="userRole" value="User" className="hidden peer" required />
                            <label htmlFor="hosting-small" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg font-bold">{t('root.buyer')}</div>
                                    <div className="w-full">{t('login.buyertag')}</div>
                                </div>
                                <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </label>
                        </li>
                        <li>
                            <input type="radio" id="hosting-big" name="userRole" value="Seller" className="hidden peer" />
                            <label htmlFor="hosting-big" className="inline-flex items-center justify-between w-full p-5 text-gray-500 bg-white border border-gray-200 rounded-lg cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 dark:peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <div className="block">
                                    <div className="w-full text-lg font-bold">{t('root.seller')}</div>
                                    <div className="w-full">{t('login.sellertag')}</div>
                                </div>
                                <svg className="w-5 h-5 ms-3 rtl:rotate-180" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg>
                            </label>
                        </li>
                    </ul>
                </Modal.Body>
                <Modal.Footer>
                    <Button type='submit' fullSized color='primary'>{t('root.next')}</Button>
                </Modal.Footer>
            </form>
        </Modal>

        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">{t('login.maintitle')}</h1>
                <form className="space-y-4 md:space-y-6" onSubmit={onSigninPressed}>
                    {/* <div>
                        <Label htmlFor='email' value='Your email' className='mb-2' />
                        <TextInput icon={HiMail} placeholder='test@example.com' id='email' name='email' />
                    </div> */}
                    <div>
                        <Label htmlFor='mobile' value={t('login.mobile')} />
                        <TextInput icon={HiPhone} placeholder={t('login.10digit')} name='mobile' id='mobile' maxLength={10} required />
                    </div>
                    {/* <div>
                        <Label htmlFor='name' value='Full Name' />
                        <TextInput icon={HiUserCircle} placeholder='Your full name' name='name' id='name' />
                    </div> */}
                    {/* <div className="flex items-start">
                                            <div className="flex items-center h-5">
                                                <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" />
                                            </div>
                                            <div className="ml-3 text-sm">
                                                <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">I accept the <a className="font-medium text-primary-600 hover:underline dark:text-primary-500" href="#">Terms and Conditions</a></label>
                                            </div>
                                        </div> */}
                    {/* <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Create an account</button> */}
                    <Button fullSized color='primary' type='submit'>{t('root.proceed')}</Button>
                    {/* <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Already have an account? <Link href="/login" className="font-medium text-primary-600 hover:underline dark:text-primary-500">Login here</Link>
                    </p> */}
                </form>
            </div>
        </div>
    </>
    )
}
