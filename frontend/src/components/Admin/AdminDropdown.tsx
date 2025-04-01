import { Avatar, Dropdown } from 'flowbite-react'
import React from 'react'
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { HELActions } from '../../../store'

export default function AdminDropdown() {
    const dispatch = useDispatch()
    const { adminUser } = useSelector((state: any) => state.HELReducer)


    const signOut = () => {
        dispatch(HELActions.setAdminUser(null))
        location.href = "/"
    }

    return (
        <Dropdown dismissOnClick={false} arrowIcon={true} placement='bottom-end' renderTrigger={() => <Avatar placeholderInitials="AD" rounded bordered className='cursor-pointer' />}>
            <Dropdown.Header>
                <span className="block text-base font-bold">{adminUser.name}</span>
                <span className="block truncate text-slate-400 font-medium">{adminUser.email}</span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
            <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
            <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={signOut} className='text-red-500 dark:text-red-500 hover:dark:bg-red-300 '>Sign out</Dropdown.Item>
        </Dropdown>
    )
}
