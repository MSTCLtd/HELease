import CommonMaster from '@/layouts/CommonMaster'
import { Badge } from 'flowbite-react'
import Image from 'next/image'
import React from 'react'
import aboutUsImage from '../../assets/about_us.png'
import { useTranslation } from '../../hooks/useTranslation'

export default function about() {
    const { t } = useTranslation()

    return (<CommonMaster title={t('about.aboutus')}>
        <div className="bg-gray-100 dark:bg-gray-900">
            {/* Banner Section */}
            <div className="relative w-full h-64 md:h-96">
                <Image src={aboutUsImage} alt='About Us' fill={true} />
                <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                    <h1 className="text-white text-3xl md:text-5xl font-bold text-center font-bakbak">
                        {t('about.aboutus')}
                    </h1>
                </div>
            </div>
        </div>

        <div className='max-w-screen-lg mx-auto text-justify mt-5 dark:text-gray-400'>
            <p className='text-2xl font-bakbak dark:text-white'>{t('about.para1')}</p>
            <br />
            <p>{t('about.para2')}</p>
            <br />
            <p>{t('about.para3')}</p>
            <br />
            <p>{t('about.para4')}</p>
            <br />
            <p>{t('about.para5')}</p>
        </div>
        <section className="bg-white dark:bg-gray-900">
            <div className="max-w-screen-xl px-4 py-8 mx-auto lg:px-6 sm:py-16 lg:py-24">
                <div className="text-center">
                    <h2 className="text-3xl font-extrabold leading-tight tracking-tight text-gray-900 sm:text-4xl dark:text-white">
                        <span className='underlined'>Solutions</span>
                    </h2>
                </div>

                <div
                    className="max-w-3xl p-5 mx-auto mt-8 space-y-5 border border-gray-100 rounded-lg bg-gray-50 dark:bg-gray-800 dark:border-gray-700">
                    <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Direct Purchase
                        </h3>
                        <p className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400 text-justify">
                            Direct purchase refers to the outright acquisition of an asset by a company, granting them full ownership and control from the
                            moment of purchase. Unlike leasing options—whether operational, full-service, or hybrid—direct purchase involves a one-time
                            payment or financing arrangement that transfers ownership immediately to the buyer. This method is ideal for businesses that
                            require long-term use of an asset and prefer to avoid ongoing lease payments or dependencies on lessors.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Badge color='cyan'>Complete Ownership</Badge>
                            <Badge color='cyan'>Attractive Financing Options</Badge>
                            <Badge color='cyan'>Asset Depreciation and Tax Benefits</Badge>
                            <Badge color='cyan'>Equity Building</Badge>
                            <Badge color='cyan'>Flexibility in Use and Disposal</Badge>
                        </div>
                    </div>

                    <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Operational lease(s)
                        </h3>
                        <p className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400 text-justify">
                            Operational leases, in the context of asset-only leases, refer to the leasing of assets strictly without any additional services,
                            maintenance, or equipment provided by the lessor. This type of lease is focused purely on granting the lessee access to the asset
                            itself for a specified period. Companies often prefer operational leases when they require an asset for a short or medium term
                            without needing or wanting the extra services that sometimes accompany other leasing arrangements.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Badge color='cyan'>Pure Asset Leasing</Badge>
                            <Badge color='cyan'>Flexibility in Usage</Badge>
                            <Badge color='cyan'>Cost-Efficiency</Badge>
                            <Badge color='cyan'>No Ownership Obligations</Badge>
                        </div>
                    </div>

                    <div className="pb-5 border-b border-gray-200 dark:border-gray-700">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Full Service Lease(s)
                        </h3>
                        <p className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400 text-justify">
                            A full-service lease is a comprehensive leasing arrangement where the lessor provides not only the asset but also a range of
                            additional services and equipment necessary for its operation. This type of lease is designed to offer a complete solution to the
                            lessee, ensuring that they can focus on their core business activities while the lessor handles the associated maintenance,
                            management, and operational aspects. Full-service leases are particularly advantageous for companies that require minimal
                            involvement in the upkeep and management of leased assets.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Badge color='cyan'>Bundled Services</Badge>
                            <Badge color='cyan'>Predictable Costs</Badge>
                            <Badge color='cyan'>Minimal Operational Burden</Badge>
                            <Badge color='cyan'>Enhanced Asset Longevity</Badge>
                            <Badge color='cyan'>Maintenance and repairs</Badge>
                            <Badge color='cyan'>Insurance</Badge>
                            <Badge color='cyan'>Operator (depending on Lease Terms)</Badge>
                        </div>
                    </div>

                    <div className="">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                            Hybrid Lease(s)
                        </h3>
                        <p className="mt-1 text-base font-normal text-gray-500 dark:text-gray-400 text-justify">
                            A hybrid lease is a flexible leasing arrangement that combines elements of both operational (asset-only) leases and full-service
                            leases. This type of lease allows lessees to tailor the lease agreement according to their specific needs by selecting which services
                            and equipment they want to be included with the leased asset. Hybrid leases offer a middle ground, giving companies the benefits of
                            additional services where needed while still maintaining control over certain aspects of the asset&apos;s management.
                        </p>
                        <div className="flex flex-wrap gap-2 mt-2">
                            <Badge color='cyan'>Customizable Service Packages</Badge>
                            <Badge color='cyan'>Balance Between Control and Convenience</Badge>
                            <Badge color='cyan'>Cost Efficiency with Flexibility</Badge>
                        </div>
                    </div>

                </div>

                {/* <div className="mt-8 text-center">
                    <a href="#" title=""
                        className="inline-flex items-center text-lg font-medium text-primary-600 hover:underline dark:text-primary-500">
                        Get free sample chapters
                        <svg aria-hidden="true" className="w-5 h-5 ml-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                                clip-rule="evenodd" />
                        </svg>
                    </a>
                </div> */}
            </div>
        </section>
    </CommonMaster>
    )
}
