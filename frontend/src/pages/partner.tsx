import CommonMaster from '@/layouts/CommonMaster'
import Image from 'next/image'
import React from 'react'
import partnerwithus from '../../assets/partner_with_us.png'
import grid1 from '../../assets/grid1.png'
import grid2 from '../../assets/grid2.png'
import grid3 from '../../assets/grid3.png'
import grid4 from '../../assets/grid4.png'

export default function partner() {
    return (
        <CommonMaster>
            <div className="bg-gray-100 dark:bg-gray-900">
                {/* Banner Section */}
                <div className="relative w-full h-64 md:h-96">
                    <Image src={partnerwithus} alt='About Us' fill={true} />
                    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <h1 className="text-white text-3xl md:text-5xl font-bold text-center">
                            Partner With Us
                        </h1>
                    </div>
                </div>
            </div>
            <div className='max-w-screen-lg mx-auto text-justify mt-5 dark:text-slate-300'>
                <p className='text-2xl font-bakbak'>At Upkaran, we believe in the power of collaboration. By partnering with us, you become a part of a dynamic ecosystem
                    committed to revolutionizing the industrial tools and machinery sector. Together, we can drive innovation, enhance operational
                    efficiencies, and create sustainable solutions for industries worldwide.</p>
                <br />
            </div>
            <div className="max-w-screen-xl px-4 py-4 mx-auto lg:px-6 sm:py-4 lg:py-10">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        Why <span className='underlined'>Partner with Upkaran</span>
                    </h2>
                </div>

            </div>
            <section className="bg-white dark:bg-gray-900 max-w-screen-xl mx-auto">
                <div className="gap-8 items-center py-8 px-4 mx-auto  xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <Image src={grid1} className='w-full' alt='About Us' />
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Expand Your Reach</h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Leverage MSTC&apos;s extensive network and industry presence to access a wide customer base across various sectors.</p>
                    </div>
                </div>
                <div className="gap-8 items-center py-8 px-4 mx-auto  xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Shared Growth</h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Collaborate with MSTC, we value mutual success and support your growth.</p>
                    </div>
                    <Image src={grid2} className='w-full' alt='About Us' />
                </div>
                <div className="gap-8 items-center py-8 px-4 mx-auto  xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <Image src={grid3} className='w-full' alt='About Us' />
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Market Expertise</h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Benefit from our in-depth understanding of the industrial tools and equipment market to strengthen your business strategies.</p>
                    </div>
                </div>
                <div className="gap-8 items-center py-8 px-4 mx-auto  xl:gap-16 md:grid md:grid-cols-2 sm:py-16 lg:px-6">
                    <div className="mt-4 md:mt-0">
                        <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">Innovation-Driven</h2>
                        <p className="mb-6 font-light text-gray-500 md:text-lg dark:text-gray-400">Work with a team that prioritizes cutting-edge technology and sustainable practices, ensuring your offerings remain relevant and competitive.</p>
                    </div>
                    <Image src={grid4} className='w-full' alt='About Us' />
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900">
                <div className="pt-8 px-4 mx-auto max-w-screen-xl lg:py-1 lg:px-6">
                    <div className="bg-white rounded-lg shadow lg:grid lg:grid-cols-3 dark:bg-gray-800">
                        <div className="col-span-2 p-6 lg:p-8">
                            {/* <h2 className="mb-1 text-2xl font-bold text-gray-900 dark:text-white">Pricing built for all businesses.</h2>
                            <p className="text-lg font-light text-gray-500 dark:text-gray-400">Best for large scale uses and extended redistribution rights.</p> */}
                            <div className="grid gap-4 mt-4 lg:mt-6 sm:grid-cols-2 md:grid-cols-3">
                                <div>
                                    <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Brands</h2>
                                    <p className='text-gray-600 dark:text-white'>Expand your reach and showcase your products to a growing network of
                                        engaged buyers</p>
                                </div>
                                <div>
                                    <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Manufacturers</h2>
                                    <p className='text-gray-600 dark:text-white'>Partner with us to scale your production and connect directly with
                                        bulk buyers.</p>
                                </div>
                                <div>
                                    <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">Dealers</h2>
                                    <p className='text-gray-600 dark:text-white'>Boost your sales by accessing a platform designed for streamlined
                                        transactions and visibility.</p>
                                </div>
                            </div>
                        </div>
                        <div className="flex p-6 text-center bg-gray-50 lg:p-8 dark:bg-gray-700">
                            <div className="self-center w-full">
                                {/* <div className="text-5xl font-extrabold text-gray-900 dark:text-white">$99</div>
                                <div className="mt-1 mb-4 text-gray-500 text-light dark:text-gray-400">per month</div> */}
                                <a href="#" className="flex justify-center text-orange-700 dark:text-orange-500 dark:hover:text-teal-400 hover:text-teal-500 hover:bg-primary-700 font-medium rounded-lg text-lg px-5 py-2.5 text-center  items-center ">Contact MSTC RO/BO <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section className="bg-white dark:bg-gray-900">
                <div className="py-8 px-4 mx-auto max-w-screen-xl lg:px-6">
                    <div className="bg-white rounded-lg shadow lg:grid lg:grid-cols-3 dark:bg-gray-800">
                        <div className="col-span-2 p-6 lg:p-8">
                            <h2 className="mb-3 text-2xl font-bold text-gray-900 dark:text-white">MSMEs</h2>
                            <p className='text-gray-600 dark:text-white'>Expand your reach and showcase your products to a growing network of
                                engaged buyers</p>

                        </div>
                        <div className="flex p-6 text-center bg-gray-50 lg:p-8 dark:bg-gray-700">
                            <div className="self-center w-full">
                                {/* <div className="text-5xl font-extrabold text-gray-900 dark:text-white">$99</div>
                                <div className="mt-1 mb-4 text-gray-500 text-light dark:text-gray-400">per month</div> */}
                                <a href="#" className="flex justify-center text-orange-700 dark:text-orange-500 dark:hover:text-teal-400 hover:text-teal-500 hover:bg-primary-700 font-medium rounded-lg text-lg px-5 py-2.5 text-center items-center ">Register with Udyam <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
                                </svg></a>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </CommonMaster>
    )
}
