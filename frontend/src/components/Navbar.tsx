import Link from 'next/link'
import React from 'react'
import Image from 'next/image'
import { Avatar, Button, DarkThemeToggle, Dropdown } from 'flowbite-react'
import { HiCog, HiCurrencyDollar, HiLogout, HiOutlineArrowRight, HiUser, HiViewGrid } from "react-icons/hi";
import Logo from './Logo'
import { useSelector } from 'react-redux'
import BuyerDropdown from './BuyerDropdown'
import LocaleSwitcher from './locale-switcher'
import { useTranslation } from '../../hooks/useTranslation'
import { useRouter } from 'next/router'
// import { LanguageSwitcher } from './LanguageSwitcher';

export default function Navbar() {
    const { user } = useSelector((state: any) => state.HELReducer)
    const { t } = useTranslation()
    const router = useRouter()

    return (
        <nav className="bg-white dark:bg-gray-800 antialiased">
            <div className="max-w-screen-2xl px-4 mx-auto 2xl:px-0">
                <div className="flex items-center justify-between py-4 border-b border-gray-200 dark:border-gray-700">
                    <form action="#" className="hidden md:block">
                        <label className="sr-only">
                            Search
                        </label>
                        <div className="relative z-0 w-full group">
                            <div className="absolute inset-y-0 flex items-center pointer-events-none start-0">
                                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z" />
                                </svg>
                            </div>

                            <input type="email" name="floating_email" id="floating_email" className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0  appearance-none dark:text-white ps-6  focus:outline-none focus:ring-0 peer" placeholder=" " required />
                            <label className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-2.5 ps-6 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 rtl:peer-focus:left-auto peer-focus:text-primary-600 peer-focus:dark:text-primary-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Search</label>
                        </div>
                    </form>

                    <Logo />

                    <div className="flex items-center justify-end lg:space-x-2">
                        <DarkThemeToggle />
                        <LocaleSwitcher />
                        <div className="relative md:hidden">
                            <button type="button" data-collapse-toggle="ecommerce-navbar-search-2" className="inline-flex hover:bg-gray-100 items-center rounded-lg justify-center gap-2 p-2 text-gray-900 dark:text-white dark:hover:bg-gray-700">
                                <span className="sr-only">
                                    Search
                                </span>
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m21 21-3.5-3.5M17 10a7 7 0 1 1-14 0 7 7 0 0 1 14 0Z"></path>
                                </svg>
                            </button>
                        </div>

                        {/* <button id="cartDropdownButton1" data-dropdown-toggle="cartDropdown1" type="button" className="inline-flex items-center justify-center p-2 hover:bg-gray-100 rounded-lg text-sm font-medium leading-none text-gray-900 dark:text-white dark:hover:bg-gray-700">
                            <span className="sr-only">
                                Cart
                            </span>
                            <div className="relative sm:me-2.5">
                                <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 4h1.5L9 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm-8.5-3h9.25L19 7H7.312" />
                                </svg>
                                <div className="absolute inline-flex items-center justify-center w-4 h-4 text-xs font-medium text-white bg-red-700 rounded-full -top-1.5 -end-1.5 dark:bg-red-600">2</div>
                            </div>
                            <span className="hidden sm:flex">$109.12</span>
                            <svg className="hidden sm:flex w-4 h-4 text-gray-900 dark:text-white ms-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 9-7 7-7-7" />
                            </svg>
                        </button> */}
                        {/* <div id="cartDropdown1" className="z-10 hidden mx-auto w-[360px] space-y-4 overflow-hidden rounded-lg bg-white p-4 antialiased shadow-lg dark:bg-gray-700">
                            <dl className="flex items-center justify-between gap-4 border-b border-gray-200 pb-4 dark:border-gray-600">
                                <dt className="font-semibold leading-none text-gray-900 dark:text-white">Your shopping cart</dt>
                                <dd className="leading-none text-gray-500 dark:text-gray-400">4 items</dd>
                            </dl>

                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                                <div className="col-span-2 flex items-center gap-2">
                                    <a href="#" className="flex aspect-square h-9 w-9 shrink-0 items-center">
                                        <Image className="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-light.svg" alt="imac image" width={} />
                                        <Image className="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/iphone-dark.svg" alt="imac image" />
                                    </a>
                                    <div className="flex-1">
                                        <a href="#" className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white">Apple iPhone 15</a>
                                        <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">Gold Edition, 256GB</p>
                                    </div>
                                </div>

                                <div className="flex justify-center text-sm font-normal leading-none text-gray-500 dark:text-gray-400">x1</div>

                                <div className="flex items-center justify-end gap-2">
                                    <p className="text-sm font-semibold leading-none text-gray-900 dark:text-white">$599</p>
                                    <button data-tooltip-target="tooltipRemoveItem1" type="button" className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                                        <span className="sr-only"> Remove </span>
                                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg>
                                    </button>
                                    <div id="tooltipRemoveItem1" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-600">
                                        Remove
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                                <div className="col-span-2 flex items-center gap-2">
                                    <a href="#" className="flex aspect-square h-9 w-9 shrink-0 items-center">
                                        <Image className="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-light.svg" alt="imac image" />
                                        <Image className="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/ipad-dark.svg" alt="imac image" />
                                    </a>
                                    <div className="flex-1">
                                        <a href="#" className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white">Apple iPad Air</a>
                                        <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">Silver, 64GB</p>
                                    </div>
                                </div>

                                <div className="flex justify-center text-sm font-normal leading-none text-gray-500 dark:text-gray-400">x9</div>

                                <div className="flex items-center justify-end gap-2">
                                    <p className="text-sm font-semibold leading-none text-gray-900 dark:text-white">$38,599</p>
                                    <button data-tooltip-target="tooltipRemoveItem2" type="button" className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                                        <span className="sr-only"> Remove </span>
                                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg>
                                    </button>
                                    <div id="tooltipRemoveItem2" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-600">
                                        Remove
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                                <div className="col-span-2 flex items-center gap-2">
                                    <a href="#" className="flex aspect-square h-9 w-9 shrink-0 items-center">
                                        <Image className="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-light.svg" alt="imac image" />
                                        <Image className="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/apple-watch-dark.svg" alt="imac image" />
                                    </a>
                                    <div className="flex-1">
                                        <a href="#" className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white">Apple Watch SE</a>
                                        <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">Purple, GPS</p>
                                    </div>
                                </div>

                                <div className="flex justify-center text-sm font-normal leading-none text-gray-500 dark:text-gray-400">x1</div>

                                <div className="flex items-center justify-end gap-2">
                                    <p className="text-sm font-semibold leading-none text-gray-900 dark:text-white">$199</p>
                                    <button data-tooltip-target="tooltipRemoveItem3" type="button" className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                                        <span className="sr-only"> Remove </span>
                                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg>
                                    </button>
                                    <div id="tooltipRemoveItem3" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-600">
                                        Remove
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-4 items-center justify-between gap-3">
                                <div className="col-span-2 flex items-center gap-2">
                                    <a href="#" className="flex aspect-square h-9 w-9 shrink-0 items-center">
                                        <Image className="h-auto max-h-full w-full dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="imac image" />
                                        <Image className="hidden h-auto max-h-full w-full dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="imac image" />
                                    </a>
                                    <div className="flex-1">
                                        <a href="#" className="truncate text-sm font-semibold leading-none text-gray-900 hover:underline dark:text-white">Apple iMac 20”</a>
                                        <p className="mt-0.5 truncate text-sm font-normal text-gray-500 dark:text-gray-400">512GB, 32GB RAM</p>
                                    </div>
                                </div>

                                <div className="flex justify-center text-sm font-normal leading-none text-gray-500 dark:text-gray-400">x1</div>

                                <div className="flex items-center justify-end gap-2">
                                    <p className="text-sm font-semibold leading-none text-gray-900 dark:text-white">$2,999</p>
                                    <button data-tooltip-target="tooltipRemoveItem4" type="button" className="text-red-600 hover:text-red-700 dark:text-red-500 dark:hover:text-red-600">
                                        <span className="sr-only"> Remove </span>
                                        <svg className="h-4 w-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                                        </svg>
                                    </button>
                                    <div id="tooltipRemoveItem4" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-600">
                                        Remove
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>
                            </div>

                            <dl className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-600">
                                <dt className="font-semibold leading-none text-gray-900 dark:text-white">Total</dt>

                                <dd className="font-semibold leading-none text-gray-900 dark:text-white">$43,796</dd>
                            </dl>

                            <a href="#" title="" className="mb-2 me-2 inline-flex w-full items-center justify-center rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" role="button"> See your cart </a>
                        </div> */}

                        {user ? <BuyerDropdown /> : <>
                            <Button color='blue' size='sm' href='/login' as={Link} className='hidden sm:block'>Login / Register <HiOutlineArrowRight className="ml-2 h-5 w-5" /></Button>
                            <Button color='blue' size='sm' href='/login' as={Link} className='block sm:hidden'><HiUser className="h-5 w-5" /></Button>
                        </>}
                    </div>
                </div>

                <form action="#" id="ecommerce-navbar-search-2" className="w-full md:w-auto md:flex-1 md:order-2 hidden pt-4">
                    <label
                        className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                    <div className="relative">
                        <input type="search" id="default-search"
                            className="block w-full p-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                            placeholder="Search in all categories" required />
                        <button type="submit"
                            className="text-white absolute end-1.5 translate-y-1/2 bottom-1/2 bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Search</button>
                    </div>
                </form>

                <div className="flex lg:justify-center">
                    <ul className={'flex items-center justify-start gap-6 md:gap-8 py-3 sm:justify-center ' + (router.locale == 'hi' ? 'font-semibold' : 'font-medium')}>
                        <li>
                            <Link href="/" title="" className="flex text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                {t('home.home')}
                            </Link>
                        </li>
                        <li className="shrink-0">
                            <Link href="/about" title="" className="flex text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                {t('home.aboutus')}
                            </Link>
                        </li>
                        <li className="shrink-0">
                            <Link href="/partner" prefetch title="" className="flex text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                {t('home.partner')}
                            </Link>
                        </li>
                        <li className="shrink-0 hidden sm:flex">
                            <Link href="/updates" title="" className="text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                {t('home.updates')}
                            </Link>
                        </li>
                        <li className="shrink-0 hidden sm:flex">
                            <a href="#" title="" className="text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                {t('home.contact')}
                            </a>
                        </li>
                        <li className="shrink-0 hidden sm:flex">
                            <Link href="/msmecorner" title="" className="text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                {t('home.msme')}
                            </Link>
                        </li>
                        <li className="shrink-0 hidden sm:flex">
                            <Link href="/market" title="" className="text-gray-900 hover:text-primary-700 dark:text-white dark:hover:text-primary-500">
                                Market
                            </Link>
                        </li>
                    </ul>
                    <div className="py-3 flex items-center">
                        <button type="button" data-dropdown-toggle="ecommerce-navbar-menu-2" className="ms-4 inline-flex items-center justify-center lg:hidden hover:bg-gray-100 rounded-md hover:text-gray-900 dark:hover:bg-gray-700 p-1 text-gray-500 dark:text-white">
                            <span className="sr-only">Show menu</span>
                            <svg className="w-6 h-6 text-gray-900 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                <path stroke="currentColor" stroke-linecap="round" stroke-width="3" d="M6 12h.01m6 0h.01m5.99 0h.01" />
                            </svg>
                        </button>

                        <div id="ecommerce-navbar-menu-2" className="hidden z-10 w-56 divide-y divide-gray-100 overflow-hidden overflow-y-auto rounded-lg bg-white antialiased shadow dark:divide-gray-600 dark:bg-gray-700">
                            <ul className="p-2 text-start text-sm font-medium text-gray-900 dark:text-white">
                                <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Games </a></li>
                                <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> PC </a></li>
                                <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Music </a></li>
                                <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Books </a></li>
                                <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Electronics </a></li>
                                <li><a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> Home & Garden </a></li>
                            </ul>

                            <div className="p-2 text-sm font-medium text-gray-900 dark:text-white">
                                <a href="#" title="" className="inline-flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-600"> View all categories </a>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </nav>
    )
}
