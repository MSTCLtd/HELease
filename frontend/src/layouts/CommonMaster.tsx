import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { useTranslation } from '../../hooks/useTranslation'
import { useSelector } from 'react-redux'

export default function CommonMaster({ children, title = "Upkaran" }: { children: React.ReactNode, title?: string }) {
    const { locale } = useRouter()
    const { t } = useTranslation()
    const router = useRouter()
    const state = useSelector((state: any) => state.HELReducer)

    useEffect(() => {
        if (state.language != 'en') {
            router.locale = state.language
            router.push(router.asPath, router.asPath, { locale: state.language })
        }
    }, [])


    return <>
        <Head>
            <title>{title == t('home.name') ? title : title + ' - ' + t('home.name')}</title>
        </Head>
        <Navbar />
        <main className='min-h-96 mx-auto pb-4 bg-white dark:bg-gray-900'>
            {children}
        </main>
        <Footer />
    </>
}
