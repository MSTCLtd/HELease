import SellerMaster from '@/layouts/SellerMaster'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'

export default function index() {
    return (
        <SellerMaster title='Products'>
            <Button color='primary' className='mb-4 w-fit' href='/seller/products/add' as={Link} passHref>Add Product</Button>
        </SellerMaster>
    )
}
