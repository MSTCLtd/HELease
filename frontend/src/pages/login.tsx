import LoginForm from '@/components/LoginForm'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/logo.png'
import React from 'react'
import Logo from '@/components/Logo'
import CommonMaster from '@/layouts/CommonMaster'
import BuyerRegistrationForm from '@/components/BuyerRegistrationForm'

export default function login() {
    return (<CommonMaster title='Sign In'>
        <section className=" dark:bg-gray-900 py-20">
            <div className="flex flex-col items-center px-6 mx-auto lg:py-0">
                {/* <Logo /> */}
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <BuyerRegistrationForm />
                </div>
            </div>
        </section>
    </CommonMaster>
    )
}
