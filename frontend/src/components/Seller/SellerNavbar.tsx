import { Button, DarkThemeToggle, Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import React from 'react'
import LogoOnly from '../LogoOnly'
import Link from 'next/link'
import { HiLightningBolt } from 'react-icons/hi'
import SellerDropdown from './SellerDropdown'
import { useDispatch, useSelector } from 'react-redux'
import { HELActions } from '../../../store'
import { useRouter } from 'next/router'

export default function SellerNavbar() {
    const dispatch = useDispatch()
    const router = useRouter()


    const signOut = () => {
        dispatch(HELActions.setSeller(null))
        router.push("/")
    }

    return (
        <Navbar fluid className='border-b-2 fixed left-0 right-0 top-0 z-50'>
            <NavbarBrand as={Link} href="/seller/home">
                <LogoOnly size={50} />
                <div className='flex flex-col'>
                    <span className='font-geist-mono uppercase text-sm -mb-2 text-primary dark:text-secondary'>Upkaran</span>
                    <span className="self-center whitespace-nowrap text-2xl font-semibold text-black dark:text-white font-bakbak">Seller Corner</span>
                </div>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink href="#" className='flex flex-row'><HiLightningBolt size={20} className='mr-2 text-orange-500' /> <span>Upgrade</span></NavbarLink>
                <NavbarLink href="#">Enquiries &amp; Tickets</NavbarLink>
                <NavbarLink href="#">Profile</NavbarLink>
                <NavbarLink onClick={signOut} className='cursor-pointer'>Sign Out</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    )
}
