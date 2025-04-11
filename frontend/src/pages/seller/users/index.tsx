import SellerMaster from '@/layouts/SellerMaster'
import { Button } from 'flowbite-react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { HiUserAdd } from 'react-icons/hi'
import { DataTable } from "simple-datatables"
import "simple-datatables/dist/style.css"
import service from '../../../../service'
import { User } from '@/types/User'
import { Column, DataGrid, SortColumn } from 'react-data-grid'

const columns: readonly Column<User>[] = [
    { key: 'name', name: 'Name' },
    { key: 'email', name: 'Email' },
    { key: 'registrationNumber', name: 'Registration Number' },
];


export default function index() {
    const [users, setUsers] = useState<User[]>([])
    const [sortColumns, setSortColumns] = useState<readonly SortColumn[]>([{ columnKey: 'name', direction: 'ASC' }]);

    const fetchUsers = () => {
        service.get("/mstc-admin/mstc-users").then(response => {
            setUsers(response.data.mstcUsers)
        })
    }

    useEffect(() => {
        fetchUsers()

        // const dataTable = new DataTable("#search-table", {
        //     searchable: true,
        //     fixedHeight: true,
        // });
        // dataTable.insert({ data: users.map(user => [user.name, user.email, user.registrationNumber]) })
    }, [])

    return (
        <SellerMaster title='Users'>
            <Button href='/seller/users/add' className='mb-4 w-fit' as={Link} color='primary'><HiUserAdd className='mr-2' size={20} /> Add User</Button>
            <DataGrid columns={columns}
                rows={users}
                className='bg-white dark:bg-slate-600'
                onSortColumnsChange={setSortColumns}
                sortColumns={sortColumns}
                defaultColumnOptions={{
                    minWidth: 100,
                    resizable: true,
                    sortable: true,
                    draggable: true
                }}
                rowHeight={30}
            />


        </SellerMaster>
    )
}
