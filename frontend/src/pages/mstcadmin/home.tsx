import AdminMaster from '@/layouts/AdminMaster'
import { Card } from 'flowbite-react'
import Link from 'next/link'
import React, { useState } from 'react'

export default function home() {
    const [users, setUsers] = useState(123456)
    const [equip, setEquip] = useState(9876542)
    const [products, setProducts] = useState(456789)
    return (
        <AdminMaster title='Home'>
            <div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
                <Link href='/mstcadmin/users'>
                    <Card className='shadow-none transition-shadow hover:shadow-lg'>
                        <div className="flex flex-col items-center justify-center h-32">
                            <dt className="mb-2 text-3xl font-extrabold dark:text-slate-300">{users.toLocaleString()}</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Users</dd>
                        </div>
                    </Card>
                </Link>
                <Link href='/mstcadmin/equipment'>
                    <Card className='shadow-none transition-shadow hover:shadow-lg'>
                        <div className="flex flex-col items-center justify-center h-32">
                            <dt className="mb-2 text-3xl font-extrabold dark:text-slate-300">{equip.toLocaleString()}</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Equipments</dd>
                        </div>
                    </Card>
                </Link>
                <Link href='/mstcadmin/equipment'>
                    <Card className='shadow-none transition-shadow hover:shadow-lg'>
                        <div className="flex flex-col items-center justify-center h-32">
                            <dt className="mb-2 text-3xl font-extrabold dark:text-slate-300">{products.toLocaleString()}</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Products</dd>
                        </div>
                    </Card>
                </Link>
                <Link href='/mstcadmin/equipment'>
                    <Card className='shadow-none transition-shadow hover:shadow-lg'>
                        <div className="flex flex-col items-center justify-center h-32">
                            <dt className="mb-2 text-3xl font-extrabold dark:text-slate-300">{products.toLocaleString()}</dt>
                            <dd className="text-gray-500 dark:text-gray-400">Locations</dd>
                        </div>
                    </Card>
                </Link>
            </div>
        </AdminMaster>
    )
}
