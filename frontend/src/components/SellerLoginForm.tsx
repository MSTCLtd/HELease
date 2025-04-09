import { Button, Card, TextInput } from 'flowbite-react'
import Link from 'next/link';
import React from 'react'

export default function SellerLoginForm() {
    const login = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const formData = new FormData(e.target as HTMLFormElement);
        console.log(formData.get('username'));

    }

    return (
        <div>
            <h1 className='text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white'>Login as Seller</h1>
            <br />
            <form onSubmit={login}>
                <label htmlFor="username" className='dark:text-slate-400'>Username</label>
                <TextInput name='username' id='username' autoFocus placeholder='Seller Username' />
                <br />
                <label htmlFor="password" className='dark:text-slate-400'>Password</label>
                <TextInput name='password' id='password' placeholder='Seller Password' />
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
