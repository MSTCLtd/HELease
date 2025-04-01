import { Button, Card, Label, Modal, TextInput } from 'flowbite-react'
import React, { useState } from 'react'
import img_adminLogin from '../../../assets/admin_login.jpg'
import service from '../../../service'
import OTPInput from '../OTPInput'
import { useTranslation } from '../../../hooks/useTranslation'
import { useDispatch } from 'react-redux'
import { HELActions } from '../../../store'
import { useRouter } from 'next/router'

export default function LoginCard() {
    const [otpModal, setOtpModal] = useState(false)
    const [token, setToken] = useState(null)
    const [userid, setuserid] = useState(null)
    const [passwordProblem, setPasswordProblem] = useState(null)
    const [loading, setLoading] = useState(false)

    const { t } = useTranslation()
    const dispatch = useDispatch()
    const router = useRouter()

    const adminLogin = (e: React.FormEvent) => {
        e.preventDefault()
        setPasswordProblem(null)
        setLoading(true)
        service.post("/auth/login/username", {
            username: (e.target as HTMLFormElement).username.value,
            password: (e.target as HTMLFormElement).password.value
        }).then(response => {
            setToken(response.data.tempToken)
            setuserid(response.data.userId)
            setOtpModal(true)
        }).catch(err => {
            setPasswordProblem(err.response.data.message)
        }).finally(() => {
            setLoading(false)
        })
    }

    const onOTPProvided = (e: string) => {
        service.post("/auth/verify-login-otp", {
            userId: userid,
            otp: e
        }).then(response => {
            dispatch(HELActions.setAdminUser(response.data.token))
            setOtpModal(false)
            router.push("/mstcadmin/home")
        })
    }

    return (
        <>
            <Modal show={otpModal} size="md" dismissible={false} onClose={() => { }}>
                <Modal.Header>Enter OTP sent to Email and Mobile</Modal.Header>
                <Modal.Body>
                    <Label value='OTP' className='mb-4' />
                    <OTPInput onComplete={onOTPProvided} />
                </Modal.Body>
                <Modal.Footer>
                    <Button onClick={() => setOtpModal(false)} fullSized color='primary'>{t('root.proceed')}</Button>
                </Modal.Footer>
            </Modal>
            <Card className="mx-auto my-7 md:max-w-fit" imgSrc={img_adminLogin.src} horizontal>
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white w-full">
                    MSTC Admin Login
                </h5>
                <form className="flex flex-col gap-4 w-full" onSubmit={adminLogin}>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="email1">Username</Label>
                        </div>
                        <TextInput id="email1" color={passwordProblem ? 'failure' : undefined} name='username' placeholder="Your username" required />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <Label htmlFor="password1">Password</Label>
                        </div>
                        <TextInput id="password1" helperText={passwordProblem} color={passwordProblem ? 'failure' : undefined} type="password" name='password' required placeholder='Your Password' />
                    </div>
                    <Button type="submit" color='primary' isProcessing={loading} className='mt-2'>Submit</Button>
                </form>
            </Card>
        </>
    )
}
