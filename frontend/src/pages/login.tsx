import LoginForm from '@/components/LoginForm'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/logo.png'
import React from 'react'
import Logo from '@/components/Logo'
import CommonMaster from '@/layouts/CommonMaster'
import BuyerRegistrationForm from '@/components/BuyerRegistrationForm'
import { Button } from 'flowbite-react'

export default function login() {
    return (<CommonMaster title='Sign In'>
        <section className=" dark:bg-gray-900 py-20">
            <div className="flex flex-col items-center px-6 mx-auto lg:py-0">
                {/* <Logo /> */}
                <div className="w-full bg-white rounded-lg dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-transparent dark:border-none">
                    <BuyerRegistrationForm />
                    <br />
                    <center>
                        <Link href="/seller/login" className="font-medium text-blue-600 dark:text-blue-500 hover:underline justify-center">Seller Login</Link>
                    </center>
                </div>
            </div>
        </section>
    </CommonMaster>
    )
}
