import AdminMSTCUserAdd from '@/components/Admin/AdminMSTCUserAdd'
import AdminMaster from '@/layouts/AdminMaster'
import React from 'react'

export default function add() {
    return (
        <AdminMaster title='Add MSTC User'>
            <AdminMSTCUserAdd />
        </AdminMaster>
    )
}
