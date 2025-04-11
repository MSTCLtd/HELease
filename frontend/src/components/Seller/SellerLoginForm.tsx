import { Button, Card, Label, TextInput } from 'flowbite-react'
import Link from 'next/link';
import React from 'react'
import ChangingText from '../ChangingText';
import service from '../../../service';
import { useDispatch } from 'react-redux';
import { HELActions } from '../../../store';
import { useRouter } from 'next/router';

export default function SellerLoginForm() {
    const dispatch = useDispatch()
    const router = useRouter()

    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        console.log(formData.get('username'));
        service.post("/auth/login/username", {
            username: formData.get('username'),
            password: formData.get('password')
        }).then(response => {
            dispatch(HELActions.setSeller({
                token: response.data.token,
                name: response.data.name,
                email: response.data.email,
                registrationNumber: response.data.registrationNumber
            }))
            router.push("/seller/home")
        })
    }

    return (
        <div>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center'>Login as <ChangingText list={['Brand', 'Manufacturer', 'Supplier']} /></h1>
            <br />
            <form onSubmit={login}>
                <Label htmlFor="username" className='dark:text-slate-400'>Username</Label>
                <TextInput name='username'  id='username' autoFocus placeholder='Seller Username' />
                <br />
                <Label htmlFor="password" className='dark:text-slate-400'>Password</Label>
                <TextInput name='password' type='password' id='password' placeholder='Seller Password' />
                <br />
                <Button fullSized color='primary' type='submit'>Sign In</Button>
            </form>
            <br />
            <div className='flex justify-between'>
                <Link href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Forgot password?</Link>
                <Link href="/seller/register" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Create an account</Link>
            </div>
        </div>
    )
}
