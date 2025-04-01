import LoginCard from '@/components/Admin/LoginCard'
import CommonMaster from '@/layouts/CommonMaster'
import React from 'react'

export default function login() {
    return (
        <CommonMaster title='Admin Login'>
            <div className='py-8 px-4'>
                <LoginCard />
            </div>
        </CommonMaster>
    )
}
