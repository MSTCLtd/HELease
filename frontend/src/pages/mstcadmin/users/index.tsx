import UsersTable from '@/components/Admin/UsersTable'
import AdminMaster from '@/layouts/AdminMaster'
import React from 'react'

export default function users() {

    return (
        <AdminMaster title="MSTC Users">
            <UsersTable />
        </AdminMaster>
    )
}
