import { Avatar, Dropdown } from 'flowbite-react'
import React from 'react'
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi'
import { useDispatch } from 'react-redux'
import { HELActions } from '../../store'

export default function BuyerDropdown() {
    const dispatch = useDispatch()

    const signOut = () => {
        dispatch(HELActions.setUser(null))
        location.href = "/"
    }

    return (
        <Dropdown dismissOnClick={false} renderTrigger={() => <Avatar placeholderInitials="RR" rounded bordered className='cursor-pointer' />}>
            <Dropdown.Header>
                <span className="block text-sm">Bonnie Green</span>
                <span className="block truncate text-sm font-medium">bonnie@flowbite.com</span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
            <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
            <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={signOut} className='text-red-500 dark:text-red-500 hover:dark:bg-red-300 '>Sign out</Dropdown.Item>
        </Dropdown>
    )
}
