import SellerRegistrationForm from '@/components/SellerRegistrationForm'
import CommonMaster from '@/layouts/CommonMaster'
import React from 'react'

export default function register() {
    return (
        <CommonMaster title='Seller Registration'>
            <SellerRegistrationForm />
        </CommonMaster>
    )
}
