import ProductCard from '@/components/ProductCard';
import ProductImageGallery from '@/components/ProductImageGallery';
import CommonMaster from '@/layouts/CommonMaster'
import { Button } from 'flowbite-react'
import Image from 'next/image';
import { useRouter } from 'next/router'
import React from 'react'
import { HiEye, HiOutlineTrendingUp, HiCheck } from "react-icons/hi";
import prod1 from '../../../assets/prod1.jpg'
import prod2 from '../../../assets/prod2.jpg'
import prod3 from '../../../assets/prod3.jpg'
import prod4 from '../../../assets/prod4.jpg'


export default function Product() {
    const { query } = useRouter()
    const productImages = [
        prod1.src,
        prod2.src,
        prod3.src,
        prod4.src
    ];
    return (
        <CommonMaster>
            <div className='max-w-screen-2xl mx-auto'>
                <section className="bg-white py-8 antialiased dark:bg-gray-900 md:py-6">
                    <div className=" max-w-screen-2xl px-4 2xl:px-0">
                        <h1 className="text-2xl font-semibold text-gray-900 dark:text-white">Trailed Offset Disc Harrow (with Tyre)</h1>

                        <div className="mt-4 sm:flex sm:items-center sm:gap-4">
                            <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                    <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                    <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                    </svg>
                                </div>
                                <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">(5.0)</p>
                                <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"> 345 Reviews </a>
                            </div>

                            <div className="mt-4 flex items-center gap-1 sm:mt-0">
                                <svg className="h-5 w-5 text-primary-700 dark:text-primary-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 13a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.8 13.938h-.011a7 7 0 1 0-11.464.144h-.016l.14.171c.1.127.2.251.3.371L12 21l5.13-6.248c.194-.209.374-.429.54-.659l.13-.155Z" />
                                </svg>
                                <p className="text-sm font-medium text-primary-700 dark:text-primary-500">Deliver to Bonnie Green- Sacramento 23647</p>
                            </div>
                        </div>
                        <br />
                        <div className='grid grid-cols-1 md:grid-cols-6 gap-4'>
                            <div className='md:col-span-3'>
                                <ProductImageGallery images={productImages} />
                            </div>

                            <div className="mt-6 md:min-w-96 md:max-w-xl space-y-6 sm:mt-8 lg:mt-0">
                                <div className="flex items-start justify-between gap-4">
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <p className="text-xl font-bold text-gray-900 dark:text-white">
                                                <s> &#8377;1,499.00 </s>
                                            </p>
                                            <span className="me-2 rounded bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"> -15% </span>
                                        </div>
                                        <p className="text-3xl font-extrabold text-gray-900 dark:text-white">&#8377; 1,274.00</p>
                                    </div>

                                    <ul className="shrink-0 space-y-1 text-sm font-medium">
                                        <li className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                            <HiEye size={18} />
                                            25,534
                                        </li>

                                        <li className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                                            <HiOutlineTrendingUp size={18} />
                                            3,247 leads
                                        </li>
                                    </ul>
                                </div>

                                <div className="grid grid-cols-1 gap-2 md:grid-cols-3 lg:grid-cols-1">
                                    <div>
                                        <p className="mb-2 text-sm font-semibold text-gray-900 dark:text-white">Benefits</p>
                                        <ul className="mb-2 space-y-1 text-sm font-normal text-gray-500 dark:text-gray-400">
                                            <li className="flex items-center gap-2">
                                                <HiCheck />
                                                Heavy duty cast iron spools to counter weight
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="h-4 w-4 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                </svg>
                                                Warranty included
                                            </li>
                                            <li className="flex items-center gap-2">
                                                <svg className="h-4 w-4 shrink-0" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 11.917 9.724 16.5 19 7.5" />
                                                </svg>
                                                Damage and theft insurance
                                            </li>
                                        </ul>
                                        <a href="#" title="" className="text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"> More details </a>
                                    </div>
                                </div>

                                <div className="flex items-center space-x-4">
                                    <Button color='blue' className="flex w-full items-center justify-center rounded-lg px-5 text-sm font-medium focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800" role="button">
                                        <svg className="-ms-2 me-2 h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                                        </svg>
                                        Add to cart
                                    </Button>

                                    <button type="button" data-tooltip-target="tooltip-add-to-favorites" className="flex items-center justify-center rounded-lg border border-gray-200 bg-white p-2.5 text-sm font-medium text-gray-900 hover:bg-gray-100 hover:text-primary-700 focus:z-10 focus:outline-none focus:ring-4 focus:ring-gray-100 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:ring-gray-700" role="button">
                                        <svg className="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12.01 6.001C6.5 1 1 8 5.782 13.001L12.011 20l6.23-7C23 8 17.5 1 12.01 6.002Z" />
                                        </svg>
                                    </button>
                                    <div id="tooltip-add-to-favorites" role="tooltip" className="tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 shadow-sm transition-opacity duration-300 dark:bg-gray-700">
                                        Add to favorites
                                        <div className="tooltip-arrow" data-popper-arrow></div>
                                    </div>
                                </div>

                                <hr className="border-gray-200 dark:border-gray-700" />

                                <div>
                                    <p className="mb-2 text-sm font-normal text-gray-500 dark:text-gray-400">
                                        Sold and shipped by
                                        <span className="font-semibold text-gray-900 dark:text-white">Flowbite</span>
                                    </p>

                                    <div className="mb-2 flex items-center gap-2">
                                        <div className="flex items-center gap-1">
                                            <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                            </svg>
                                            <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                            </svg>
                                            <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                            </svg>
                                            <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                            </svg>
                                            <svg className="h-4 w-4 text-yellow-300" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                                                <path d="M13.849 4.22c-.684-1.626-3.014-1.626-3.698 0L8.397 8.387l-4.552.361c-1.775.14-2.495 2.331-1.142 3.477l3.468 2.937-1.06 4.392c-.413 1.713 1.472 3.067 2.992 2.149L12 19.35l3.897 2.354c1.52.918 3.405-.436 2.992-2.15l-1.06-4.39 3.468-2.938c1.353-1.146.633-3.336-1.142-3.477l-4.552-.36-1.754-4.17Z" />
                                            </svg>
                                        </div>
                                        <p className="text-sm font-medium leading-none text-gray-500 dark:text-gray-400">(5.0)</p>
                                        <a href="#" className="text-sm font-medium leading-none text-gray-900 underline hover:no-underline dark:text-white"> 345 Reviews </a>
                                    </div>

                                    <a href="#" title="" className="text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"> View seller information </a>
                                </div>
                            </div>
                        </div>
                        <div></div>
                        <div className="mt-8 lg:flex lg:items-start lg:gap-8">
                            {/* <div className="lg:w-full lg:max-w-5xl">
                                <div className="px-4">
                                    <div className="max-w-md lg:max-w-none mx-auto flex flex-col lg:flex-row justify-center mb-4">
                                        <ul className="grid grid-cols-4 lg:block gap-4 order-2 lg:order-1 lg:space-y-4 mt-8 lg:mt-0" id="product-2-tab" data-tabs-toggle="#product-2-tab-content" data-tabs-active-classes="border-gray-200 dark:border-gray-700" data-tabs-inactive-classes="border-transparent hover:border-gray-200 dark:hover:dark:border-gray-700 dark:border-transparent" role="tablist">
                                            <li className="me-2" role="presentation">
                                                <button className="h-20 w-20 overflow-hidden border-2 rounded-lg sm:h-20 sm:w-20 md:h-24 md:w-24 p-2 cursor-pointer mx-auto" id="product-2-image-1-tab" data-tabs-target="#product-2-image-1" type="button" role="tab" aria-controls="product-2-image-1" aria-selected="false">
                                                    <img
                                                        className="object-contain w-full h-full dark:hidden"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg"
                                                        alt=""
                                                    />
                                                    <img
                                                        className="object-contain w-full h-full hidden dark:block"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="me-2" role="presentation">
                                                <button className="h-20 w-20 overflow-hidden border-2 rounded-lg sm:h-20 sm:w-20 md:h-24 md:w-24 p-2 cursor-pointer mx-auto" id="product-2-image-2-tab" data-tabs-target="#product-2-image-2" type="button" role="tab" aria-controls="product-2-image-2" aria-selected="false">
                                                    <img
                                                        className="object-contain w-full h-full dark:hidden"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-back.svg"
                                                        alt=""
                                                    />
                                                    <img
                                                        className="object-contain w-full h-full hidden dark:block"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-back-dark.svg"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="me-2" role="presentation">
                                                <button className="h-20 w-20 overflow-hidden border-2 rounded-lg sm:h-20 sm:w-20 md:h-24 md:w-24 p-2 cursor-pointer mx-auto" id="product-2-image-3-tab" data-tabs-target="#product-2-image-3" type="button" role="tab" aria-controls="product-2-image-3" aria-selected="false">
                                                    <img
                                                        className="object-contain w-full h-full dark:hidden"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components.svg"
                                                        alt=""
                                                    />
                                                    <img
                                                        className="object-contain w-full h-full hidden dark:block"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components-dark.svg"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                            <li className="me-2" role="presentation">
                                                <button className="h-20 w-20 overflow-hidden border-2 rounded-lg sm:h-20 sm:w-20 md:h-24 md:w-24 p-2 cursor-pointer mx-auto" id="product-2-image-4-tab" data-tabs-target="#product-2-image-4" type="button" role="tab" aria-controls="product-2-image-4" aria-selected="false">
                                                    <img
                                                        className="object-contain w-full h-full dark:hidden"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-side.svg"
                                                        alt=""
                                                    />
                                                    <img
                                                        className="object-contain w-full h-full hidden dark:block"
                                                        src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-side-dark.svg"
                                                        alt=""
                                                    />
                                                </button>
                                            </li>
                                        </ul>

                                        <div id="product-2-tab-content" className="order-1 lg:order-2">
                                            <div className="hidden px-4 rounded-lg bg-white dark:bg-gray-900" id="product-2-image-1" role="tabpanel" aria-labelledby="product-2-image-1-tab">
                                                <img className="w-full mx-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front.svg" alt="" />
                                                <img className="w-full mx-auto hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-front-dark.svg" alt="" />
                                            </div>
                                            <div className="hidden px-4 rounded-lg bg-white dark:bg-gray-900" id="product-2-image-2" role="tabpanel" aria-labelledby="product-2-image-2-tab">
                                                <img className="w-full mx-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-back.svg" alt="" />
                                                <img className="w-full mx-auto hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-back-dark.svg" alt="" />
                                            </div>
                                            <div className="hidden px-4 rounded-lg bg-white dark:bg-gray-900" id="product-2-image-3" role="tabpanel" aria-labelledby="product-2-image-3-tab">
                                                <img className="w-full mx-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components.svg" alt="" />
                                                <img className="w-full mx-auto hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-components-dark.svg" alt="" />
                                            </div>
                                            <div className="hidden px-4 rounded-lg bg-white dark:bg-gray-900" id="product-2-image-4" role="tabpanel" aria-labelledby="product-2-image-4-tab">
                                                <img className="w-full mx-auto dark:hidden" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-side.svg" alt="" />
                                                <img className="w-full mx-auto hidden dark:block" src="https://flowbite.s3.amazonaws.com/blocks/e-commerce/imac-side-dark.svg" alt="" />
                                            </div>
                                        </div>
                                        </div>
                                        </div>
                                        </div> */}
                            {/* <div className="flex justify-center items-center min-h-screen bg-gray-100"> */}
                            {/* </div> */}

                        </div>
                    </div>
                </section>
                <div className="mx-auto ">
                    <div className="relative overflow-hidden bg-white  dark:bg-gray-900 sm:rounded-lg">
                        <div
                            className="flex flex-col items-start justify-between p-4 space-y-3 dark:bg-gray-800 md:flex-row md:items-center md:space-y-0 md:space-x-4">
                            <div className="flex items-center">
                                <h5 className="mr-3 font-semibold text-xl dark:text-white">Specifications</h5>
                                <div data-tooltip-target="info-tooltip">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-400" viewBox="0 0 20 20"
                                        fill="currentColor" aria-hidden="true">
                                        <path fill-rule="evenodd" clip-rule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" />
                                    </svg>
                                    <span className="sr-only">More info</span>
                                </div>
                                <div id="info-tooltip" role="tooltip"
                                    className="absolute z-10 invisible inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
                                    Selected Xbox Series S, PlayStation 5, and Xbox Series X
                                    <div className="tooltip-arrow" data-popper-arrow=""></div>
                                </div>
                            </div>
                        </div>
                        <div className="mx-4 dark:mx-0 border-t dark:border-gray-700 dark:bg-gray-800"></div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                                <thead className="text-xs text-gray-900 dark:text-white">
                                    <tr>
                                        <th scope="col" className="px-4 py-3"></th>
                                        <th scope="col" className="px-4 py-3">
                                            <div className="text-lg">
                                                <div className="mt-4">
                                                    FKTODHT-12
                                                </div>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            <div className="text-lg">
                                                <div className="mt-4">
                                                    FKTODHT-14
                                                </div>
                                            </div>
                                        </th>
                                        <th scope="col" className="px-4 py-3">
                                            <div className="text-lg">
                                                <div className="mt-4">
                                                    FKTODHT-16
                                                </div>
                                            </div>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                        <th colSpan={4} scope="row"
                                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            General Information
                                        </th>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Brand</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Microsoft</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Sony</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Microsoft</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Product Name</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Xbox Series S</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">PlayStation 5</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Xbox Series X</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Colors</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">White</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">White/Black</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Black</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Category</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Gaming/Console</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Gaming/Console</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Gaming/Console</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Price</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">$499</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">$599</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">$299</td>
                                    </tr>
                                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                        <th colSpan={4} scope="row"
                                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Technical Information
                                        </th>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Platform</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Xbox Series S</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">PlayStation 5 Digital
                                            Edition
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Xbox Series X</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">RAM</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">16GB GDDR6</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">16GB GDDR6</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">16GB GDDR</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">CPU</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">8-core, 3.6 GHz AMD
                                            Zen 2
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">8-core 3.5 GHz AMD Zen
                                            2
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">8-core 3.8 GHz AMD Zen
                                            2
                                        </td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">GPU</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">4 teraflop AMD RDNA 2
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">10.3 teraflop AMD RDNA
                                            2
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">12 teraflop AMD RDNA 2
                                        </td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Storage</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">512 GB custom NVMe SSD
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">825 GB custom SSD</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">1 TB custom SSD</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Resolution</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Up to 2K</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Up to 8K</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Up to 8K</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Frame Rate</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Up to 120 fps</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Up to 120 fps</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Up to 120 fps</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Optical Drive</th>
                                        <td className="px-4 py-3 text-red-500 whitespace-nowrap">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
                                                aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-green-500 whitespace-nowrap">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
                                                aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-green-500 whitespace-nowrap">
                                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-4 h-4"
                                                aria-hidden="true">
                                                <path fill-rule="evenodd"
                                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                                    clip-rule="evenodd" />
                                            </svg>
                                        </td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Controller</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">1</td>
                                    </tr>
                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Web Connection</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ethernet/Wi-Fi</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ethernet/Wi-Fi</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Ethernet/Wi-Fi</td>
                                    </tr>

                                    <tr className="border-b bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                                        <th colSpan={4} scope="row"
                                            className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            Delivery
                                        </th>
                                    </tr>

                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Country</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Worldwide</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Worldwide</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">Worldwide</td>
                                    </tr>

                                    <tr className="border-b dark:border-gray-600">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Duration</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">5-10 Days</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">30 Days</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">30 Days</td>
                                    </tr>

                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Tax</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">2.5%</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">2.5%</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">2.5%</td>
                                    </tr>

                                    <tr className="border-b dark:border-gray-700">
                                        <th scope="row" className="px-4 py-3 font-normal whitespace-nowrap">Tax</th>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">2.5%</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">2.5%</td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">2.5%</td>
                                    </tr>

                                    <tr>
                                        <th scope="row" className="px-4 py-3"></th>
                                        <td className="px-4 py-6 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <button type="button"
                                                className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                    className="w-5 h-5 mr-2">
                                                    <path
                                                        d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <button type="button"
                                                className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                    className="w-5 h-5 mr-2">
                                                    <path
                                                        d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </td>
                                        <td className="px-4 py-3 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            <button type="button"
                                                className="flex items-center justify-center px-3 py-2 text-sm font-medium text-white rounded-lg bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800">
                                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                                                    className="w-5 h-5 mr-2">
                                                    <path
                                                        d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
                                                </svg>
                                                Add to cart
                                            </button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <h1 className='text-2xl font-bold mb-5 dark:text-slate-50'>Similar Products</h1>
                <div className="mb-4 grid gap-4 sm:grid-cols-2 md:mb-8 lg:grid-cols-3 xl:grid-cols-4">
                    <ProductCard id={1} />
                    <ProductCard id={2} />
                    <ProductCard id={3} />
                    <ProductCard id={4} />
                </div>
            </div>
        </CommonMaster>
    )
}
