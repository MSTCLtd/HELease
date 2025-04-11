import SellerRegistrationForm from '@/components/Seller/SellerRegistrationForm'
import CommonMaster from '@/layouts/CommonMaster'
import React from 'react'

export default function register() {
    return (
        <CommonMaster title='Seller Registration'>
            <br />
            <SellerRegistrationForm />
        </CommonMaster>
    )
}
