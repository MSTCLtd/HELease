import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { useSelector } from 'react-redux'
import Head from 'next/head'
import SellerNavbar from '@/components/Seller/SellerNavbar'
import SellerFooter from '@/components/Seller/SellerFooter'
import SellerSidenav from '@/components/Seller/SellerSidenav'

export default function SellerMaster({ children, title = "Seller " }: { children: React.ReactNode, title?: string }) {
    const { locale } = useRouter()
    const { t } = useTranslation()
    const router = useRouter()
    const state = useSelector((state: any) => state.HELReducer)
    const [isOpen, setIsOpen] = useState(false);

    useEffect(() => {
        if (state.language != 'en') {
            router.locale = state.language
            router.push(router.asPath, router.asPath, { locale: state.language })
        }
    }, [])

    return (
        <>
            <Head>
                <title>{title == t('home.name') ? title : title + ' - ' + t('home.name')}</title>
            </Head>
            <SellerNavbar />
            <SellerSidenav isOpen={isOpen} />
            <main className="p-4 pl-8 md:ml-64 min-h-screen pt-20 dark:bg-slate-800">
                <p className='text-3xl mb-5 font-bakbak dark:text-white'>{title}</p>
                {children}
            </main>
            <SellerFooter />
        </>
    )
}
