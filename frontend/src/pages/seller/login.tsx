import BuyerRegistrationForm from '@/components/BuyerRegistrationForm'
import SellerLoginForm from '@/components/SellerLoginForm'
import SellerRegistrationForm from '@/components/SellerRegistrationForm'
import CommonMaster from '@/layouts/CommonMaster'
import React from 'react'

export default function login() {
    return (<CommonMaster title='Seller Login'>

        <section className=" dark:bg-gray-900 py-20">
            <div className="flex flex-col items-center px-6 mx-auto lg:py-0">
                {/* <Logo /> */}
                <div className="w-full rounded-lg md:mt-0 sm:max-w-md xl:p-0">
                    <SellerLoginForm />
                </div>
            </div>
        </section>
    </CommonMaster>
    )
}
