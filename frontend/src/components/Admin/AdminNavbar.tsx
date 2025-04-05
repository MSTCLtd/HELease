import { Navbar, NavbarBrand, NavbarCollapse, NavbarLink, NavbarToggle } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'
import LogoOnly from '../LogoOnly'

export default function AdminNavbar() {
    return (
        <Navbar fluid>
            <NavbarBrand as={Link} href="/mstcadmin/home">
                <LogoOnly />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">MSTC Admin</span>
            </NavbarBrand>
            <NavbarToggle />
            <NavbarCollapse>
                <NavbarLink href="#" active>
                    Home
                </NavbarLink>
                <NavbarLink as={Link} href="#">
                    About
                </NavbarLink>
                <NavbarLink href="#">Services</NavbarLink>
                <NavbarLink href="#">Pricing</NavbarLink>
                <NavbarLink href="#">Contact</NavbarLink>
            </NavbarCollapse>
        </Navbar>
    )
}
