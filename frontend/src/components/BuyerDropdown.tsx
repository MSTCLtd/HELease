import { Avatar, Dropdown } from 'flowbite-react'
import React from 'react'
import { HiCog, HiCurrencyDollar, HiLogout, HiViewGrid } from 'react-icons/hi'
import { useDispatch, useSelector } from 'react-redux'
import { HELActions } from '../../store'

export default function BuyerDropdown() {
    const dispatch = useDispatch()
    const { user } = useSelector((state: any) => state.HELReducer)


    const signOut = () => {
        dispatch(HELActions.setUser(null))
        location.href = "/"
    }

    return (
        <Dropdown dismissOnClick={false} arrowIcon={true} placement='bottom-end' renderTrigger={() => <Avatar placeholderInitials={user?.name?.split(" ")[0][0] + "" + user?.name?.split(" ").reverse()[0][0]} rounded bordered className='cursor-pointer' />}>
            <Dropdown.Header>
                <span className="block text-base font-bold">{user.name}</span>
                <span className="block truncate text-slate-400 font-medium">{user.email}</span>
            </Dropdown.Header>
            <Dropdown.Item icon={HiViewGrid}>Dashboard</Dropdown.Item>
            <Dropdown.Item icon={HiCog}>Settings</Dropdown.Item>
            <Dropdown.Item icon={HiCurrencyDollar}>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item icon={HiLogout} onClick={signOut} className='text-red-500 dark:text-red-500 hover:dark:bg-red-300 '>Sign out</Dropdown.Item>
        </Dropdown>
    )
}
