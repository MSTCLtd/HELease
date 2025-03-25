import { Avatar, Button, DarkThemeToggle, Dropdown, ListGroup, Navbar } from 'flowbite-react'
import Link from 'next/link'
import React from 'react'
import Logo from './Logo'
import { useSelector } from 'react-redux'
import { HiCog, HiCurrencyDollar, HiLogout, HiOutlineArrowRight, HiUser, HiViewGrid } from "react-icons/hi";
import BuyerDropdown from './BuyerDropdown'
import { SearchBox } from '@elastic/react-search-ui'
import LocaleSwitcher from './locale-switcher'

export default function MarketNavbar() {
    const { user } = useSelector((state: any) => state.HELReducer)
    return (
        <Navbar fluid className='shadow-md z-10'>
            <Navbar.Brand href="/market" as={Link}>
                <Logo />
            </Navbar.Brand>
            <div className="flex md:order-2">
                <DarkThemeToggle />
                <LocaleSwitcher />
                {user ? <BuyerDropdown /> : <>
                    <Button color='blue' size='sm' href='/login' as={Link} className='hidden sm:block'>Login / Register <HiOutlineArrowRight className="ml-2 h-5 w-5" /></Button>
                    <Button color='blue' size='sm' href='/login' as={Link} className='block sm:hidden'><HiUser className="h-5 w-5" /></Button>
                </>}
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <SearchBox
                    autocompleteMinimumCharacters={3}
                    autocompleteResults={{
                        linkTarget: "_blank",
                        sectionTitle: "Results",
                        titleField: "title",
                        urlField: "url",
                        shouldTrackClickThrough: true
                    }}
                    autocompleteSuggestions={true}
                    debounceLength={0}
                    className='w-full'
                />
            </Navbar.Collapse>
        </Navbar>
    )
}
