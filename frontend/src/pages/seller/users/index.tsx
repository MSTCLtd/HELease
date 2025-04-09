import SellerMaster from '@/layouts/SellerMaster'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect } from 'react'
import { HiUserAdd } from 'react-icons/hi'
import { DataTable } from "simple-datatables"
import "simple-datatables/dist/style.css"


export default function index() {
    useEffect(() => {
        const dataTable = new DataTable("#search-table", {
            searchable: true,
            fixedHeight: true,
            classes:{
            
            },
        });

    }, [])

    return (
        <SellerMaster title='Users'>
            <Button href='/seller/users/add' className='mb-4 w-fit float-right' as={Link} color='primary'><HiUserAdd className='mr-2' size={20} /> Add User</Button>
            <table id="search-table">
                <thead>
                    <tr>
                        <th>
                            <span className="flex items-center">
                                Company Name
                            </span>
                        </th>
                        <th>
                            <span className="flex items-center">
                                Ticker
                            </span>
                        </th>
                        <th>
                            <span className="flex items-center">
                                Stock Price
                            </span>
                        </th>
                        <th>
                            <span className="flex items-center">
                                Market Capitalization
                            </span>
                        </th>
                    </tr>
                </thead>
                <tbody className="font-medium text-gray-900 whitespace-nowrap dark:text-white">
                    <tr>
                        <td>Apple Inc.</td>
                        <td>AAPL</td>
                        <td>$192.58</td>
                        <td>$3.04T</td>
                    </tr>
                </tbody>
            </table>
        </SellerMaster>
    )
}
