import { Badge } from 'flowbite-react'
import React from 'react'

export default function AdminUserRole({ role }: { role: any }) {
    let color = ''

    switch (role) {
        case 'MSTC':
            color = 'failure'
            break;
        case 'User':
            color = 'warning'
            break
        default:
            color='primary'
            break;
    }
    return (
        <Badge size='sm' color={color} className='w-fit'>{role}</Badge>
    )
}
