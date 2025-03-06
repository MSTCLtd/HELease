import LoginForm from '@/components/LoginForm'
import Image from 'next/image'
import Link from 'next/link'
import logo from '../../assets/logo.png'
import React from 'react'
import Logo from '@/components/Logo'
import CommonMaster from '@/layouts/CommonMaster'

export default function login() {
    return (<CommonMaster>
        <section className=" dark:bg-gray-900 py-20">
            <div className="flex flex-col items-center px-6 mx-auto lg:py-0">
                {/* <Logo /> */}
                <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                            Sign in to your account
                        </h1>
                        <LoginForm />
                    </div>
                </div>
            </div>
        </section>
    </CommonMaster>
    )
}
